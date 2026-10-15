export const SCROLL_MARKS = [25, 50, 75, 90]

export const GA_MEASUREMENT_ID = 'G-32PPW2Y56D'

export function resolveMeasurementId(override) {
  if (typeof override !== 'string' || override.trim() === '') return GA_MEASUREMENT_ID
  return measurementId(override) || GA_MEASUREMENT_ID
}

const LANDMARKS = new Set(['HEADER', 'FOOTER', 'NAV'])

export function measurementId(value) {
  if (typeof value !== 'string') return ''
  const id = value.trim()
  if (!/^G-[A-Za-z0-9]+$/.test(id)) return ''
  return id
}

export function isAdminPath(pathname) {
  if (typeof pathname !== 'string' || pathname.length === 0) return false
  const path = pathname.split(/[?#]/)[0]
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    path === '/api/admin' ||
    path.startsWith('/api/admin/')
  )
}

export function linkLocation(node) {
  let current = node
  while (current) {
    const id = typeof current.id === 'string' ? current.id.trim() : ''
    if (id) return id
    const tag = String(current.tagName || '').toUpperCase()
    if (LANDMARKS.has(tag)) return tag.toLowerCase()
    current = current.parentElement || null
  }
  return 'page'
}

export function hitsChatWidget(path) {
  if (!Array.isArray(path)) return false
  for (const node of path) {
    if (!node || typeof node !== 'object') continue
    if (node.id === 'elevenlabs-widget') return true
    if (String(node.tagName || '').toLowerCase() === 'elevenlabs-convai') return true
  }
  return false
}

function sameResource(left, right) {
  const pathOf = (url) => url.pathname.replace(/\/+$/, '') || '/'
  return left.origin === right.origin && pathOf(left) === pathOf(right)
}

export function classifyAnchor({ href, pageUrl, bookingUrl }) {
  if (typeof href !== 'string') return null
  const raw = href.trim()
  if (!raw || raw.startsWith('#')) return null

  let url
  try {
    url = new URL(raw, pageUrl)
  } catch {
    return null
  }

  if (url.protocol === 'tel:') {
    return { event: 'click_call', link_url: url.href }
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null

  try {
    const booking = new URL(bookingUrl)
    if (sameResource(url, booking)) {
      return { event: 'click_book_demo', link_url: url.href }
    }
  } catch {
    // A missing booking URL still leaves other external links as outbound.
  }

  let page
  try {
    page = new URL(pageUrl)
  } catch {
    return null
  }
  if (url.origin !== page.origin) {
    return { event: 'click_outbound', link_url: url.href }
  }
  return null
}

export function pendingScrollMarks(seen, scrollY, viewportHeight, scrollHeight) {
  const max = scrollHeight - viewportHeight
  if (!(max > 0) || !Number.isFinite(scrollY) || !Number.isFinite(viewportHeight)) return []
  const pct = (Math.max(0, scrollY) / max) * 100
  const next = []
  for (const mark of SCROLL_MARKS) {
    if (pct >= mark && !(seen && seen.has(mark))) next.push(mark)
  }
  return next
}
