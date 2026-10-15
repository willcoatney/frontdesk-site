import { classifyCsv, parseCsv } from './csv.mjs'

export const STORE_NAME = 'frontdesk-pipeline'
export const STORE_KEY = 'prospects'
export const RESEARCH_SOURCE = 'kc_research'
export const INBOUND_SOURCE = 'inbound call'
export const STAGES = ['new', 'contacted', 'replied', 'demo booked', 'won', 'lost']

const MAX_PROSPECTS = 5000
const ID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

export function nameKey(name) {
  return String(name || '')
    .normalize('NFKC')
    .trim()
    .replace(/\s+/g, ' ')
    .toLowerCase()
}

// First 10-digit number, so "816-555-0100 / 913-555-0199" dedupes on the first.
export function phoneKey(phone) {
  const matches = String(phone || '').match(/\d[\d\s().-]{6,}\d/g) || []
  for (const match of matches) {
    let digits = match.replace(/\D/g, '')
    if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
    if (digits.length >= 10) return digits.slice(-10)
  }
  let digits = String(phone || '').replace(/\D/g, '')
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
  if (digits.length >= 10) return digits.slice(-10)
  return ''
}

export function appendUnique(existing, block) {
  const next = String(block || '').trim()
  if (!next) return existing || ''
  const current = existing || ''
  if (current.includes(next)) return current
  return current ? `${current}\n\n${next}` : next
}

function nowIso(now) {
  return (now instanceof Date ? now : new Date(now)).toISOString()
}

function validDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
}

export function toPublic(prospect) {
  return {
    id: prospect.id,
    businessName: prospect.businessName,
    trade: prospect.trade,
    city: prospect.city,
    stage: prospect.stage,
    notes: prospect.notes,
    nextFollowUp: prospect.nextFollowUp,
    source: prospect.source,
    phone: prospect.phone,
    email: prospect.email,
    website: prospect.website,
    createdAt: prospect.createdAt,
    updatedAt: prospect.updatedAt,
  }
}

function blankProspect(now) {
  const iso = nowIso(now)
  return {
    id: crypto.randomUUID(),
    businessName: '',
    trade: '',
    city: '',
    stage: 'new',
    notes: '',
    nextFollowUp: '',
    source: '',
    phone: '',
    email: '',
    website: '',
    conversationId: '',
    createdAt: iso,
    updatedAt: iso,
  }
}

function normalizeStored(raw) {
  if (!raw || typeof raw !== 'object') return null
  const stage = STAGES.includes(raw.stage) ? raw.stage : 'new'
  return {
    id: String(raw.id || ''),
    businessName: String(raw.businessName || ''),
    trade: String(raw.trade || ''),
    city: String(raw.city || ''),
    stage,
    notes: String(raw.notes || ''),
    nextFollowUp: typeof raw.nextFollowUp === 'string' ? raw.nextFollowUp : '',
    source: String(raw.source || ''),
    phone: String(raw.phone || ''),
    email: String(raw.email || ''),
    website: String(raw.website || ''),
    conversationId: String(raw.conversationId || ''),
    createdAt: String(raw.createdAt || ''),
    updatedAt: String(raw.updatedAt || ''),
  }
}

function clip(value, max) {
  const text = String(value ?? '').trim()
  if (text.length > max) return { error: 'A field is too long' }
  return { value: text }
}

export function sanitizeProspect(input, { partial = false } = {}) {
  if (!input || typeof input !== 'object') return { error: 'Invalid prospect' }
  const output = {}
  const take = (key, max, { required = false, check } = {}) => {
    if (partial && !(key in input)) return null
    const clipped = clip(input[key], max)
    if (clipped.error) return clipped.error
    if (required && !clipped.value) return 'Business name is required'
    if (check) {
      const problem = check(clipped.value)
      if (problem) return problem
    }
    output[key] = clipped.value
    return null
  }

  const nameError = take('businessName', 200, { required: !partial || 'businessName' in input })
  if (nameError) return { error: nameError }
  for (const key of ['trade', 'city']) {
    const problem = take(key, 120)
    if (problem) return { error: problem }
  }
  const sourceError = take('source', 80)
  if (sourceError) return { error: sourceError }
  const notesError = take('notes', 20000)
  if (notesError) return { error: notesError }
  const phoneError = take('phone', 160, {
    check: (value) => (value && /[\r\n]/.test(value) ? 'Phone looks invalid' : ''),
  })
  if (phoneError) return { error: phoneError }
  const emailError = take('email', 200, {
    check: (value) => (value && !/^[^\s@]+@[^\s@]+$/.test(value) ? 'Email looks invalid' : ''),
  })
  if (emailError) return { error: emailError }
  const websiteError = take('website', 500, {
    check: (value) => {
      if (!value) return ''
      if (/^(javascript|data):/i.test(value)) return 'Website looks invalid'
      return ''
    },
  })
  if (websiteError) return { error: websiteError }
  if (!partial || 'stage' in input) {
    const stage = String(input.stage ?? '').trim()
    if (!STAGES.includes(stage)) return { error: 'Stage is invalid' }
    output.stage = stage
  }
  if (!partial || 'nextFollowUp' in input) {
    const nextFollowUp = String(input.nextFollowUp ?? '').trim()
    if (nextFollowUp && !validDate(nextFollowUp)) return { error: 'Follow-up date is invalid' }
    output.nextFollowUp = nextFollowUp
  }
  return { prospect: output }
}

async function readBlob(store) {
  const current = await store.getWithMetadata(STORE_KEY, { type: 'json' })
  const list = Array.isArray(current?.data?.prospects) ? current.data.prospects : []
  return {
    prospects: list.map(normalizeStored).filter((prospect) => prospect && prospect.id),
    etag: current?.etag || '',
  }
}

async function writeBlob(store, prospects, etag) {
  const payload = { v: 1, prospects }
  if (!etag) {
    const created = await store.setJSON(STORE_KEY, payload, { onlyIfNew: true })
    return created?.modified !== false
  }
  const updated = await store.setJSON(STORE_KEY, payload, { onlyIfMatch: etag })
  return updated?.modified !== false
}

export async function updateProspects(store, mutator) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const current = await readBlob(store)
    const result = mutator(current.prospects.map((prospect) => ({ ...prospect })))
    if (result?.error) return result
    if (!Array.isArray(result?.prospects)) return { error: 'Could not save prospects' }
    if (result.prospects.length > MAX_PROSPECTS) return { error: 'Too many prospects' }
    const saved = await writeBlob(store, result.prospects, current.etag)
    if (saved) return result
  }
  return { error: 'Could not save prospects. Try again.' }
}

export async function listProspects(store) {
  const current = await readBlob(store)
  return current.prospects.map(toPublic)
}

export function createProspectRecord(list, input, now = new Date()) {
  const clean = sanitizeProspect({ stage: 'new', source: 'manual', ...input })
  if (clean.error) return clean
  if (list.length >= MAX_PROSPECTS) return { error: 'Too many prospects' }
  const prospect = { ...blankProspect(now), ...clean.prospect }
  return { prospects: [...list, prospect], prospect: toPublic(prospect) }
}

export function updateProspectRecord(list, id, input, now = new Date()) {
  if (!ID_RE.test(id)) return { error: 'Prospect not found' }
  const index = list.findIndex((prospect) => prospect.id === id)
  if (index < 0) return { error: 'Prospect not found' }
  const clean = sanitizeProspect(input, { partial: true })
  if (clean.error) return clean
  const next = {
    ...list[index],
    ...clean.prospect,
    id: list[index].id,
    conversationId: list[index].conversationId,
    createdAt: list[index].createdAt,
    updatedAt: nowIso(now),
  }
  const prospects = list.slice()
  prospects[index] = next
  return { prospects, prospect: toPublic(next) }
}

export function deleteProspectRecord(list, id) {
  if (!ID_RE.test(id)) return { error: 'Prospect not found' }
  const next = list.filter((prospect) => prospect.id !== id)
  if (next.length === list.length) return { error: 'Prospect not found' }
  return { prospects: next }
}

function researchNotes(row) {
  const lines = []
  if (row.review_signal) lines.push(`Review signal: ${row.review_signal}`)
  if (row.gaps) lines.push(`Gaps: ${row.gaps}`)
  if (row.score_1to5) lines.push(`Score: ${row.score_1to5}${row.score_reason ? ` — ${row.score_reason}` : ''}`)
  else if (row.score_reason) lines.push(`Score reason: ${row.score_reason}`)
  if (row.source_urls) lines.push(`Sources: ${row.source_urls}`)
  return lines.join('\n')
}

function emailNotes(row) {
  return [row.note ? `Email note: ${row.note}` : '', row.source_url ? `Email source: ${row.source_url}` : '']
    .filter(Boolean)
    .join('\n')
}

function fillEmpty(prospect, fields) {
  for (const [key, value] of Object.entries(fields)) {
    if (!value) continue
    if (!prospect[key]) prospect[key] = value
  }
}

export function importRecords(existing, input, now = new Date()) {
  const prospectsCsv = String(input?.prospectsCsv || '')
  const emailsCsv = String(input?.emailsCsv || '')
  if (!prospectsCsv.trim() && !emailsCsv.trim()) return { error: 'Choose a CSV to import' }
  if (prospectsCsv.length > 1_500_000 || emailsCsv.length > 1_500_000) return { error: 'CSV is too large' }

  let prospectRows = []
  let emailRows = []
  const take = (csv, slot) => {
    const parsed = parseCsv(csv)
    if (!parsed.rows.length && !parsed.headers.length) return { error: `${slot} CSV is empty` }
    const kind = classifyCsv(parsed.headers)
    if (kind === 'unknown') return { error: `${slot} CSV needs a business_name column` }
    return { kind, rows: parsed.rows }
  }

  if (prospectsCsv.trim()) {
    const parsed = take(prospectsCsv, 'Prospects')
    if (parsed.error) return parsed
    if (parsed.kind === 'emails') emailRows = emailRows.concat(parsed.rows)
    else prospectRows = prospectRows.concat(parsed.rows)
  }
  if (emailsCsv.trim()) {
    const parsed = take(emailsCsv, 'Emails')
    if (parsed.error) return parsed
    if (parsed.kind === 'prospects' && prospectRows.length === 0) prospectRows = parsed.rows
    else if (parsed.kind === 'prospects') return { error: 'That emails file looks like the prospects CSV' }
    else emailRows = emailRows.concat(parsed.rows)
  }

  const prospects = existing.map((prospect) => ({ ...prospect }))
  const byName = new Map()
  for (const prospect of prospects) {
    const key = nameKey(prospect.businessName)
    if (key && !byName.has(key)) byName.set(key, prospect)
  }

  const findExisting = (businessName, phone) => {
    const named = byName.get(nameKey(businessName))
    if (named) return named
    const key = phoneKey(phone)
    if (!key) return null
    const matches = prospects.filter((prospect) => phoneKey(prospect.phone) === key)
    return matches.length === 1 ? matches[0] : null
  }

  for (const row of prospectRows) {
    const businessName = String(row.business_name || '').trim()
    if (!businessName) continue
    const notes = researchNotes(row)
    let prospect = findExisting(businessName, row.phone)
    if (!prospect) {
      prospect = blankProspect(now)
      prospect.businessName = businessName
      prospect.trade = row.trade || ''
      prospect.city = row.city || ''
      prospect.phone = row.phone || ''
      prospect.website = row.website || ''
      prospect.stage = 'new'
      prospect.source = RESEARCH_SOURCE
      prospect.notes = notes
      prospects.push(prospect)
      byName.set(nameKey(businessName), prospect)
      continue
    }
    const snapshot = JSON.stringify(prospect)
    if (prospect.businessName === 'Inbound caller') {
      prospect.businessName = businessName
      byName.set(nameKey(businessName), prospect)
    }
    fillEmpty(prospect, {
      trade: row.trade || '',
      city: row.city || '',
      phone: row.phone || '',
      website: row.website || '',
      source: RESEARCH_SOURCE,
    })
    prospect.notes = appendUnique(prospect.notes, notes)
    if (JSON.stringify(prospect) !== snapshot) prospect.updatedAt = nowIso(now)
  }

  let emailsMerged = 0
  for (const row of emailRows) {
    const businessName = String(row.business_name || '').trim()
    if (!businessName) continue
    const email = String(row.email || '').trim()
    let prospect = byName.get(nameKey(businessName))
    if (!prospect) {
      prospect = blankProspect(now)
      prospect.businessName = businessName
      prospect.email = email
      prospect.stage = 'new'
      prospect.source = RESEARCH_SOURCE
      prospect.notes = emailNotes(row)
      prospects.push(prospect)
      byName.set(nameKey(businessName), prospect)
      if (email) emailsMerged += 1
      continue
    }
    const snapshot = JSON.stringify(prospect)
    if (email) {
      if (!prospect.email) prospect.email = email
      else if (prospect.email.toLowerCase() !== email.toLowerCase()) {
        prospect.notes = appendUnique(prospect.notes, `Alternate email: ${email}`)
      }
      emailsMerged += 1
    }
    prospect.notes = appendUnique(prospect.notes, emailNotes(row))
    if (!prospect.source) prospect.source = RESEARCH_SOURCE
    if (JSON.stringify(prospect) !== snapshot) prospect.updatedAt = nowIso(now)
  }

  if (prospects.length > MAX_PROSPECTS) return { error: 'Too many prospects' }
  const previous = new Set(existing.map((prospect) => prospect.id))
  const created = prospects.filter((prospect) => !previous.has(prospect.id)).length
  const updated = prospects.filter((prospect) => {
    if (!previous.has(prospect.id)) return false
    const before = existing.find((item) => item.id === prospect.id)
    return JSON.stringify(before) !== JSON.stringify(prospect)
  }).length
  return { prospects, created, updated, emailsMerged }
}

function callNote(alert) {
  const phone = String(alert.callback_number || '').trim()
  const lines = ['Inbound call']
  if (alert.caller_name) lines.push(`Name: ${alert.caller_name}`)
  if (alert.business_name) lines.push(`Business: ${alert.business_name}`)
  if (phone) lines.push(`Phone: ${phone}`)
  if (alert.email) lines.push(`Email: ${alert.email}`)
  if (alert.lead_temperature) lines.push(`Lead temperature: ${alert.lead_temperature}`)
  if (alert.is_lead === false || alert.is_lead === 'false') lines.push('Not flagged as a lead')
  if (alert.interest) lines.push(`Interest: ${alert.interest}`)
  if (alert.preferred_time) lines.push(`Preferred time: ${alert.preferred_time}`)
  if (alert.summary) lines.push(`Summary: ${alert.summary}`)
  if (alert.conversation_id) lines.push(`Conversation: ${alert.conversation_id}`)
  return lines.join('\n')
}

export function applyInbound(list, alert, now = new Date()) {
  const phone = String(alert?.callback_number || '').trim()
  const key = phoneKey(phone)
  const conversationId = String(alert?.conversation_id || '').trim()
  const businessName = String(alert?.business_name || alert?.caller_name || 'Inbound caller').trim() || 'Inbound caller'
  const note = callNote(alert || {})
  const iso = nowIso(now)

  let index = -1
  if (key) index = list.findIndex((prospect) => phoneKey(prospect.phone) === key)
  if (index < 0 && conversationId) {
    index = list.findIndex((prospect) => prospect.conversationId && prospect.conversationId === conversationId)
  }

  if (index >= 0) {
    const current = { ...list[index] }
    const snapshot = JSON.stringify(current)
    if ((!current.businessName || current.businessName === 'Inbound caller') && alert?.business_name) {
      current.businessName = String(alert.business_name).trim()
    }
    fillEmpty(current, {
      trade: String(alert?.business_type || '').trim(),
      email: String(alert?.email || '').trim(),
      phone,
      source: INBOUND_SOURCE,
    })
    if (conversationId && !current.conversationId) current.conversationId = conversationId
    const seen = conversationId && current.notes.includes(`Conversation: ${conversationId}`)
    if (!seen) current.notes = appendUnique(current.notes, note)
    if (JSON.stringify(current) !== snapshot) current.updatedAt = iso
    const prospects = list.slice()
    prospects[index] = current
    return { prospects, prospect: toPublic(current), created: false }
  }

  const prospect = blankProspect(now)
  prospect.businessName = businessName
  prospect.trade = String(alert?.business_type || '').trim()
  prospect.stage = 'new'
  prospect.source = INBOUND_SOURCE
  prospect.phone = phone
  prospect.email = String(alert?.email || '').trim()
  prospect.notes = note
  prospect.conversationId = conversationId
  return { prospects: [...list, prospect], prospect: toPublic(prospect), created: true }
}

export async function upsertFromCallAlert(alert, store) {
  const db = store || (await openBlobStore())
  return updateProspects(db, (list) => applyInbound(list, alert))
}

export async function openBlobStore() {
  const { getStore } = await import('@netlify/blobs')
  return getStore({ name: STORE_NAME, consistency: 'strong' })
}

export function memoryStore() {
  let data = null
  let etag = ''
  return {
    async getWithMetadata() {
      if (!data) return null
      return { data, etag, metadata: {} }
    },
    async setJSON(_key, value, options = {}) {
      if (options.onlyIfNew && data) return { modified: false }
      if (options.onlyIfMatch && options.onlyIfMatch !== etag) return { modified: false }
      data = structuredClone(value)
      etag = String((Number(etag) || 0) + 1)
      return { modified: true, etag }
    },
  }
}
