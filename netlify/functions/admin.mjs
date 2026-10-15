import { clearCookie, passwordsMatch, readCookie, requestIsSecure, sessionCookie, signSession, verifySession, COOKIE_NAME } from './_shared/auth.mjs'
import { readEnv } from './_shared/env.mjs'
import {
  createProspectRecord,
  deleteProspectRecord,
  importRecords,
  listProspects,
  openBlobStore,
  toPublic,
  updateProspectRecord,
  updateProspects,
} from './_shared/prospects.mjs'

const NO_STORE = {
  'Content-Type': 'application/json; charset=utf-8',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
  'Cache-Control': 'no-store',
  'X-Frame-Options': 'DENY',
  'Referrer-Policy': 'no-referrer',
}

const json = (status, body, headers = {}) =>
  new Response(JSON.stringify(body), { status, headers: { ...NO_STORE, ...headers } })

function sameOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return true
  let originHost = ''
  try {
    originHost = new URL(origin).host
  } catch {
    return false
  }
  const forwarded = (request.headers.get('x-forwarded-host') || '').split(',')[0].trim()
  const urlHost = new URL(request.url).host
  const headerHost = request.headers.get('host') || ''
  return originHost === urlHost || (forwarded && originHost === forwarded) || (headerHost && originHost === headerHost)
}

async function readJson(request) {
  const text = await request.text()
  if (text.length > 2_000_000) return { error: 'Request is too large' }
  if (!text.trim()) return { value: {} }
  try {
    const value = JSON.parse(text)
    if (!value || typeof value !== 'object' || Array.isArray(value)) return { error: 'Invalid JSON' }
    return { value }
  } catch {
    return { error: 'Invalid JSON' }
  }
}

function authorized(request, env, now) {
  const secret = env.ADMIN_SESSION_SECRET || ''
  const token = readCookie(request.headers.get('cookie'), COOKIE_NAME)
  return Boolean(secret) && verifySession(secret, token, now)
}

export async function handleRequest(request, { env, store, now = Date.now() } = {}) {
  const url = new URL(request.url)
  const path = url.pathname.replace(/\/+$/, '') || '/'
  const method = request.method.toUpperCase()
  if (method === 'OPTIONS') return json(204, {})

  if (!sameOrigin(request)) return json(403, { error: 'Forbidden' })

  if (path === '/api/admin/login' && method === 'POST') {
    const password = env.ADMIN_PASSWORD || ''
    const secret = env.ADMIN_SESSION_SECRET || ''
    if (!password || !secret) return json(503, { error: 'Admin login is not configured' })
    const body = await readJson(request)
    if (body.error) return json(400, { error: body.error })
    const given = typeof body.value.password === 'string' ? body.value.password : ''
    if (given.length > 1024 || !passwordsMatch(password, given)) return json(401, { error: 'Wrong password' })
    const secure = requestIsSecure(request)
    return json(200, { ok: true }, { 'Set-Cookie': sessionCookie(signSession(secret, now), { secure }) })
  }

  if (path === '/api/admin/logout' && method === 'POST') {
    return json(200, { ok: true }, { 'Set-Cookie': clearCookie({ secure: requestIsSecure(request) }) })
  }

  if (!authorized(request, env, now)) return json(401, { error: 'Unauthorized' })

  if (path === '/api/admin/session' && method === 'GET') return json(200, { ok: true })

  if (path === '/api/admin/prospects' && method === 'GET') {
    const prospects = await listProspects(store)
    return json(200, { prospects })
  }

  if (path === '/api/admin/prospects' && method === 'POST') {
    const body = await readJson(request)
    if (body.error) return json(400, { error: body.error })
    const saved = await updateProspects(store, (list) => createProspectRecord(list, body.value, new Date(now)))
    if (saved.error) return json(saved.error === 'Too many prospects' ? 400 : 400, { error: saved.error })
    return json(201, { prospect: saved.prospect })
  }

  const match = path.match(/^\/api\/admin\/prospects\/([^/]+)$/)
  if (match && (method === 'PATCH' || method === 'DELETE')) {
    const id = decodeURIComponent(match[1])
    if (method === 'DELETE') {
      const saved = await updateProspects(store, (list) => deleteProspectRecord(list, id))
      if (saved.error) return json(404, { error: saved.error })
      return json(200, { ok: true })
    }
    const body = await readJson(request)
    if (body.error) return json(400, { error: body.error })
    const saved = await updateProspects(store, (list) => updateProspectRecord(list, id, body.value, new Date(now)))
    if (saved.error) return json(saved.error === 'Prospect not found' ? 404 : 400, { error: saved.error })
    return json(200, { prospect: saved.prospect })
  }

  if (path === '/api/admin/import' && method === 'POST') {
    const body = await readJson(request)
    if (body.error) return json(400, { error: body.error })
    const saved = await updateProspects(store, (list) => {
      const result = importRecords(list, body.value, new Date(now))
      if (result.error) return result
      return result
    })
    if (saved.error) return json(400, { error: saved.error })
    return json(200, {
      created: saved.created,
      updated: saved.updated,
      emailsMerged: saved.emailsMerged,
      prospects: saved.prospects.map(toPublic),
    })
  }

  return json(404, { error: 'Not found' })
}

export default async function handler(request) {
  const env = readEnv(['ADMIN_PASSWORD', 'ADMIN_SESSION_SECRET'])
  try {
    return await handleRequest(request, { env, store: await openBlobStore() })
  } catch (error) {
    console.error('admin request failed', error)
    return json(500, { error: 'Something went wrong' })
  }
}

export const config = {
  path: ['/api/admin/login', '/api/admin/logout', '/api/admin/session', '/api/admin/prospects', '/api/admin/prospects/:id', '/api/admin/import'],
}
