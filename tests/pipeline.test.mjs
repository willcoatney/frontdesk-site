import assert from 'node:assert/strict'
import { createHmac } from 'node:crypto'
import test from 'node:test'
import { COOKIE_NAME, passwordsMatch, signSession, verifySession } from '../netlify/functions/_shared/auth.mjs'
import { parseCsv } from '../netlify/functions/_shared/csv.mjs'
import { handle } from '../netlify/functions/elevenlabs-call-alert.mjs'
import { handleRequest } from '../netlify/functions/admin.mjs'
import {
  INBOUND_SOURCE,
  RESEARCH_SOURCE,
  applyInbound,
  importRecords,
  memoryStore,
  phoneKey,
  updateProspectRecord,
} from '../netlify/functions/_shared/prospects.mjs'

const env = { ADMIN_PASSWORD: 'correct horse battery', ADMIN_SESSION_SECRET: 'test-session-secret-value' }

function cookieFrom(response) {
  const raw = response.headers.get('set-cookie') || ''
  const pair = raw.split(';')[0]
  const value = pair.slice(pair.indexOf('=') + 1)
  return { raw, value }
}

async function login(store, now = Date.now()) {
  const response = await handleRequest(
    new Request('https://frontdeskkc.com/api/admin/login', {
      method: 'POST',
      headers: { 'content-type': 'application/json', origin: 'https://frontdeskkc.com' },
      body: JSON.stringify({ password: env.ADMIN_PASSWORD }),
    }),
    { env, store, now },
  )
  assert.equal(response.status, 200)
  return cookieFrom(response).value
}

function authed(path, { method = 'GET', token, body, origin = 'https://frontdeskkc.com' } = {}) {
  return new Request(`https://frontdeskkc.com${path}`, {
    method,
    headers: {
      origin,
      cookie: token ? `${COOKIE_NAME}=${token}` : '',
      ...(body ? { 'content-type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
}

test('session cookie is signed, httpOnly, and not the password', async () => {
  const store = memoryStore()
  const response = await handleRequest(
    new Request('https://frontdeskkc.com/api/admin/login', {
      method: 'POST',
      headers: { origin: 'https://frontdeskkc.com' },
      body: JSON.stringify({ password: env.ADMIN_PASSWORD }),
    }),
    { env, store },
  )
  const { raw, value } = cookieFrom(response)
  assert.match(raw, /HttpOnly/i)
  assert.match(raw, /SameSite=Strict/i)
  assert.match(raw, /Secure/i)
  assert.equal(raw.includes(env.ADMIN_PASSWORD), false)
  assert.equal(verifySession(env.ADMIN_SESSION_SECRET, value), true)
  assert.equal(verifySession(env.ADMIN_SESSION_SECRET, `${value}x`), false)
  assert.equal(passwordsMatch(env.ADMIN_PASSWORD, 'nope'), false)
})

test('login fails closed when env is missing and rejects a bad password', async () => {
  const store = memoryStore()
  const missing = await handleRequest(
    new Request('https://frontdeskkc.com/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ password: 'anything' }),
    }),
    { env: {}, store },
  )
  assert.equal(missing.status, 503)

  const wrong = await handleRequest(
    new Request('https://frontdeskkc.com/api/admin/login', {
      method: 'POST',
      headers: { origin: 'https://frontdeskkc.com' },
      body: JSON.stringify({ password: 'nope' }),
    }),
    { env, store },
  )
  assert.equal(wrong.status, 401)
  assert.equal(wrong.headers.get('set-cookie'), null)
  assert.equal(wrong.headers.get('x-robots-tag'), 'noindex, nofollow, noarchive')
})

test('prospect endpoints require the session cookie', async () => {
  const store = memoryStore()
  const denied = await handleRequest(authed('/api/admin/prospects'), { env, store })
  assert.equal(denied.status, 401)

  const token = await login(store)
  const created = await handleRequest(
    authed('/api/admin/prospects', {
      method: 'POST',
      token,
      body: { businessName: 'Example Plumbing', trade: 'Plumbing', city: 'Olathe, KS', phone: '913-555-0101' },
    }),
    { env, store },
  )
  assert.equal(created.status, 201)
  const prospect = (await created.json()).prospect
  assert.equal(prospect.stage, 'new')
  assert.equal(prospect.source, 'manual')

  const patched = await handleRequest(
    authed(`/api/admin/prospects/${prospect.id}`, { method: 'PATCH', token, body: { stage: 'contacted' } }),
    { env, store },
  )
  assert.equal(patched.status, 200)
  assert.equal((await patched.json()).prospect.stage, 'contacted')

  const listed = await handleRequest(authed('/api/admin/prospects', { token }), { env, store })
  assert.equal((await listed.json()).prospects.length, 1)

  const removed = await handleRequest(authed(`/api/admin/prospects/${prospect.id}`, { method: 'DELETE', token }), { env, store })
  assert.equal(removed.status, 200)
  const after = await handleRequest(authed('/api/admin/prospects', { token }), { env, store })
  assert.equal((await after.json()).prospects.length, 0)
})

test('cross-origin mutations are rejected', async () => {
  const store = memoryStore()
  const response = await handleRequest(
    new Request('https://frontdeskkc.com/api/admin/login', {
      method: 'POST',
      headers: { origin: 'https://evil.example', 'content-type': 'application/json' },
      body: JSON.stringify({ password: env.ADMIN_PASSWORD }),
    }),
    { env, store },
  )
  assert.equal(response.status, 403)
})

test('csv import merges emails by business name and stays idempotent', async () => {
  const prospectsCsv = [
    'business_name,trade,city,phone,website,review_signal,gaps,score_1to5,score_reason,source_urls',
    '"Sample Plumbing, LLC",Plumbing,"Olathe, KS",913-555-0100,https://example.test,"4 stars","No booking, no chat",5,"Busy, no site",https://example.test/a',
    'Northwind Electric,Electrical,"Shawnee, KS",913-555-0114,none found,,,,,',
  ].join('\n')
  const emailsCsv = [
    'business_name,email,source_url,note',
    '"Sample Plumbing, LLC",owner@example.test,https://example.test/contact,owner email',
    '"sample plumbing, llc",other@example.test,https://example.test/alt,second address',
    'Missing Name Co,missing@example.test,,no matching prospect yet',
  ].join('\n')

  const first = importRecords([], { prospectsCsv, emailsCsv }, new Date('2026-10-15T12:00:00Z'))
  assert.equal(first.error, undefined)
  assert.equal(first.created, 3)
  assert.equal(first.emailsMerged, 3)
  const plumbing = first.prospects.find((prospect) => prospect.businessName === 'Sample Plumbing, LLC')
  assert.equal(plumbing.stage, 'new')
  assert.equal(plumbing.source, RESEARCH_SOURCE)
  assert.equal(plumbing.email, 'owner@example.test')
  assert.equal(plumbing.city, 'Olathe, KS')
  assert.match(plumbing.notes, /No booking, no chat/)
  assert.match(plumbing.notes, /Alternate email: other@example.test/)
  assert.equal(first.prospects.find((prospect) => prospect.businessName === 'Missing Name Co').email, 'missing@example.test')

  const again = importRecords(first.prospects, { prospectsCsv, emailsCsv }, new Date('2026-10-16T12:00:00Z'))
  assert.equal(again.created, 0)
  assert.equal(again.updated, 0)
  assert.equal(again.prospects.length, 3)

  const moved = updateProspectRecord(again.prospects, plumbing.id, { stage: 'demo booked' }, new Date('2026-10-16T13:00:00Z'))
  const third = importRecords(moved.prospects, { prospectsCsv, emailsCsv })
  assert.equal(third.prospects.find((prospect) => prospect.id === plumbing.id).stage, 'demo booked')
})

test('quoted csv cells survive commas and newlines', () => {
  const parsed = parseCsv('business_name,note\n"Acme, LLC","line one\nline two"\n')
  assert.equal(parsed.rows[0].business_name, 'Acme, LLC')
  assert.equal(parsed.rows[0].note, 'line one\nline two')
})

test('phone keys ignore formatting and a second number', () => {
  assert.equal(phoneKey('(913) 555-0148'), phoneKey('+1 913.555.0148'))
  assert.equal(phoneKey('816-555-0100 / 913-555-0199'), '8165550100')
})

test('inbound calls create a new prospect and dedupe by phone without resetting stage', () => {
  const alert = {
    caller_name: 'Pat Example',
    business_name: 'Example HVAC',
    business_type: 'HVAC',
    callback_number: '(913) 555-0148',
    email: 'pat@example.test',
    summary: 'Wants a demo next Tuesday.',
    conversation_id: 'conv_1',
    is_lead: true,
  }
  const created = applyInbound([], alert, new Date('2026-10-15T15:00:00Z'))
  assert.equal(created.created, true)
  assert.equal(created.prospect.stage, 'new')
  assert.equal(created.prospect.source, INBOUND_SOURCE)
  assert.match(created.prospect.notes, /Pat Example/)
  assert.match(created.prospect.notes, /Wants a demo next Tuesday/)
  assert.match(created.prospect.notes, /913\) 555-0148/)

  const moved = updateProspectRecord(created.prospects, created.prospect.id, { stage: 'demo booked' })
  const again = applyInbound(
    moved.prospects,
    { ...alert, callback_number: '9135550148', conversation_id: 'conv_2', summary: 'Called again about pricing.' },
    new Date('2026-10-16T15:00:00Z'),
  )
  assert.equal(again.prospects.length, 1)
  assert.equal(again.prospect.stage, 'demo booked')
  assert.equal(again.prospect.source, INBOUND_SOURCE)
  assert.match(again.prospect.notes, /Called again about pricing/)

  const retry = applyInbound(again.prospects, { ...alert, callback_number: '+1-913-555-0148' }, new Date('2026-10-16T16:00:00Z'))
  assert.equal(retry.prospects.length, 1)
  assert.equal(retry.prospect.notes.split('Inbound call').length - 1, 2)
})

test('call relay still forwards and also saves the prospect', async () => {
  const secret = 'webhook-secret'
  const payload = {
    type: 'post_call_transcription',
    data: {
      conversation_id: 'conv_9',
      analysis: {
        transcript_summary: 'Needs a missed-call text back.',
        data_collection_results: {
          caller_name: { value: 'Riley Example' },
          business_name: { value: 'Example Roofing' },
          callback_number: { value: '816-555-0177' },
          is_lead: { value: true },
        },
      },
    },
  }
  const raw = JSON.stringify(payload)
  const t = Math.floor(Date.now() / 1000)
  const sig = createHmac('sha256', secret).update(`${t}.${raw}`).digest('hex')
  const request = new Request('https://frontdeskkc.com/.netlify/functions/elevenlabs-call-alert', {
    method: 'POST',
    headers: { 'elevenlabs-signature': `t=${t},v0=${sig}` },
    body: raw,
  })
  const store = memoryStore()
  let forwarded
  const { upsertFromCallAlert } = await import('../netlify/functions/_shared/prospects.mjs')
  const response = await handle(
    request,
    { ELEVENLABS_WEBHOOK_SECRET: secret, FRONTDESK_ALERT_WEBHOOK_AUTH: 'token' },
    async (_url, init) => {
      forwarded = JSON.parse(init.body)
      return new Response('ok', { status: 200 })
    },
    { upsertProspect: (alert) => upsertFromCallAlert(alert, store) },
  )
  assert.equal(response.status, 200)
  assert.equal((await response.json()).forwarded, true)
  assert.equal(forwarded.business_name, 'Example Roofing')
  assert.match(forwarded.text, /Riley Example/)
  const { listProspects } = await import('../netlify/functions/_shared/prospects.mjs')
  const prospects = await listProspects(store)
  assert.equal(prospects.length, 1)
  assert.equal(prospects[0].source, 'inbound call')
  assert.equal(prospects[0].stage, 'new')
  assert.equal(phoneKey(prospects[0].phone), '8165550177')
})

test('a prospect save failure does not change the alert response', async () => {
  const secret = 'webhook-secret'
  const raw = JSON.stringify({ type: 'post_call_transcription', data: { conversation_id: 'conv_x' } })
  const t = Math.floor(Date.now() / 1000)
  const sig = createHmac('sha256', secret).update(`${t}.${raw}`).digest('hex')
  const response = await handle(
    new Request('https://frontdeskkc.com/.netlify/functions/elevenlabs-call-alert', {
      method: 'POST',
      headers: { 'elevenlabs-signature': `t=${t},v0=${sig}` },
      body: raw,
    }),
    { ELEVENLABS_WEBHOOK_SECRET: secret, FRONTDESK_ALERT_WEBHOOK_AUTH: 'Bearer token' },
    async () => new Response('ok', { status: 200 }),
    {
      upsertProspect: async () => {
        throw new Error('blobs down')
      },
    },
  )
  assert.equal(response.status, 200)
  assert.equal((await response.json()).forwarded, true)
})

test('unsigned webhooks are still rejected before any save', async () => {
  let saved = false
  const response = await handle(
    new Request('https://frontdeskkc.com/.netlify/functions/elevenlabs-call-alert', {
      method: 'POST',
      headers: { 'elevenlabs-signature': 't=1,v0=abcd' },
      body: '{}',
    }),
    { ELEVENLABS_WEBHOOK_SECRET: 'webhook-secret', FRONTDESK_ALERT_WEBHOOK_AUTH: 'token' },
    async () => new Response('ok'),
    {
      upsertProspect: async () => {
        saved = true
      },
    },
  )
  assert.equal(response.status, 401)
  assert.equal(saved, false)
})

test('expired sessions are rejected', async () => {
  const store = memoryStore()
  const issuedAt = Date.now() - 20 * 24 * 60 * 60 * 1000
  const token = signSession(env.ADMIN_SESSION_SECRET, issuedAt)
  const response = await handleRequest(authed('/api/admin/prospects', { token }), { env, store, now: Date.now() })
  assert.equal(response.status, 401)
})
