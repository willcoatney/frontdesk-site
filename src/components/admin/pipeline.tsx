'use client'

import { useCallback, useEffect, useMemo, useState, type FormEvent, type HTMLAttributes } from 'react'

const STAGES = ['new', 'contacted', 'replied', 'demo booked', 'won', 'lost'] as const

type Stage = (typeof STAGES)[number]

type Prospect = {
  id: string
  businessName: string
  trade: string
  city: string
  stage: Stage
  notes: string
  nextFollowUp: string
  source: string
  phone: string
  email: string
  website: string
  createdAt: string
  updatedAt: string
}

type Draft = {
  businessName: string
  trade: string
  city: string
  stage: Stage
  notes: string
  nextFollowUp: string
  source: string
  phone: string
  email: string
  website: string
}

const emptyDraft = (): Draft => ({
  businessName: '',
  trade: '',
  city: '',
  stage: 'new',
  notes: '',
  nextFollowUp: '',
  source: 'manual',
  phone: '',
  email: '',
  website: '',
})

const tap =
  'inline-flex min-h-12 w-full items-center justify-center rounded-xl px-3 py-2 text-center text-base font-semibold leading-tight focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332] disabled:opacity-60'
const inputClass =
  'min-h-12 w-full min-w-0 max-w-full rounded-xl border border-[#DDD5C8] bg-white px-3 text-base text-[#1C1915] outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]'

function stageLabel(stage: string) {
  if (stage === 'new') return 'New'
  if (stage === 'demo booked') return 'Demo booked'
  return stage.charAt(0).toUpperCase() + stage.slice(1)
}

function todayLocal() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

function phoneKey(phone: string) {
  const matches = phone.match(/\d[\d\s().-]{6,}\d/g) || []
  for (const match of matches) {
    let digits = match.replace(/\D/g, '')
    if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1)
    if (digits.length >= 10) return digits.slice(-10)
  }
  return ''
}

function telHref(phone: string) {
  const key = phoneKey(phone)
  return key ? `tel:+1${key}` : ''
}

function smsHref(phone: string) {
  const key = phoneKey(phone)
  return key ? `sms:+1${key}` : ''
}

function mailHref(email: string) {
  return /^[^\s@]+@[^\s@]+$/.test(email) ? `mailto:${email}` : ''
}

function websiteHref(website: string) {
  try {
    const url = new URL(website)
    if (url.protocol === 'https:' || url.protocol === 'http:') return url.href
  } catch {
    return ''
  }
  return ''
}

function compareProspects(a: Prospect, b: Prospect) {
  const today = todayLocal()
  const rank = (prospect: Prospect) => {
    if (prospect.nextFollowUp && prospect.nextFollowUp < today) return 0
    if (prospect.nextFollowUp === today) return 1
    if (prospect.nextFollowUp) return 2
    return 3
  }
  const left = rank(a)
  const right = rank(b)
  if (left !== right) return left - right
  if (left < 3 && a.nextFollowUp !== b.nextFollowUp) return a.nextFollowUp < b.nextFollowUp ? -1 : 1
  if (a.updatedAt !== b.updatedAt) return a.updatedAt < b.updatedAt ? 1 : -1
  return a.businessName.localeCompare(b.businessName)
}

async function readError(response: Response) {
  const data = (await response.json().catch(() => ({}))) as { error?: string }
  return data.error || 'Request failed'
}

export function Pipeline() {
  const [status, setStatus] = useState<'loading' | 'login' | 'ready'>('loading')
  const [password, setPassword] = useState('')
  const [prospects, setProspects] = useState<Prospect[]>([])
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [query, setQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [busy, setBusy] = useState(false)

  const loadProspects = useCallback(async () => {
    const response = await fetch('/api/admin/prospects', { credentials: 'same-origin' })
    if (response.status === 401) {
      setStatus('login')
      return
    }
    if (!response.ok) throw new Error(await readError(response))
    const data = (await response.json()) as { prospects: Prospect[] }
    setProspects(data.prospects)
    setStatus('ready')
  }, [])

  useEffect(() => {
    let cancel = false
    fetch('/api/admin/session', { credentials: 'same-origin' })
      .then(async (response) => {
        if (cancel) return
        if (!response.ok) {
          setStatus('login')
          return
        }
        await loadProspects()
      })
      .catch(() => {
        if (!cancel) {
          setError('Could not reach the pipeline.')
          setStatus('login')
        }
      })
    return () => {
      cancel = true
    }
  }, [loadProspects])

  async function onLogin(event: FormEvent) {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!response.ok) throw new Error(await readError(response))
      setPassword('')
      await loadProspects()
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not log in')
    } finally {
      setBusy(false)
    }
  }

  async function onLogout() {
    await fetch('/api/admin/logout', { method: 'POST', credentials: 'same-origin' })
    setProspects([])
    setStatus('login')
  }

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase()
    return prospects
      .filter((prospect) => {
        if (stageFilter && prospect.stage !== stageFilter) return false
        if (!needle) return true
        return [prospect.businessName, prospect.trade, prospect.city, prospect.phone, prospect.email, prospect.website, prospect.notes, prospect.source]
          .join('\n')
          .toLowerCase()
          .includes(needle)
      })
      .sort(compareProspects)
  }, [prospects, query, stageFilter])

  async function saveStage(prospect: Prospect, stage: Stage) {
    if (prospect.stage === stage) return
    const previous = prospects
    setProspects((list) => list.map((item) => (item.id === prospect.id ? { ...item, stage } : item)))
    setError('')
    try {
      const response = await fetch(`/api/admin/prospects/${prospect.id}`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage }),
      })
      if (response.status === 401) {
        setStatus('login')
        return
      }
      if (!response.ok) throw new Error(await readError(response))
      const data = (await response.json()) as { prospect: Prospect }
      setProspects((list) => list.map((item) => (item.id === prospect.id ? data.prospect : item)))
    } catch (cause) {
      setProspects(previous)
      setError(cause instanceof Error ? cause.message : 'Could not update stage')
    }
  }

  async function saveFollowUp(prospect: Prospect, nextFollowUp: string) {
    if (prospect.nextFollowUp === nextFollowUp) return
    const previous = prospects
    setProspects((list) => list.map((item) => (item.id === prospect.id ? { ...item, nextFollowUp } : item)))
    setError('')
    try {
      const response = await fetch(`/api/admin/prospects/${prospect.id}`, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nextFollowUp }),
      })
      if (response.status === 401) {
        setStatus('login')
        return
      }
      if (!response.ok) throw new Error(await readError(response))
      const data = (await response.json()) as { prospect: Prospect }
      setProspects((list) => list.map((item) => (item.id === prospect.id ? data.prospect : item)))
    } catch (cause) {
      setProspects(previous)
      setError(cause instanceof Error ? cause.message : 'Could not update follow-up')
    }
  }

  async function saveProspect(id: string | null, draft: Draft) {
    setBusy(true)
    setError('')
    const body = id
      ? {
          businessName: draft.businessName,
          trade: draft.trade,
          city: draft.city,
          notes: draft.notes,
          source: draft.source,
          phone: draft.phone,
          email: draft.email,
          website: draft.website,
        }
      : draft
    try {
      const response = await fetch(id ? `/api/admin/prospects/${id}` : '/api/admin/prospects', {
        method: id ? 'PATCH' : 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (response.status === 401) {
        setStatus('login')
        return false
      }
      if (!response.ok) throw new Error(await readError(response))
      const data = (await response.json()) as { prospect: Prospect }
      setProspects((list) => (id ? list.map((item) => (item.id === id ? data.prospect : item)) : [data.prospect, ...list]))
      setShowAdd(false)
      return true
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not save')
      return false
    } finally {
      setBusy(false)
    }
  }

  async function removeProspect(id: string) {
    setBusy(true)
    setError('')
    try {
      const response = await fetch(`/api/admin/prospects/${id}`, { method: 'DELETE', credentials: 'same-origin' })
      if (response.status === 401) {
        setStatus('login')
        return
      }
      if (!response.ok) throw new Error(await readError(response))
      setProspects((list) => list.filter((item) => item.id !== id))
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not delete')
    } finally {
      setBusy(false)
    }
  }

  async function importCsv(prospectsCsv: string, emailsCsv: string) {
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const response = await fetch('/api/admin/import', {
        method: 'POST',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prospectsCsv, emailsCsv }),
      })
      if (response.status === 401) {
        setStatus('login')
        return
      }
      if (!response.ok) throw new Error(await readError(response))
      const data = (await response.json()) as { prospects: Prospect[]; created: number; updated: number; emailsMerged: number }
      setProspects(data.prospects)
      setNotice(`Imported ${data.created} new, updated ${data.updated}, merged ${data.emailsMerged} emails.`)
      setShowImport(false)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Could not import')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen overflow-x-clip bg-[#F3EFE7] text-[#1C1915]">
      <div className="mx-auto w-full max-w-6xl px-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-6">
        {status === 'loading' ? <p className="py-16 text-center text-base text-[#5C564E]">Checking access…</p> : null}
        {status === 'login' ? (
          <LoginForm busy={busy} error={error} password={password} setPassword={setPassword} onSubmit={onLogin} />
        ) : null}
        {status === 'ready' ? (
          <>
            <header className="sticky top-0 z-20 -mx-4 mb-4 flex items-center justify-between gap-3 border-b border-[#DDD5C8] bg-[#F3EFE7]/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6">
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-wide text-[#5C564E]">FrontDesk KC</p>
                <h1 className="truncate text-2xl font-semibold leading-tight">Pipeline</h1>
              </div>
              <button
                type="button"
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl bg-white px-4 text-base font-semibold text-[#1C1915] ring-1 ring-[#DDD5C8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]"
                onClick={onLogout}
              >
                Log out
              </button>
            </header>

            {error ? (
              <p role="alert" className="mb-3 rounded-xl border border-[#E4C7BC] bg-[#F8EBE6] px-3 py-3 text-base text-[#6F2E24]">
                {error}
              </p>
            ) : null}
            {notice ? (
              <p role="status" className="mb-3 rounded-xl border border-[#C9D7CE] bg-[#E7F0EA] px-3 py-3 text-base text-[#1B4332]">
                {notice}
              </p>
            ) : null}

            <div className="mb-3 grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#5C564E]">Search</span>
                <input className={inputClass} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Name, phone, city" autoComplete="off" />
              </label>
              <label className="block">
                <span className="mb-1 block text-sm font-semibold text-[#5C564E]">Stage</span>
                <select className={inputClass} value={stageFilter} onChange={(event) => setStageFilter(event.target.value)} aria-label="Filter by stage">
                  <option value="">All stages</option>
                  {STAGES.map((stage) => (
                    <option key={stage} value={stage}>
                      {stageLabel(stage)}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-2">
              <button type="button" className={`${tap} bg-[#1B4332] text-[#F6F3EC]`} onClick={() => { setShowAdd((open) => !open); setShowImport(false) }}>
                {showAdd ? 'Close add' : 'Add prospect'}
              </button>
              <button type="button" className={`${tap} bg-white text-[#1C1915] ring-1 ring-[#DDD5C8]`} onClick={() => { setShowImport((open) => !open); setShowAdd(false) }}>
                {showImport ? 'Close import' : 'Import CSV'}
              </button>
            </div>

            {showAdd ? <Editor title="New prospect" draft={emptyDraft()} busy={busy} onCancel={() => setShowAdd(false)} onSave={(draft) => saveProspect(null, draft)} /> : null}
            {showImport ? <ImportPanel busy={busy} onImport={importCsv} /> : null}

            <p className="mb-3 text-sm font-medium text-[#5C564E]">
              {visible.length === prospects.length ? `${prospects.length} prospects` : `${visible.length} of ${prospects.length} prospects`}
            </p>

            {visible.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-[#DDD5C8] bg-[#FBF8F3] px-4 py-8 text-center text-base text-[#5C564E]">
                {prospects.length === 0 ? 'No prospects yet. Import a CSV or add one.' : 'Nothing matches that search.'}
              </p>
            ) : (
              <>
                <div className="grid gap-3 xl:hidden">
                  {visible.map((prospect) => (
                    <ProspectCard
                      key={prospect.id}
                      prospect={prospect}
                      busy={busy}
                      onStage={(stage) => saveStage(prospect, stage)}
                      onFollowUp={(date) => saveFollowUp(prospect, date)}
                      onSave={(draft) => saveProspect(prospect.id, draft)}
                      onDelete={() => removeProspect(prospect.id)}
                    />
                  ))}
                </div>
                <ProspectTable prospects={visible} busy={busy} onStage={saveStage} onSave={saveProspect} onDelete={removeProspect} />
              </>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}

function LoginForm({
  password,
  setPassword,
  busy,
  error,
  onSubmit,
}: {
  password: string
  setPassword: (value: string) => void
  busy: boolean
  error: string
  onSubmit: (event: FormEvent) => void
}) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md flex-col justify-center">
      <p className="text-sm font-semibold tracking-wide text-[#5C564E]">FrontDesk KC</p>
      <h1 className="mt-1 text-3xl font-semibold">Pipeline</h1>
      <p className="mt-2 text-base text-[#5C564E]">Internal only. This page is not indexed.</p>
      <form onSubmit={onSubmit} className="mt-6 rounded-2xl border border-[#DDD5C8] bg-[#FBF8F3] p-4">
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Password</span>
          <input
            className={inputClass}
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </label>
        {error ? (
          <p role="alert" className="mt-3 text-base text-[#6F2E24]">
            {error}
          </p>
        ) : null}
        <button type="submit" className={`${tap} mt-4 bg-[#1B4332] text-[#F6F3EC]`} disabled={busy}>
          {busy ? 'Checking…' : 'Log in'}
        </button>
      </form>
    </main>
  )
}

function ProspectCard({
  prospect,
  busy,
  onStage,
  onFollowUp,
  onSave,
  onDelete,
}: {
  prospect: Prospect
  busy: boolean
  onStage: (stage: Stage) => void
  onFollowUp: (date: string) => void
  onSave: (draft: Draft) => Promise<boolean>
  onDelete: () => void
}) {
  const [editing, setEditing] = useState(false)
  const [confirming, setConfirming] = useState(false)
  const [notesOpen, setNotesOpen] = useState(false)
  const today = todayLocal()
  const overdue = Boolean(prospect.nextFollowUp && prospect.nextFollowUp < today)
  const call = telHref(prospect.phone)
  const text = smsHref(prospect.phone)
  const mail = mailHref(prospect.email)
  const site = websiteHref(prospect.website)
  const place = [prospect.trade, prospect.city].filter(Boolean).join(' · ')

  return (
    <article className="rounded-2xl border border-[#DDD5C8] bg-[#FBF8F3] p-4">
      <h2 className="text-xl font-semibold leading-tight break-words">{prospect.businessName}</h2>
      {place ? <p className="mt-1 text-base text-[#5C564E] break-words">{place}</p> : null}
      {prospect.source ? <p className="mt-1 text-sm text-[#5C564E]">Source: {prospect.source}</p> : null}

      <fieldset className="mt-4">
        <legend className="mb-2 text-sm font-semibold text-[#5C564E]">Stage</legend>
        <div className="grid grid-cols-2 gap-2">
          {STAGES.map((stage) => {
            const selected = prospect.stage === stage
            return (
              <button
                key={stage}
                type="button"
                aria-pressed={selected}
                className={`${tap} ${selected ? 'bg-[#1B4332] text-[#F6F3EC]' : 'bg-white text-[#1C1915] ring-1 ring-[#DDD5C8]'}`}
                onClick={() => onStage(stage)}
              >
                {stageLabel(stage)}
              </button>
            )
          })}
        </div>
      </fieldset>

      <label className="mt-4 block">
        <span className={`mb-1 block text-sm font-semibold ${overdue ? 'text-[#8C3A2F]' : 'text-[#5C564E]'}`}>
          {overdue ? 'Follow-up overdue' : 'Next follow-up'}
        </span>
        <input className={inputClass} type="date" value={prospect.nextFollowUp} onChange={(event) => onFollowUp(event.target.value)} aria-label={`Follow-up for ${prospect.businessName}`} />
      </label>

      {call ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <a className={`${tap} bg-[#1B4332] text-[#F6F3EC]`} href={call}>
            <span>
              Call
              <span className="mt-0.5 block text-sm font-medium break-all">{prospect.phone}</span>
            </span>
          </a>
          <a className={`${tap} bg-white text-[#1C1915] ring-1 ring-[#DDD5C8]`} href={text}>
            <span>
              Text
              <span className="mt-0.5 block text-sm font-medium break-all">{prospect.phone}</span>
            </span>
          </a>
        </div>
      ) : prospect.phone ? (
        <p className="mt-4 text-base break-words">{prospect.phone}</p>
      ) : null}

      {mail ? (
        <a className={`${tap} mt-2 bg-white text-[#1B4332] ring-1 ring-[#DDD5C8] break-all`} href={mail}>
          {prospect.email}
        </a>
      ) : null}
      {prospect.website ? (
        site ? (
          <a className="mt-3 block min-h-12 text-base break-all text-[#1B4332] underline" href={site} target="_blank" rel="noopener noreferrer">
            {prospect.website}
          </a>
        ) : (
          <p className="mt-3 text-base break-words text-[#5C564E]">{prospect.website}</p>
        )
      ) : null}

      {prospect.notes ? (
        <div className="mt-4">
          <p className={`text-base whitespace-pre-wrap break-words text-[#3C3832] ${notesOpen ? '' : 'line-clamp-4'}`}>{prospect.notes}</p>
          {prospect.notes.length > 180 ? (
            <button type="button" className={`${tap} mt-2 bg-white text-[#1C1915] ring-1 ring-[#DDD5C8]`} onClick={() => setNotesOpen((open) => !open)}>
              {notesOpen ? 'Show less' : 'Show notes'}
            </button>
          ) : null}
        </div>
      ) : null}

      {editing ? (
        <Editor
          title={`Edit ${prospect.businessName}`}
          schedule={false}
          draft={{
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
          }}
          busy={busy}
          onCancel={() => setEditing(false)}
          onSave={async (draft) => {
            const ok = await onSave(draft)
            if (ok) setEditing(false)
            return ok
          }}
        />
      ) : confirming ? (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" className={`${tap} bg-[#8C3A2F] text-white`} disabled={busy} onClick={onDelete}>
            Delete
          </button>
          <button type="button" className={`${tap} bg-white ring-1 ring-[#DDD5C8]`} onClick={() => setConfirming(false)}>
            Cancel
          </button>
        </div>
      ) : (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" className={`${tap} bg-white ring-1 ring-[#DDD5C8]`} onClick={() => setEditing(true)}>
            Edit
          </button>
          <button type="button" className={`${tap} bg-white text-[#8C3A2F] ring-1 ring-[#DDD5C8]`} onClick={() => setConfirming(true)}>
            Delete
          </button>
        </div>
      )}
    </article>
  )
}

function Editor({
  title,
  draft,
  busy,
  onCancel,
  onSave,
  schedule = true,
}: {
  title: string
  draft: Draft
  busy: boolean
  onCancel: () => void
  onSave: (draft: Draft) => Promise<boolean>
  schedule?: boolean
}) {
  const [form, setForm] = useState(draft)
  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }
  return (
    <form
      className="mt-4 grid gap-3 rounded-2xl border border-[#DDD5C8] bg-white p-3"
      onSubmit={async (event) => {
        event.preventDefault()
        await onSave(form)
      }}
    >
      <h3 className="text-lg font-semibold break-words">{title}</h3>
      <Field label="Business name" value={form.businessName} onChange={(value) => set('businessName', value)} required />
      <Field label="Trade" value={form.trade} onChange={(value) => set('trade', value)} />
      <Field label="City" value={form.city} onChange={(value) => set('city', value)} />
      <Field label="Phone" value={form.phone} onChange={(value) => set('phone', value)} inputMode="tel" autoComplete="tel" />
      <Field label="Email" value={form.email} onChange={(value) => set('email', value)} type="email" autoComplete="email" />
      <Field label="Website" value={form.website} onChange={(value) => set('website', value)} autoComplete="url" />
      <Field label="Source" value={form.source} onChange={(value) => set('source', value)} />
      {schedule ? (
        <label className="block">
          <span className="mb-1 block text-sm font-semibold">Next follow-up</span>
          <input className={inputClass} type="date" value={form.nextFollowUp} onChange={(event) => set('nextFollowUp', event.target.value)} />
        </label>
      ) : null}
      <label className="block">
        <span className="mb-1 block text-sm font-semibold">Notes</span>
        <textarea className={`${inputClass} min-h-32 py-3`} value={form.notes} onChange={(event) => set('notes', event.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-2">
        <button type="submit" className={`${tap} bg-[#1B4332] text-[#F6F3EC]`} disabled={busy}>
          Save
        </button>
        <button type="button" className={`${tap} bg-[#F3EFE7] ring-1 ring-[#DDD5C8]`} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  inputMode,
  autoComplete,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode']
  autoComplete?: string
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      <input className={inputClass} type={type} value={value} required={required} inputMode={inputMode} autoComplete={autoComplete} onChange={(event) => onChange(event.target.value)} />
    </label>
  )
}

function ImportPanel({ busy, onImport }: { busy: boolean; onImport: (prospectsCsv: string, emailsCsv: string) => Promise<void> }) {
  const [prospectsFile, setProspectsFile] = useState<File | null>(null)
  const [emailsFile, setEmailsFile] = useState<File | null>(null)
  return (
    <form
      className="mb-4 grid gap-3 rounded-2xl border border-[#DDD5C8] bg-[#FBF8F3] p-4"
      onSubmit={async (event) => {
        event.preventDefault()
        const prospectsCsv = prospectsFile ? await prospectsFile.text() : ''
        const emailsCsv = emailsFile ? await emailsFile.text() : ''
        await onImport(prospectsCsv, emailsCsv)
      }}
    >
      <h2 className="text-lg font-semibold">Import CSV</h2>
      <p className="text-base text-[#5C564E]">
        Upload the prospects file, the emails file, or both. Emails merge into prospects by business name. New rows start as New, source kc_research.
      </p>
      <FileSlot label="Prospects CSV" file={prospectsFile} onChange={setProspectsFile} />
      <FileSlot label="Emails CSV" file={emailsFile} onChange={setEmailsFile} />
      <button type="submit" className={`${tap} bg-[#1B4332] text-[#F6F3EC]`} disabled={busy || (!prospectsFile && !emailsFile)}>
        {busy ? 'Importing…' : 'Import'}
      </button>
    </form>
  )
}

function FileSlot({ label, file, onChange }: { label: string; file: File | null; onChange: (file: File | null) => void }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold">{label}</span>
      <input
        className={`${inputClass} py-2 file:mr-3 file:min-h-12 file:rounded-xl file:border-0 file:bg-[#1B4332] file:px-4 file:text-base file:font-semibold file:text-[#F6F3EC]`}
        type="file"
        accept=".csv,text/csv"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {file ? <span className="mt-1 block text-sm break-all text-[#5C564E]">{file.name}</span> : null}
    </label>
  )
}

function ProspectTable({
  prospects,
  busy,
  onStage,
  onSave,
  onDelete,
}: {
  prospects: Prospect[]
  busy: boolean
  onStage: (prospect: Prospect, stage: Stage) => void
  onSave: (id: string, draft: Draft) => Promise<boolean>
  onDelete: (id: string) => void
}) {
  const [editing, setEditing] = useState<string | null>(null)
  const today = todayLocal()
  return (
    <div className="hidden xl:block">
      <table className="w-full table-fixed border-separate border-spacing-0 text-left text-sm">
        <thead>
          <tr className="text-[#5C564E]">
            <th className="w-[22%] px-2 py-2 font-semibold">Business</th>
            <th className="w-[12%] px-2 py-2 font-semibold">Trade</th>
            <th className="w-[14%] px-2 py-2 font-semibold">City</th>
            <th className="w-[14%] px-2 py-2 font-semibold">Stage</th>
            <th className="w-[12%] px-2 py-2 font-semibold">Follow-up</th>
            <th className="w-[16%] px-2 py-2 font-semibold">Contact</th>
            <th className="w-[10%] px-2 py-2 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prospects.map((prospect) => {
            const call = telHref(prospect.phone)
            const text = smsHref(prospect.phone)
            const mail = mailHref(prospect.email)
            const overdue = Boolean(prospect.nextFollowUp && prospect.nextFollowUp < today)
            return (
              <tr key={prospect.id} className="align-top">
                <td className="border-t border-[#DDD5C8] px-2 py-3">
                  <p className="font-semibold break-words">{prospect.businessName}</p>
                  {prospect.source ? <p className="text-[#5C564E] break-words">Source: {prospect.source}</p> : null}
                  {prospect.notes ? <p className="mt-1 line-clamp-2 whitespace-pre-wrap break-words text-[#3C3832]">{prospect.notes}</p> : null}
                  {editing === prospect.id ? (
                    <Editor
                      title="Edit"
                      schedule={false}
                      draft={{
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
                      }}
                      busy={busy}
                      onCancel={() => setEditing(null)}
                      onSave={async (draft) => {
                        const ok = await onSave(prospect.id, draft)
                        if (ok) setEditing(null)
                        return ok
                      }}
                    />
                  ) : null}
                </td>
                <td className="border-t border-[#DDD5C8] px-2 py-3 break-words">{prospect.trade}</td>
                <td className="border-t border-[#DDD5C8] px-2 py-3 break-words">{prospect.city}</td>
                <td className="border-t border-[#DDD5C8] px-2 py-3">
                  <select className={`${inputClass} min-w-0 max-w-full`} aria-label={`Stage for ${prospect.businessName}`} value={prospect.stage} onChange={(event) => onStage(prospect, event.target.value as Stage)}>
                    {STAGES.map((stage) => (
                      <option key={stage} value={stage}>
                        {stageLabel(stage)}
                      </option>
                    ))}
                  </select>
                </td>
                <td className={`border-t border-[#DDD5C8] px-2 py-3 break-words ${overdue ? 'font-semibold text-[#8C3A2F]' : ''}`}>
                  {prospect.nextFollowUp ? (overdue ? `Overdue ${prospect.nextFollowUp}` : prospect.nextFollowUp) : '—'}
                </td>
                <td className="border-t border-[#DDD5C8] px-2 py-3">
                  {call ? (
                    <p className="break-words">
                      <a className="font-semibold text-[#1B4332] underline" href={call}>
                        Call
                      </a>
                      {' · '}
                      <a className="font-semibold text-[#1B4332] underline" href={text}>
                        Text
                      </a>
                    </p>
                  ) : null}
                  {mail ? (
                    <a className="mt-1 block break-all text-[#1B4332] underline" href={mail}>
                      {prospect.email}
                    </a>
                  ) : null}
                </td>
                <td className="border-t border-[#DDD5C8] px-2 py-3">
                  <button type="button" className="min-h-12 font-semibold text-[#1B4332] underline" onClick={() => setEditing(prospect.id)}>
                    Edit
                  </button>
                  <button
                    type="button"
                    className="mt-2 block min-h-12 font-semibold text-[#8C3A2F] underline"
                    onClick={() => {
                      if (window.confirm(`Delete ${prospect.businessName}?`)) onDelete(prospect.id)
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
