'use client'

import { useState, type KeyboardEvent } from 'react'
import type { DemoConfig } from '@/content/trades/types'
import styles from './trade.module.css'

const TABS = [
  { id: 'call', label: 'Call' },
  { id: 'chat', label: 'Chat' },
  { id: 'dashboard', label: 'Dashboard' },
] as const

type TabId = (typeof TABS)[number]['id']

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
    document.getElementById(`tab-${next}`)?.focus()
  }
}

export function ProductDemos({ demo }: { demo: DemoConfig }) {
  const [tab, setTab] = useState<TabId>('call')
  const [run, setRun] = useState(0)
  const [chat, setChat] = useState(demo.chat.scenarios[0]?.id ?? '')
  const [view, setView] = useState<ViewId>('schedule')
  const scenario = demo.chat.scenarios.find((item) => item.id === chat) ?? demo.chat.scenarios[0]

  return (
    <div>
      <div role="tablist" aria-label="Product demos" className="grid grid-cols-3 gap-1 rounded-xl bg-[#E7E0D4] p-1">
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
                    <span>{demo.call.time}</span>
                    <span className="inline-flex items-center gap-1.5 text-emerald-200">
                      <span className={`${styles.live} size-1.5 rounded-full bg-emerald-300`} />
                      On a call
                    </span>
                  </div>
                  <p className="mt-3 text-center text-sm font-semibold text-white">{demo.company}</p>
                  <p className="text-center text-[11px] text-amber-100/80">Fictional company</p>
                  <div key={`call-${run}`} className="mt-4 space-y-2.5">
                    {demo.call.lines.map((line, index) => (
                      <div
                        key={`${line.who}-${index}`}
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
                <h3 className={`${styles.display} text-2xl text-[#1C1915] sm:text-3xl`}>{demo.call.headline}</h3>
                <p className="mt-3 text-base leading-relaxed text-[#3C3832]">{demo.call.body}</p>
                <p className="mt-3 text-sm text-[#6B4E22]">{demo.call.note}</p>
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

        {tab === 'chat' && scenario ? (
          <div role="tabpanel" id="panel-chat" aria-labelledby="tab-chat" tabIndex={0} className="outline-none">
            <div className="overflow-hidden rounded-2xl border border-[#DDD5C8] bg-white shadow-[0_18px_40px_-32px_rgba(28,25,21,0.45)]">
              <div className="flex items-center gap-1.5 border-b border-[#EFEAE2] px-3 py-2.5">
                <span className="size-2 rounded-full bg-[#E4D5C6]" />
                <span className="size-2 rounded-full bg-[#E4D5C6]" />
                <span className="size-2 rounded-full bg-[#E4D5C6]" />
                <span className="ml-2 truncate text-xs text-[#5C564E]">{demo.site}</span>
                <span className="ml-auto shrink-0 rounded-full bg-[#F3EFE7] px-2 py-0.5 text-[11px] font-semibold text-[#6B4E22]">
                  {demo.chat.time}
                </span>
              </div>
              <div className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]">
                <div className="hidden sm:block">
                  <p className={`${styles.display} text-3xl leading-tight text-[#1C1915]`}>{demo.chat.introTitle}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C564E]">{demo.chat.intro}</p>
                </div>
                <div>
                  <div role="group" aria-label={demo.chat.groupLabel} className="mb-3 flex flex-wrap gap-2">
                    {demo.chat.scenarios.map((item) => {
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
                        {demo.initial}
                      </span>
                      <div>
                        <p className="text-sm font-semibold">{demo.short}</p>
                        <p className="text-xs text-[#1B4332]">Replies instantly · fictional</p>
                      </div>
                    </div>
                    <div key={`${chat}-${run}`} className="space-y-2">
                      {scenario.lines.map((line, index) => (
                        <div
                          key={`${line.who}-${index}`}
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
                  <p className="mt-3 text-sm text-[#6B4E22]">{demo.chat.note}</p>
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
                  <p className="font-semibold text-[#1C1915]">{demo.company}</p>
                  <p className="text-xs text-[#5C564E]">Sample day · fictional company · Growth plan</p>
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
                    {demo.dashboard.schedule.map((item, index) => (
                      <li
                        key={`${item.time}-${item.name}`}
                        className={`${styles.line} grid grid-cols-[4.75rem_1fr_auto] items-center gap-3 rounded-xl bg-[#F3EFE7] px-3 py-2.5`}
                        style={{ animationDelay: `${index * 0.08}s` }}
                      >
                        <span className={`${styles.nums} text-sm text-[#5C564E]`}>{item.time}</span>
                        <span>
                          <span className="block text-sm font-semibold">{item.name}</span>
                          <span className="block text-xs text-[#5C564E]">{item.detail}</span>
                        </span>
                        <span className="text-xs font-semibold text-[#1B4332]">On</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 rounded-xl border border-dashed border-[#C9DDD2] bg-[#F4FAF6] px-3 py-2 text-sm text-[#1B4332]">
                    {demo.dashboard.flash}
                  </p>
                </div>
              ) : null}

              {view === 'leads' ? (
                <div role="tabpanel" id="panel-leads" aria-labelledby="tab-leads" className="grid gap-2 p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4">
                  {demo.dashboard.leads.map((item) => (
                    <div key={item.stage + item.detail} className="rounded-xl bg-[#F3EFE7] p-3">
                      <p className="text-[11px] font-semibold tracking-wide text-[#5C564E] uppercase">{item.stage}</p>
                      <p className="mt-2 rounded-lg bg-white p-2.5 text-sm leading-snug text-[#1C1915]">{item.detail}</p>
                    </div>
                  ))}
                </div>
              ) : null}

              {view === 'reviews' ? (
                <div role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews" className="p-3 sm:p-4">
                  <p className="text-sm font-semibold text-[#1C1915]">{demo.dashboard.reviewTitle}</p>
                  <div className="mt-3 max-w-md rounded-2xl rounded-bl-md bg-[#E7F2EB] px-3 py-3 text-sm leading-relaxed text-[#1C1915]">
                    {demo.dashboard.reviewBody}
                  </div>
                  <p className="mt-3 text-sm text-[#5C564E]">{demo.dashboard.reviewNote}</p>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
