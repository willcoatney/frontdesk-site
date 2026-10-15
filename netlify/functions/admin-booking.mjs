import { createHash, timingSafeEqual } from 'node:crypto'
import { readEnv } from './_shared/env.mjs'
import { applyBooking, openBlobStore, updateProspects } from './_shared/prospects.mjs'

const NO_STORE = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
}

const json = (status, body) => new Response(JSON.stringify(body), { status, headers: NO_STORE })

function tokensMatch(expected, given) {
  const left = createHash('sha256').update(String(expected)).digest()
  const right = createHash('sha256').update(String(given)).digest()
  return timingSafeEqual(left, right)
}

function bearerToken(header) {
  if (typeof header !== 'string') return ''
  const match = header.match(/^Bearer\s+(\S+)\s*$/i)
  return match ? match[1] : ''
}

async function readJson(request) {
  const text = await request.text()
  if (text.length > 100_000) return { error: 'Request is too large' }
  if (!text.trim()) return { error: 'Invalid JSON' }
  try {
    const value = JSON.parse(text)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'Invalid booking' }
    return { value }
  } catch {
    return { error: 'Invalid JSON' }
  }
}

export async function handleRequest(request, { env, store, now = new Date() } = {}) {
  if (request.method.toUpperCase() !== 'POST') return json(405, { error: 'Method not allowed' })
  const expected = env?.FRONTDESK_BOOKING_SYNC_TOKEN || ''
  if (!expected) return json(503, { error: 'Booking sync is not configured' })
  if (!tokensMatch(expected, bearerToken(request.headers.get('authorization')))) return json(401, { error: 'Unauthorized' })

  const body = await readJson(request)
  if (body.error) return json(400, { error: body.error })
  const saved = await updateProspects(store, (list) => applyBooking(list, body.value, now))
  if (saved.error === 'Could not save prospects. Try again.') return json(503, { error: saved.error })
  if (saved.error) return json(400, { error: saved.error })
  return json(200, { ok: true, action: saved.action, id: saved.id })
}

export default async function handler(request) {
  const env = readEnv(['FRONTDESK_BOOKING_SYNC_TOKEN'])
  try {
    return await handleRequest(request, { env, store: await openBlobStore() })
  } catch (error) {
    console.error('booking sync failed', error)
    return json(500, { error: 'Something went wrong' })
  }
}
