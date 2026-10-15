import assert from 'node:assert/strict'
import test from 'node:test'
import { handleRequest } from '../netlify/functions/admin-booking.mjs'
import { applyBooking, createProspectRecord, memoryStore, updateProspectRecord } from '../netlify/functions/_shared/prospects.mjs'
import { compareDemoBooked, formatDemoCentral } from '../src/components/admin/demo-time.mjs'

const env = { FRONTDESK_BOOKING_SYNC_TOKEN: 'booking-sync-token' }

function post(body, { token = env.FRONTDESK_BOOKING_SYNC_TOKEN, raw } = {}) {
  return new Request('https://frontdeskkc.com/.netlify/functions/admin-booking', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token == null ? {} : { authorization: `Bearer ${token}` }),
    },
    body: raw ?? JSON.stringify(body),
  })
}

const booking = {
  name: 'Summit Plumbing',
  email: 'owner@summit.example',
  phone: '(913) 555-0101',
  start: '2026-10-16T19:30:00Z',
  eventId: 'evt_1',
  notes: 'Bring last week’s missed calls.',
}

test('booking sync rejects a missing token config, a bad bearer, and non-POST', async () => {
  const store = memoryStore()
  const missing = await handleRequest(post(booking), { env: {}, store })
  assert.equal(missing.status, 503)

  const wrong = await handleRequest(post(booking, { token: 'nope' }), { env, store })
  assert.equal(wrong.status, 401)

  const absent = await handleRequest(post(booking, { token: null }), { env, store })
  assert.equal(absent.status, 401)

  const get = await handleRequest(new Request('https://frontdeskkc.com/.netlify/functions/admin-booking'), { env, store })
  assert.equal(get.status, 405)
})

test('booking sync validates the body', async () => {
  const store = memoryStore()
  const bad = await handleRequest(post({ ...booking, start: 'Thursday at 2' }), { env, store })
  assert.equal(bad.status, 400)
  const nameless = await handleRequest(post({ ...booking, name: '  ' }), { env, store })
  assert.equal(nameless.status, 400)
})

test('booking sync creates, updates the time, and ignores an identical replay', async () => {
  const store = memoryStore()
  const created = await handleRequest(post(booking), { env, store })
  assert.equal(created.status, 200)
  const first = await created.json()
  assert.equal(first.ok, true)
  assert.equal(first.action, 'created')

  const moved = await handleRequest(post({ ...booking, start: '2026-10-16T14:30:00-05:00' }), { env, store })
  const sameInstant = await moved.json()
  assert.equal(sameInstant.action, 'unchanged')
  assert.equal(sameInstant.id, first.id)

  const later = await handleRequest(post({ ...booking, start: '2026-10-17T15:00:00Z' }), { env, store })
  const updated = await later.json()
  assert.equal(updated.action, 'updated')
  assert.equal(updated.id, first.id)

  const { listProspects } = await import('../netlify/functions/_shared/prospects.mjs')
  const [prospect] = await listProspects(store)
  assert.equal(prospect.stage, 'demo booked')
  assert.equal(prospect.source, 'booking')
  assert.equal(prospect.demoAt, '2026-10-17T15:00:00.000Z')
  assert.equal(prospect.demoEventId, 'evt_1')
  assert.equal(prospect.email, 'owner@summit.example')
  assert.match(prospect.notes, /Bring last week/)
  assert.equal(prospect.notes.split('Demo booking').length - 1, 2)
})

test('booking matches email, then phone, then name, and does not move won or lost backward', () => {
  const now = new Date('2026-10-15T12:00:00Z')
  const contacted = createProspectRecord([], { businessName: 'Northwind Electric', email: 'a@northwind.example', stage: 'contacted' }, now)
  const byEmail = applyBooking(contacted.prospects, { ...booking, name: 'Someone Else', email: 'a@northwind.example', eventId: 'evt_email' }, now)
  assert.equal(byEmail.action, 'updated')
  assert.equal(byEmail.prospects[0].stage, 'demo booked')
  assert.equal(byEmail.prospects[0].businessName, 'Northwind Electric')

  const phoned = createProspectRecord([], { businessName: 'Prairie HVAC', phone: '913-555-0177', stage: 'replied' }, now)
  const byPhone = applyBooking(phoned.prospects, { ...booking, email: 'new@prairie.example', phone: '913.555.0177', eventId: 'evt_phone' }, now)
  assert.equal(byPhone.action, 'updated')
  assert.equal(byPhone.prospects[0].id, phoned.prospect.id)
  assert.equal(byPhone.prospects[0].stage, 'demo booked')
  assert.equal(byPhone.prospects[0].email, 'new@prairie.example')

  const named = createProspectRecord([], { businessName: 'Summit Plumbing', stage: 'new' }, now)
  const byName = applyBooking(named.prospects, { ...booking, email: 'other@summit.example', phone: '' }, now)
  assert.equal(byName.action, 'updated')
  assert.equal(byName.prospects[0].stage, 'demo booked')

  const wonRecord = updateProspectRecord(named.prospects, named.prospect.id, { stage: 'won' }, now)
  const won = applyBooking(wonRecord.prospects, { ...booking, eventId: 'evt_won' }, now)
  assert.equal(won.prospects[0].stage, 'won')
  assert.equal(won.prospects[0].demoEventId, 'evt_won')
  assert.equal(won.action, 'updated')

  const lostRecord = updateProspectRecord(named.prospects, named.prospect.id, { stage: 'lost' }, now)
  const lost = applyBooking(lostRecord.prospects, { ...booking, eventId: 'evt_lost' }, now)
  assert.equal(lost.prospects[0].stage, 'lost')
})

test('the same event id updates that prospect even when the email matches someone else', () => {
  const now = new Date('2026-10-15T12:00:00Z')
  const first = applyBooking([], booking, now)
  const other = createProspectRecord(first.prospects, { businessName: 'Other Co', email: 'other@example.test' }, now)
  const again = applyBooking(other.prospects, { ...booking, email: 'other@example.test', start: '2026-10-18T18:00:00Z' }, now)
  assert.equal(again.action, 'updated')
  assert.equal(again.id, first.id)
  assert.equal(again.prospects.find((prospect) => prospect.id === first.id).demoAt, '2026-10-18T18:00:00.000Z')
  assert.equal(again.prospects.find((prospect) => prospect.businessName === 'Other Co').demoEventId, '')
})

test('demo times format in Central time and the demo column sorts earliest first', () => {
  assert.equal(formatDemoCentral('2026-10-16T19:30:00Z'), 'Demo: Fri Oct 16, 2:30 PM CT')
  assert.equal(formatDemoCentral('2026-01-16T15:00:00Z'), 'Demo: Fri Jan 16, 9:00 AM CT')
  assert.equal(formatDemoCentral(''), '')
  const sorted = [
    { businessName: 'Later', demoAt: '2026-10-18T18:00:00Z' },
    { businessName: 'None', demoAt: '' },
    { businessName: 'Sooner', demoAt: '2026-10-16T19:30:00Z' },
  ].sort(compareDemoBooked)
  assert.deepEqual(sorted.map((prospect) => prospect.businessName), ['Sooner', 'Later', 'None'])
})
