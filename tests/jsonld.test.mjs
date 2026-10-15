import assert from 'node:assert/strict'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join, relative, sep } from 'node:path'
import { fileURLToPath } from 'node:url'
import test from 'node:test'

const OUT = fileURLToPath(new URL('../out/', import.meta.url))
const PHONE = '+19133498507'
const AREA = 'Kansas City metropolitan area'
const PRICE_KEYS = new Set([
  'price',
  'priceRange',
  'offers',
  'priceSpecification',
  'priceCurrency',
  'minPrice',
  'maxPrice',
  'lowPrice',
  'highPrice',
])

const SERVICE_PAGES = {
  'missed-call-text-back': {
    name: 'Missed-call text-back',
    serviceType: 'Missed-call text-back',
  },
  'ai-receptionist-vs-answering-service': {
    name: 'FrontDesk AI',
    serviceType: 'AI receptionist',
  },
  websites: {
    name: 'Kansas City web design with an AI receptionist',
    serviceType: 'Web design and AI receptionist',
  },
}

function htmlFiles(dir) {
  const found = []
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) found.push(...htmlFiles(path))
    else if (entry.name.endsWith('.html')) found.push(path)
  }
  return found
}

function rel(path) {
  return relative(OUT, path).split(sep).join('/')
}

function pagePath(files, slug) {
  const wanted = slug === '' ? ['index.html'] : [`${slug}.html`, `${slug}/index.html`]
  const match = files.find((file) => wanted.includes(rel(file)))
  assert.ok(match, `missing exported HTML for /${slug}`)
  return match
}

function jsonLdBlocks(html, file) {
  const blocks = []
  const re = /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi
  let match
  while ((match = re.exec(html))) {
    const raw = match[1].trim()
    try {
      blocks.push(JSON.parse(raw))
    } catch (error) {
      assert.fail(`${rel(file)} has JSON-LD that does not parse: ${error.message}\n${raw.slice(0, 180)}`)
    }
  }
  return blocks
}

function nodesOfType(value, type, found = []) {
  if (!value || typeof value !== 'object') return found
  if (Array.isArray(value)) {
    for (const item of value) nodesOfType(item, type, found)
    return found
  }
  const types = value['@type']
  const list = Array.isArray(types) ? types : types ? [types] : []
  if (list.includes(type)) found.push(value)
  for (const child of Object.values(value)) nodesOfType(child, type, found)
  return found
}

function h1Text(html, file) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)
  assert.ok(match, `${rel(file)} is missing an H1`)
  const text = match[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  assert.equal(html.match(/<h1\b/gi).length, 1, `${rel(file)} should have one H1`)
  return text
}

function areaName(area) {
  if (typeof area === 'string') return area
  if (area && typeof area === 'object' && !Array.isArray(area)) return area.name
  return undefined
}

function assertNoPriceFields(node, label) {
  if (!node || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const item of node) assertNoPriceFields(item, label)
    return
  }
  for (const key of Object.keys(node)) {
    assert.equal(PRICE_KEYS.has(key), false, `${label} includes a price field (${key})`)
    assertNoPriceFields(node[key], label)
  }
}

test('exported HTML JSON-LD parses', () => {
  assert.equal(existsSync(OUT), true, 'out/ is missing. Run npm run build before this test.')
  const files = htmlFiles(OUT)
  assert.ok(files.length > 0, 'export produced no HTML')

  let blocks = 0
  for (const file of files) {
    const html = readFileSync(file, 'utf8')
    blocks += jsonLdBlocks(html, file).length
  }
  assert.ok(blocks > 0, 'export contained no JSON-LD')
})

test('HVAC and roofing H1s are unique and trade-specific', () => {
  const files = htmlFiles(OUT)
  const hvac = h1Text(readFileSync(pagePath(files, 'hvac'), 'utf8'), pagePath(files, 'hvac'))
  const roofing = h1Text(readFileSync(pagePath(files, 'roofing'), 'utf8'), pagePath(files, 'roofing'))

  assert.equal(hvac, 'The phone gets answered while you are in the attic.')
  assert.equal(roofing, 'The phone gets answered while you are on the roof.')
  assert.notEqual(hvac, roofing)
})

test('keyword pages keep FAQ schema and add Service plus LocalBusiness', () => {
  const files = htmlFiles(OUT)

  for (const [slug, expected] of Object.entries(SERVICE_PAGES)) {
    const file = pagePath(files, slug)
    const html = readFileSync(file, 'utf8')
    const blocks = jsonLdBlocks(html, file)
    const services = blocks.flatMap((block) => nodesOfType(block, 'Service'))
    const businesses = blocks.flatMap((block) => nodesOfType(block, 'LocalBusiness'))
    const faqs = blocks.flatMap((block) => nodesOfType(block, 'FAQPage'))

    assert.equal(services.length, 1, `${slug} should have one Service`)
    assert.equal(businesses.length, 1, `${slug} should have one LocalBusiness`)
    assert.equal(faqs.length, 1, `${slug} should keep its FAQPage`)
    assert.ok(faqs[0].mainEntity.length > 0, `${slug} FAQ is empty`)

    const service = services[0]
    const business = businesses[0]
    assert.equal(service.name, expected.name)
    assert.equal(service.serviceType, expected.serviceType)
    assert.equal(areaName(service.areaServed), AREA)
    assert.equal(areaName(business.areaServed), AREA)
    assert.equal(business.telephone, PHONE)
    assert.equal(business.name, 'FrontDesk KC')
    assert.equal(service.provider['@id'], business['@id'])
    assertNoPriceFields(service, `${slug} Service`)
    assertNoPriceFields(business, `${slug} LocalBusiness`)
  }
})
