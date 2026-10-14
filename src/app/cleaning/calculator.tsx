'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { BookDemo } from './links'
import {
  BOOK_RATE,
  DEFAULT_INPUT,
  PRESETS,
  RECURRING_SHARE,
  WEEKS_PER_MONTH,
  estimateLeak,
  formatCount,
  formatMoney,
  type LeakInput,
} from './leak'
import styles from './cleaning-v2.module.css'

const DOTS = 16

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const apply = () => setReduced(media.matches)
    apply()
    media.addEventListener('change', apply)
    return () => media.removeEventListener('change', apply)
  }, [])
  return reduced
}

function useAnimatedNumber(value: number, reduced: boolean) {
  const [display, setDisplay] = useState(value)
  const displayRef = useRef(value)

  useEffect(() => {
    if (reduced) {
      displayRef.current = value
      return
    }
    const from = displayRef.current
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / 420)
      const eased = 1 - (1 - progress) ** 3
      const next = from + (value - from) * eased
      displayRef.current = next
      setDisplay(next)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [value, reduced])

  return reduced ? value : display
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.min(max, Math.max(min, value))
}

function Field({
  id,
  label,
  hint,
  min,
  max,
  step,
  value,
  prefix,
  suffix,
  onChange,
}: {
  id: string
  label: string
  hint: string
  min: number
  max: number
  step: number
  value: number
  prefix?: string
  suffix?: string
  onChange: (value: number) => void
}) {
  const pct = `${((value - min) / (max - min)) * 100}%`
  return (
    <div>
      <div className="flex items-end justify-between gap-3">
        <label htmlFor={id} className="text-sm font-semibold text-[#1C1915]">
          {label}
        </label>
        <div className="flex items-center gap-1 rounded-lg border border-[#DDD5C8] bg-white px-2 py-1">
          {prefix ? <span className="text-sm text-[#5C564E]">{prefix}</span> : null}
          <input
            id={id}
            type="number"
            inputMode="numeric"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(event) => onChange(clamp(event.target.valueAsNumber, min, max))}
            className={`${styles.nums} w-16 bg-transparent text-right text-base font-semibold text-[#1C1915] outline-none`}
          />
          {suffix ? <span className="text-sm text-[#5C564E]">{suffix}</span> : null}
        </div>
      </div>
      <p id={`${id}-hint`} className="mt-1 text-sm leading-snug text-[#5C564E]">
        {hint}
      </p>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        aria-describedby={`${id}-hint`}
        onChange={(event) => onChange(clamp(event.target.valueAsNumber, min, max))}
        className={`${styles.slider} mt-1`}
        style={{ ['--pct' as string]: pct }}
      />
    </div>
  )
}

function ResultCard({
  lost,
  recovered,
  perDay,
  jobs,
  recurring,
  firstJobRevenue,
  recurringRevenue,
}: {
  lost: string
  recovered: string
  perDay: string
  jobs: string
  recurring: string
  firstJobRevenue: string
  recurringRevenue: string
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#1B4332] text-[#F6F3EC] shadow-[0_18px_40px_-28px_rgba(27,67,50,0.85)]">
      <div className="px-5 py-5 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#D7E6DC] uppercase">
          Illustrative
        </p>
        <p className={`${styles.display} mt-2 text-xl`}>Left on the table</p>
        <p className={`${styles.nums} mt-1 text-5xl font-semibold tracking-tight`}>{lost}</p>
        <p className="mt-1 text-sm text-[#D7E6DC]">this month · about {perDay} a day</p>
      </div>
      <div className="border-t border-white/15 px-5 py-5 sm:px-6">
        <p className={`${styles.display} text-xl`}>Recovered if those contacts are answered</p>
        <p className={`${styles.nums} mt-1 text-3xl font-semibold tracking-tight`}>{recovered}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#D7E6DC]">
          About {jobs} first jobs ({firstJobRevenue}) and {recurring} new recurring clients (
          {recurringRevenue} in the first month).
        </p>
      </div>
    </div>
  )
}

export function LeakCalculator() {
  const reduced = usePrefersReducedMotion()
  const [input, setInput] = useState<LeakInput>(DEFAULT_INPUT)
  const [showMath, setShowMath] = useState(false)
  const result = useMemo(() => estimateLeak(input), [input])
  const animatedLost = useAnimatedNumber(result.monthlyLost, reduced)
  const lost = formatMoney(reduced ? result.monthlyLost : animatedLost)
  const recovered = formatMoney(result.monthlyRecovered)
  const missedDots = Math.round((input.missedPercent / 100) * DOTS)

  const activePreset = PRESETS.find(
    (preset) =>
      preset.callsPerWeek === input.callsPerWeek &&
      preset.missedPercent === input.missedPercent &&
      preset.averageJob === input.averageJob &&
      preset.recurringMonthly === input.recurringMonthly,
  )?.id

  const patch = (partial: Partial<LeakInput>) => setInput((current) => ({ ...current, ...partial }))

  const card = (
    <ResultCard
      lost={lost}
      recovered={recovered}
      perDay={formatMoney(result.perDay)}
      jobs={formatCount(result.bookedJobs)}
      recurring={formatCount(result.recurringClients)}
      firstJobRevenue={formatMoney(result.firstJobRevenue)}
      recurringRevenue={formatMoney(result.recurringRevenue)}
    />
  )

  return (
    <div>
      <div className="sticky top-16 z-30 -mx-4 mb-4 border-b border-[#DDD5C8] bg-[#F3EFE7]/95 px-4 py-3 backdrop-blur-md sm:-mx-6 sm:px-6 lg:hidden">
        <p className="text-[11px] font-semibold tracking-[0.14em] text-[#9C4221] uppercase">
          Illustrative · left on the table
        </p>
        <p className={`${styles.nums} text-3xl font-semibold tracking-tight text-[#1C1915]`}>
          {lost}
          <span className="ml-2 text-base font-medium text-[#5C564E]">/ month</span>
        </p>
      </div>

      <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6">
        <div className={`${styles.card} p-4 sm:p-6`}>
          <div role="radiogroup" aria-label="Example weeks" className="flex flex-wrap gap-2">
            {PRESETS.map((preset) => {
              const selected = activePreset === preset.id
              return (
                <button
                  key={preset.id}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() =>
                    setInput({
                      callsPerWeek: preset.callsPerWeek,
                      missedPercent: preset.missedPercent,
                      averageJob: preset.averageJob,
                      recurringMonthly: preset.recurringMonthly,
                    })
                  }
                  className={`min-h-11 rounded-full px-3.5 text-sm font-semibold transition-colors ${
                    selected
                      ? 'bg-[#1B4332] text-white'
                      : 'bg-[#F3EFE7] text-[#1C1915] hover:bg-[#E7E0D4]'
                  }`}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-[#5C564E]">
            Start from a week that looks like yours, then move the numbers.
          </p>

          <div className="mt-6 space-y-6">
            <Field
              id="calls-per-week"
              label="Calls and messages a week"
              hint="Phone calls, plus website chats and texts."
              min={4}
              max={80}
              step={1}
              value={input.callsPerWeek}
              onChange={(callsPerWeek) => patch({ callsPerWeek })}
            />
            <Field
              id="missed-percent"
              label="Missed or after hours"
              hint="Voicemail, or anything that comes in after you have quit for the day. For context, 62% of calls to small businesses go unanswered."
              min={5}
              max={80}
              step={1}
              value={input.missedPercent}
              suffix="%"
              onChange={(missedPercent) => patch({ missedPercent })}
            />
            <div>
              <div className={styles.meter} aria-hidden>
                <span style={{ width: `${input.missedPercent}%` }} />
              </div>
              <p className="mt-2 text-sm text-[#5C564E]">
                <span className="sr-only">
                  {missedDots} of {DOTS} sample contacts missed.{' '}
                </span>
                About {formatCount(result.missedContacts)} contacts a month never reach a person, out of{' '}
                {formatCount(result.contactsPerMonth)}.
              </p>
              <div className="mt-2 flex gap-1" aria-hidden>
                {Array.from({ length: DOTS }, (_, index) => (
                  <span
                    key={index}
                    className={`h-2 flex-1 rounded-full ${index < missedDots ? 'bg-[#9C4221]' : 'bg-[#C9DDD2]'}`}
                  />
                ))}
              </div>
            </div>
            <Field
              id="average-job"
              label="Average job value"
              hint="A typical first clean or one-time job, not the whole route."
              min={80}
              max={600}
              step={5}
              value={input.averageJob}
              prefix="$"
              onChange={(averageJob) => patch({ averageJob })}
            />
            <Field
              id="recurring-value"
              label="Recurring client, per month"
              hint="What one client who stays is worth each month. A $150 biweekly visit is about $325."
              min={100}
              max={2000}
              step={10}
              value={input.recurringMonthly}
              prefix="$"
              onChange={(recurringMonthly) => patch({ recurringMonthly })}
            />
          </div>

          <div className="mt-6 border-t border-[#E7E0D4] pt-4">
            <button
              type="button"
              aria-expanded={showMath}
              aria-controls="leak-math"
              onClick={() => setShowMath((open) => !open)}
              className="text-sm font-semibold text-[#1B4332] underline decoration-[#1B4332]/30 underline-offset-4"
            >
              {showMath ? 'Hide the math' : 'Show the math'}
            </button>
            {showMath ? (
              <div id="leak-math" className="mt-3 text-sm leading-relaxed text-[#3C3832]">
                <p>
                  Contacts a month = calls and messages a week × {WEEKS_PER_MONTH}. Missed contacts = that
                  total × your missed percent.
                </p>
                <p className="mt-2">
                  Jobs = missed contacts × {BOOK_RATE.toFixed(2)} (1 in 3). Recurring clients = those jobs ×{' '}
                  {RECURRING_SHARE.toFixed(2)} (1 in 4).
                </p>
                <p className="mt-2">
                  Monthly revenue lost = jobs × average job value, plus recurring clients × monthly recurring
                  value. Monthly revenue recovered uses the same figure, on the assumption those contacts get
                  an answer and book at that rate.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            {card}
            <BookDemo className="w-full">Book a Demo</BookDemo>
            <p className="text-sm leading-relaxed text-[#5C564E]">
              Illustrative only. Not a promise, and not a client result. Your close rate will differ. On the
              demo we will use a real week from your phone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4 lg:hidden">
        {card}
        <BookDemo className="w-full">Book a Demo</BookDemo>
        <p className="text-sm leading-relaxed text-[#5C564E]">
          Illustrative only. Not a promise, and not a client result. Your close rate will differ. On the demo
          we will use a real week from your phone.
        </p>
      </div>
    </div>
  )
}
