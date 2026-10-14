'use client'

import { useState, type KeyboardEvent } from 'react'
import styles from './cleaning-v2.module.css'

const TABS = [
  { id: 'call', label: 'Call' },
  { id: 'chat', label: 'Chat' },
  { id: 'dashboard', label: 'Dashboard' },
] as const

type TabId = (typeof TABS)[number]['id']

const CALL = [
  { who: 'AI', text: 'Thanks for calling Sparkle KC Cleaning. This is Maya. How can I help you tonight?' },
  { who: 'Caller', text: 'I need a price for a recurring clean. Three bedrooms in Overland Park.' },
  { who: 'AI', text: 'Weekly, or every other week? And how many baths — any pets?' },
  { who: 'Caller', text: 'Every other week. Two baths, and we have a dog.' },
  { who: 'AI', text: 'That biweekly clean usually lands between $145 and $175 a visit. I can book a free in-home estimate Thursday at 6:30 PM and lock the price.' },
  { who: 'Caller', text: 'Thursday works.' },
  { who: 'AI', text: 'You are booked for Thursday at 6:30 PM. A confirmation text is on the way, and the estimate is on the crew calendar.' },
]

const CHATS = {
  recurring: [
    { who: 'Them', text: 'Do you do recurring cleans? 3 bed in Overland Park.' },
    { who: 'AI', text: 'Yes. Weekly or every other week — and how many baths? Any pets?' },
    { who: 'Them', text: 'Every other week. Two baths, and a dog.' },
    { who: 'AI', text: 'A biweekly clean like that usually lands between $145 and $175 a visit. Thursday at 6:30 PM is open for a free estimate. Book it?' },
    { who: 'Them', text: 'Yes, book it.' },
    { who: 'AI', text: 'Booked. Thursday 6:30 PM, Overland Park. It is on the crew calendar.' },
  ],
  moveout: [
    { who: 'Them', text: 'Do you do move-out cleans? 2 bed, 1 bath in Shawnee. Saturday morning?' },
    { who: 'AI', text: 'Yes. How does the place look — maintenance clean, or a full move-out with appliances?' },
    { who: 'Them', text: 'Full move-out. Empty, appliances included.' },
    { who: 'AI', text: 'A 2-bed move-out like that is usually $280–$340. Saturday at 9:00 AM is open. Book it?' },
    { who: 'Them', text: 'Book it.' },
    { who: 'AI', text: 'Booked. Saturday 9:00 AM. Team A has the Shawnee move-out.' },
  ],
  office: [
    { who: 'Them', text: 'We need a nightly clean for a small office in Lenexa. What would that run?' },
    { who: 'AI', text: 'We do commercial. I will not guess a price without seeing the space. I can book a walkthrough.' },
    { who: 'Them', text: 'Tuesday after 5?' },
    { who: 'AI', text: 'Tuesday at 5:30 PM is open. I will put the walkthrough on the calendar and text you. A person confirms the bid after the walk.' },
  ],
} as const

type ChatId = keyof typeof CHATS

const CHAT_LABELS: { id: ChatId; label: string }[] = [
  { id: 'recurring', label: 'Recurring' },
  { id: 'moveout', label: 'Move-out' },
  { id: 'office', label: 'Office' },
]

const VIEWS = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'leads', label: 'Leads' },
  { id: 'reviews', label: 'Reviews' },
] as const

type ViewId = (typeof VIEWS)[number]['id']

function onTabKey(event: KeyboardEvent, ids: readonly string[], current: string, set: (id: string) => void) {
  const index = ids.indexOf(current)
  if (index < 0) return
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault()
    const direction = event.key === 'ArrowRight' ? 1 : -1
    const next = ids[(index + direction + ids.length) % ids.length]
    set(next)
    const button = document.getElementById(`tab-${next}`)
    button?.focus()
  }
}

export function ProductDemos() {
  const [tab, setTab] = useState<TabId>('call')
  const [run, setRun] = useState(0)
  const [chat, setChat] = useState<ChatId>('recurring')
  const [view, setView] = useState<ViewId>('schedule')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Product demos"
        className="grid grid-cols-3 gap-1 rounded-xl bg-[#E7E0D4] p-1"
      >
        {TABS.map((item) => {
          const selected = tab === item.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`panel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(item.id)}
              onKeyDown={(event) => onTabKey(event, TABS.map((entry) => entry.id), tab, (id) => setTab(id as TabId))}
              className={`min-h-11 rounded-lg text-sm font-semibold ${
                selected ? 'bg-[#FBF8F3] text-[#1C1915] shadow-sm' : 'text-[#3C3832]'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>
      <p className="sr-only">Use the left and right arrow keys to switch demos.</p>

      <div className="mt-4">
        {tab === 'call' ? (
          <div role="tabpanel" id="panel-call" aria-labelledby="tab-call" tabIndex={0} className="outline-none">
            <div className="grid items-center gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
              <div className="mx-auto w-full max-w-[340px] rounded-[1.8rem] border border-[#D5CDBF] bg-[#14241C] p-2 shadow-[0_24px_50px_-28px_rgba(20,36,28,0.65)]">
                <div className="rounded-[1.35rem] bg-[#101C17] px-3 pt-3 pb-4">
                  <div className="flex items-center justify-between text-[11px] text-white/55">
                    <span>9:47 PM</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-200">
                      <span className={`${styles.live} size-1.5 rounded-full bg-emerald-300`} />
                      On a call
                    </span>
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-white">Sparkle KC Cleaning</p>
                  <p className="text-center text-[11px] text-amber-100/80">Fictional company</p>
                  <div key={`call-${run}`} className="mt-4 space-y-2.5">
                    {CALL.map((line, index) => (
                      <div
                        key={line.text}
                        className={`${styles.line} ${line.who === 'Caller' ? 'ml-6' : 'mr-6'}`}
                        style={{ animationDelay: `${index * 0.55}s` }}
                      >
                        <p className={`text-[10px] font-semibold tracking-wide text-white/40 uppercase ${line.who === 'Caller' ? 'text-right' : ''}`}>
                          {line.who}
                        </p>
                        <p
                          className={`mt-1 rounded-2xl px-3 py-2 text-sm leading-snug ${
                            line.who === 'Caller' ? 'bg-[#1B4332] text-white' : 'bg-white/10 text-white/90'
                          }`}
                        >
                          {line.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <h3 className={`${styles.display} text-2xl text-[#1C1915] sm:text-3xl`}>
                  Answered at 9:47 PM. Quoted. Booked.
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[#3C3832]">
                  The voice asks the questions that change a cleaning price: cadence, baths, pets, and city.
                  It quotes only inside the bands you set, then puts the estimate on the crew calendar.
                </p>
                <p className="mt-3 text-sm text-[#6B4E22]">
                  Sample range only. Your bands, not a published rate. Sparkle KC Cleaning is fictional.
                </p>
                <button
                  type="button"
                  onClick={() => setRun((value) => value + 1)}
                  className="mt-4 min-h-11 rounded-lg border border-[#DDD5C8] bg-white px-4 text-sm font-semibold text-[#1C1915]"
                >
                  Replay the call
                </button>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'chat' ? (
          <div role="tabpanel" id="panel-chat" aria-labelledby="tab-chat" tabIndex={0} className="outline-none">
            <div className="overflow-hidden rounded-2xl border border-[#DDD5C8] bg-white shadow-[0_18px_40px_-32px_rgba(28,25,21,0.45)]">
              <div className="flex items-center gap-1.5 border-b border-[#EFEAE2] px-3 py-2.5">
                <span className="size-2 rounded-full bg-[#E4D5C6]" />
                <span className="size-2 rounded-full bg-[#E4D5C6]" />
                <span className="size-2 rounded-full bg-[#E4D5C6]" />
                <span className="ml-2 truncate text-xs text-[#5C564E]">sparkle-kc.example</span>
                <span className="ml-auto shrink-0 rounded-full bg-[#F3EFE7] px-2 py-0.5 text-[11px] font-semibold text-[#6B4E22]">
                  10:30 PM
                </span>
              </div>
              <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
                <div className="hidden sm:block">
                  <p className={`${styles.display} text-3xl leading-tight text-[#1C1915]`}>
                    Homes and offices, cleaned.
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C564E]">
                    The same chat sits in the corner of the marketing site. A text to the business number
                    gets the same reply.
                  </p>
                </div>
                <div>
                  <div role="group" aria-label="Try a cleaning job" className="mb-3 flex flex-wrap gap-2">
                    {CHAT_LABELS.map((item) => {
                      const selected = chat === item.id
                      return (
                        <button
                          key={item.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => setChat(item.id)}
                          className={`min-h-10 rounded-full px-3 text-sm font-semibold ${
                            selected ? 'bg-[#1B4332] text-white' : 'bg-[#F3EFE7] text-[#1C1915]'
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    })}
                  </div>
                  <div className="rounded-2xl border border-[#E7E0D4] bg-[#FBF8F3] p-3">
                    <div className="mb-3 flex items-center gap-2">
                      <span className={`${styles.display} grid size-8 place-items-center rounded-full bg-[#1B4332] text-sm text-white`}>
                        S
                      </span>
                      <div>
                        <p className="text-sm font-semibold">Sparkle KC</p>
                        <p className="text-xs text-[#1B4332]">Replies instantly · fictional</p>
                      </div>
                    </div>
                    <div key={`${chat}-${run}`} className="space-y-2">
                      {CHATS[chat].map((line, index) => (
                        <div
                          key={line.text}
                          className={`${styles.line} flex ${line.who === 'Them' ? 'justify-end' : 'justify-start'}`}
                          style={{ animationDelay: `${index * 0.45}s` }}
                        >
                          <p
                            className={`max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                              line.who === 'Them' ? 'bg-[#1B4332] text-white' : 'bg-white text-[#1C1915]'
                            }`}
                          >
                            {line.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-[#6B4E22]">
                    Sample prices. An office bid is a walkthrough, not a number invented on the thread.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {tab === 'dashboard' ? (
          <div role="tabpanel" id="panel-dashboard" aria-labelledby="tab-dashboard" tabIndex={0} className="outline-none">
            <div className={`${styles.card} overflow-hidden`}>
              <div className="flex items-start justify-between gap-3 border-b border-[#E7E0D4] px-4 py-3">
                <div>
                  <p className="font-semibold text-[#1C1915]">Sparkle KC Cleaning</p>
                  <p className="text-xs text-[#5C564E]">Sample day · fictional company</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F2EB] px-2.5 py-1 text-xs font-semibold text-[#1B4332]">
                  <span className={`${styles.live} size-1.5 rounded-full bg-[#1B4332]`} />
                  Answering
                </span>
              </div>
              <div role="tablist" aria-label="Dashboard views" className="flex gap-1 border-b border-[#E7E0D4] px-3 py-2">
                {VIEWS.map((item) => {
                  const selected = view === item.id
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      id={`tab-${item.id}`}
                      aria-selected={selected}
                      aria-controls={`panel-${item.id}`}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setView(item.id)}
                      onKeyDown={(event) =>
                        onTabKey(event, VIEWS.map((entry) => entry.id), view, (id) => setView(id as ViewId))
                      }
                      className={`min-h-10 rounded-lg px-3 text-sm font-semibold ${
                        selected ? 'bg-[#1B4332] text-white' : 'text-[#3C3832]'
                      }`}
                    >
                      {item.label}
                    </button>
                  )
                })}
              </div>

              {view === 'schedule' ? (
                <div role="tabpanel" id="panel-schedule" aria-labelledby="tab-schedule" className="p-3 sm:p-4">
                  <ul className="space-y-2">
                    {[
                      ['8:30 AM', 'Brookside recurring', 'Team B · biweekly'],
                      ['11:00 AM', 'Shawnee move-out', 'Team A · booked in chat'],
                      ['2:00 PM', 'Plaza deep clean', 'Team B · one-time'],
                      ['6:30 PM', 'Overland Park estimate', 'Booked by the voice line'],
                    ].map(([time, name, detail], index) => (
                      <li
                        key={time}
                        className={`${styles.line} grid grid-cols-[4.5rem_1fr_auto] items-center gap-3 rounded-xl bg-[#F3EFE7] px-3 py-2.5`}
                        style={{ animationDelay: `${index * 0.08}s` }}
                      >
                        <span className={`${styles.nums} text-sm text-[#5C564E]`}>{time}</span>
                        <span>
                          <span className="block text-sm font-semibold">{name}</span>
                          <span className="block text-xs text-[#5C564E]">{detail}</span>
                        </span>
                        <span className="text-xs font-semibold text-[#1B4332]">On</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-xl border border-dashed border-[#C9DDD2] bg-[#F4FAF6] px-3 py-2 text-sm text-[#1B4332]">
                    New · website chat at 10:31 PM · 2-bed move-out in Shawnee, on Saturday.
                  </p>
                </div>
              ) : null}

              {view === 'leads' ? (
                <div role="tabpanel" id="panel-leads" aria-labelledby="tab-leads" className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
                  {[
                    ['New', 'Lenexa office · text · walkthrough requested'],
                    ['Estimate', 'Overland Park · voice · Thu 6:30'],
                    ['Won', 'Shawnee move-out · chat · Saturday'],
                    ['Recurring', 'Brookside · biweekly · Team B'],
                  ].map(([stage, detail]) => (
                    <div key={stage} className="rounded-xl bg-[#F3EFE7] p-3">
                      <p className="text-[11px] font-semibold tracking-wide text-[#5C564E] uppercase">{stage}</p>
                      <p className="mt-2 rounded-lg bg-white p-2.5 text-sm leading-snug text-[#1C1915]">{detail}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {view === 'reviews' ? (
                <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews" className="p-3 sm:p-4">
                  <p className="text-sm font-semibold text-[#1C1915]">Queued after the Shawnee move-out is marked done</p>
                  <div className="mt-3 max-w-md rounded-2xl rounded-bl-md bg-[#E7F2EB] px-3 py-3 text-sm leading-relaxed text-[#1C1915]">
                    Thanks for having Sparkle KC out today. If the clean earned it, a short Google review helps
                    other neighbors find us.
                  </div>
                  <p className="mt-3 text-sm text-[#5C564E]">
                    You approve the wording once. An unhappy reply comes back to you before it becomes a public
                    complaint. Sample message for a fictional company.
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
