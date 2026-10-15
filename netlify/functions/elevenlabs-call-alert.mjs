// Relays ElevenLabs post-call webhooks (HMAC-verified) to the FrontDesk lead-alert automation.
import { createHmac, timingSafeEqual } from 'node:crypto'

const RECEIVER_URL = 'https://api2.cursor.sh/automations/webhook/e896c6f2-aba2-5924-8836-ae15718618c1'
const MAX_AGE_SECONDS = 30 * 60

const json = (status, body) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })

export function verifySignature(header, rawBody, secret, nowSeconds = Math.floor(Date.now() / 1000)) {
  if (!header || !secret) return false
  const parts = Object.fromEntries(
    header.split(',').map((p) => {
      const i = p.indexOf('=')
      return [p.slice(0, i).trim(), p.slice(i + 1).trim()]
    })
  )
  const t = Number(parts.t)
  if (!parts.t || !Number.isFinite(t) || !parts.v0) return false
  if (Math.abs(nowSeconds - t) > MAX_AGE_SECONDS) return false
  const expected = createHmac('sha256', secret).update(`${parts.t}.${rawBody}`).digest()
  let got
  try {
    got = Buffer.from(parts.v0, 'hex')
  } catch {
    return false
  }
  return got.length === expected.length && timingSafeEqual(got, expected)
}

const val = (r, k) => {
  const e = r?.[k]
  const v = e && typeof e === 'object' ? e.value : e
  return v === undefined || v === null || v === '' ? null : v
}

// Last spoken agent turn. Tool-only turns often store null/None and are skipped.
const lastAgentMessage = (transcript) => {
  if (!Array.isArray(transcript)) return null
  for (let i = transcript.length - 1; i >= 0; i--) {
    const turn = transcript[i]
    if (!turn || turn.role !== 'agent') continue
    const msg = turn.message
    if (typeof msg !== 'string' || msg === 'None') continue
    const text = msg.trim()
    if (!text || text === 'None') continue
    return text.slice(0, 300)
  }
  return null
}

export function buildAlert(payload) {
  const d = payload.data || {}
  const a = d.analysis || {}
  const r = a.data_collection_results || {}
  const lead = {
    caller_name: val(r, 'caller_name'),
    business_name: val(r, 'business_name'),
    business_type: val(r, 'business_type'),
    callback_number: val(r, 'callback_number'),
    email: val(r, 'email'),
    interest: val(r, 'interest'),
    preferred_time: val(r, 'preferred_time'),
    is_lead: val(r, 'is_lead'),
    lead_temperature: val(r, 'lead_temperature'),
  }
  const duration = d.metadata?.call_duration_secs ?? null
  const summary = a.transcript_summary || null
  const closing = lastAgentMessage(d.transcript)
  const lines = [
    `New FrontDesk call${lead.is_lead === false || lead.is_lead === 'false' ? ' (not flagged as a lead)' : ' lead'}`,
    lead.lead_temperature ? `Lead temperature: ${lead.lead_temperature}` : null,
    `Caller: ${lead.caller_name || 'unknown'}${lead.business_name ? ` (${lead.business_name}` + (lead.business_type ? `, ${lead.business_type})` : ')') : ''}`,
    `Callback: ${lead.callback_number || 'not given'}${lead.email ? ` | ${lead.email}` : ''}`,
    lead.interest ? `Interest: ${lead.interest}` : null,
    lead.preferred_time ? `Preferred time: ${lead.preferred_time}` : null,
    duration != null ? `Duration: ${duration}s` : null,
    closing ? `Closing line: ${closing}` : null,
    summary ? `Auto-summary (may be inaccurate on booking status): ${summary}` : null,
    `Conversation: ${d.conversation_id || 'unknown'}`,
  ].filter(Boolean)
  return { source: 'elevenlabs', conversation_id: d.conversation_id || null, ...lead, call_duration_secs: duration, summary, text: lines.join('\n') }
}

export async function handle(request, env = process.env, fetchImpl = fetch) {
  if (request.method !== 'POST') return json(405, { error: 'method not allowed' })
  const raw = await request.text()
  if (!verifySignature(request.headers.get('elevenlabs-signature'), raw, env.ELEVENLABS_WEBHOOK_SECRET)) {
    return json(401, { error: 'invalid signature' })
  }
  let payload
  try {
    payload = JSON.parse(raw)
  } catch {
    return json(400, { error: 'invalid json' })
  }
  if (payload.type !== 'post_call_transcription') return json(200, { ignored: payload.type || 'unknown' })

  let auth = env.FRONTDESK_ALERT_WEBHOOK_AUTH || ''
  if (!auth) return json(502, { error: 'forward not configured' })
  if (!/^bearer\s/i.test(auth)) auth = `Bearer ${auth}`
  try {
    const res = await fetchImpl(RECEIVER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: auth },
      body: JSON.stringify(buildAlert(payload)),
    })
    if (!res.ok) return json(502, { error: 'receiver rejected', status: res.status })
    return json(200, { forwarded: true })
  } catch {
    return json(502, { error: 'forward failed' })
  }
}

export default async (request) => handle(request)
