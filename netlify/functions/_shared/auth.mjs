import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

export const COOKIE_NAME = 'fd_admin'
const MAX_AGE_SECONDS = 60 * 60 * 24 * 14

export function passwordsMatch(expected, given) {
  if (typeof expected !== 'string' || !expected || typeof given !== 'string') return false
  const a = createHash('sha256').update(expected).digest()
  const b = createHash('sha256').update(given).digest()
  return timingSafeEqual(a, b)
}

export function signSession(secret, now = Date.now()) {
  const payload = Buffer.from(JSON.stringify({ exp: now + MAX_AGE_SECONDS * 1000, v: 1 })).toString('base64url')
  const sig = createHmac('sha256', secret).update(payload).digest('base64url')
  return `${payload}.${sig}`
}

export function verifySession(secret, token, now = Date.now()) {
  if (!secret || typeof token !== 'string' || !token.includes('.')) return false
  const splitAt = token.lastIndexOf('.')
  const payload = token.slice(0, splitAt)
  const sig = token.slice(splitAt + 1)
  const expected = createHmac('sha256', secret).update(payload).digest('base64url')
  const got = Buffer.from(sig)
  const want = Buffer.from(expected)
  if (got.length !== want.length || !timingSafeEqual(got, want)) return false
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString())
    return data?.v === 1 && typeof data.exp === 'number' && data.exp > now
  } catch {
    return false
  }
}

export function readCookie(header, name) {
  if (!header) return ''
  for (const part of header.split(';')) {
    const eq = part.indexOf('=')
    if (eq === -1) continue
    if (part.slice(0, eq).trim() !== name) continue
    try {
      return decodeURIComponent(part.slice(eq + 1).trim())
    } catch {
      return ''
    }
  }
  return ''
}

export function sessionCookie(token, { secure, maxAge = MAX_AGE_SECONDS } = {}) {
  const parts = [`${COOKIE_NAME}=${token}`, 'HttpOnly', 'Path=/', 'SameSite=Strict', `Max-Age=${maxAge}`]
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

export function clearCookie({ secure } = {}) {
  return sessionCookie('', { secure, maxAge: 0 })
}

export function requestIsSecure(request) {
  const forwarded = request.headers.get('x-forwarded-proto')
  if (forwarded) return forwarded.split(',')[0].trim() === 'https'
  return new URL(request.url).protocol === 'https:'
}
