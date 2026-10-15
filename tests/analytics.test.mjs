import assert from 'node:assert/strict'
import test from 'node:test'
import {
  classifyAnchor,
  hitsChatWidget,
  isAdminPath,
  linkLocation,
  measurementId,
  pendingScrollMarks,
} from '../src/lib/analytics-events.mjs'

const pageUrl = 'https://frontdeskkc.com/pricing'
const bookingUrl = 'https://calendar.app.google/p9muXBgfH2vFVhUd7'

test('measurement id is empty unless it is a GA4 id', () => {
  assert.equal(measurementId(undefined), '')
  assert.equal(measurementId(null), '')
  assert.equal(measurementId(''), '')
  assert.equal(measurementId('   '), '')
  assert.equal(measurementId('UA-123'), '')
  assert.equal(measurementId('G-ABC<script>'), '')
  assert.equal(measurementId(' G-AB12cd '), 'G-AB12cd')
})

test('admin paths are excluded and nearby paths are not', () => {
  for (const path of ['/admin', '/admin/', '/admin/prospects', '/admin?x=1', '/api/admin', '/api/admin/session']) {
    assert.equal(isAdminPath(path), true, path)
  }
  for (const path of ['/', '/pricing', '/administration', '/api/admin-tools', '/plumbers']) {
    assert.equal(isAdminPath(path), false, path)
  }
})

test('clicks classify as call, demo, outbound, or nothing', () => {
  assert.deepEqual(classifyAnchor({ href: 'tel:+19133498507', pageUrl, bookingUrl }), {
    event: 'click_call',
    link_url: 'tel:+19133498507',
  })
  assert.equal(
    classifyAnchor({ href: bookingUrl, pageUrl, bookingUrl }).event,
    'click_book_demo',
  )
  assert.equal(
    classifyAnchor({ href: `${bookingUrl}/`, pageUrl, bookingUrl }).event,
    'click_book_demo',
  )
  assert.equal(
    classifyAnchor({ href: 'https://example.com/offer', pageUrl, bookingUrl }).event,
    'click_outbound',
  )
  assert.equal(classifyAnchor({ href: '/pricing', pageUrl, bookingUrl }), null)
  assert.equal(classifyAnchor({ href: 'mailto:owner@example.com', pageUrl, bookingUrl }), null)
  assert.equal(classifyAnchor({ href: 'sms:+19133498507', pageUrl, bookingUrl }), null)
  assert.equal(classifyAnchor({ href: '#faq', pageUrl, bookingUrl }), null)
})

test('link location prefers the nearest id, then a landmark', () => {
  const footer = { tagName: 'FOOTER', id: '', parentElement: null }
  const wrap = { tagName: 'DIV', id: '', parentElement: footer }
  const link = { tagName: 'A', id: '', parentElement: wrap }
  assert.equal(linkLocation(link), 'footer')

  const section = { tagName: 'SECTION', id: 'top-cta', parentElement: null }
  const heroLink = { tagName: 'A', id: '', parentElement: section }
  assert.equal(linkLocation(heroLink), 'top-cta')
  assert.equal(linkLocation({ tagName: 'A', id: '', parentElement: null }), 'page')
})

test('chat clicks are the widget mount or the convai element', () => {
  assert.equal(hitsChatWidget([{ id: 'elevenlabs-widget', tagName: 'DIV' }]), true)
  assert.equal(hitsChatWidget([{ id: '', tagName: 'ELEVENLABS-CONVAI' }]), true)
  assert.equal(hitsChatWidget([{ id: 'top-cta', tagName: 'A' }]), false)
  assert.equal(hitsChatWidget(null), false)
})

test('scroll marks fire once at each threshold and not on a short page', () => {
  const seen = new Set()
  assert.deepEqual(pendingScrollMarks(seen, 0, 800, 800), [])
  assert.deepEqual(pendingScrollMarks(seen, 0, 800, 1600), [])
  assert.deepEqual(pendingScrollMarks(seen, 200, 800, 1600), [25])
  seen.add(25)
  assert.deepEqual(pendingScrollMarks(seen, 400, 800, 1600), [50])
  assert.deepEqual(pendingScrollMarks(new Set([25, 50, 75, 90]), 800, 800, 1600), [])
})
