'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import type { CalculatorConfig } from '@/content/trades/types'
import { BookDemo } from './links'
import { WEEKS_PER_MONTH, estimateLeak, formatCount, formatMoney, type LeakInput } from './leak'
import styles from './trade.module.css'

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
            className={`${styles.nums} w-24 bg-transparent text-right text-base font-semibold text-[#1C1915] outline-none`}
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
  repeatCustomers,
  firstJobRevenue,
  repeatRevenue,
  repeatNoun,
}: {
  lost: string
  recovered: string
  perDay: string
  jobs: string
  repeatCustomers: string | null
  firstJobRevenue: string
  repeatRevenue: string | null
  repeatNoun: string | null
}) {
  return (
    <div className="overflow-hidden rounded-2xl bg-[#1B4332] text-[#F6F3EC] shadow-[0_18px_40px_-28px_rgba(27,67,50,0.85)]">
      <div className="px-5 py-5 sm:px-6">
        <p className="text-[11px] font-semibold tracking-[0.16em] text-[#D7E6DC] uppercase">Illustrative</p>
        <p className={`${styles.display} mt-2 text-xl`}>Left on the table</p>
        <p className={`${styles.nums} mt-1 text-5xl font-semibold tracking-tight`}>{lost}</p>
        <p className="mt-1 text-sm text-[#D7E6DC]">this month · about {perDay} a day</p>
      </div>
      <div className="border-t border-white/15 px-5 py-5 sm:px-6">
        <p className={`${styles.display} text-xl`}>Recovered if those contacts are answered</p>
        <p className={`${styles.nums} mt-1 text-3xl font-semibold tracking-tight`}>{recovered}</p>
        <p className="mt-2 text-sm leading-relaxed text-[#D7E6DC]">
          {repeatNoun && repeatCustomers && repeatRevenue
            ? `About ${jobs} first jobs (${firstJobRevenue}) and ${repeatCustomers} ${repeatNoun} (${repeatRevenue} in the first month).`
            : `About ${jobs} booked jobs (${firstJobRevenue}). Later work from the same customer is not included.`}
        </p>
      </div>
    </div>
  )
}

export function LeakCalculator({ config }: { config: CalculatorConfig }) {
  const reduced = usePrefersReducedMotion()
  const starting = config.presets.find((preset) => preset.id === config.defaultPresetId) ?? config.presets[0]
  const [input, setInput] = useState<LeakInput>({
    callsPerWeek: starting.callsPerWeek,
    missedPercent: starting.missedPercent,
    averageJob: starting.averageJob,
    repeatMonthly: starting.repeatMonthly,
  })
  const [showMath, setShowMath] = useState(false)
  const rates = { bookRate: config.bookRate, repeatShare: config.repeat?.share ?? 0 }
  const result = useMemo(() => estimateLeak(input, rates), [input, rates.bookRate, rates.repeatShare])
  const animatedLost = useAnimatedNumber(result.monthlyLost, reduced)
  const lost = formatMoney(reduced ? result.monthlyLost : animatedLost)
  const recovered = formatMoney(result.monthlyRecovered)
  const missedDots = Math.round((input.missedPercent / 100) * DOTS)

  const activePreset = config.presets.find(
    (preset) =>
      preset.callsPerWeek === input.callsPerWeek &&
      preset.missedPercent === input.missedPercent &&
      preset.averageJob === input.averageJob &&
      preset.repeatMonthly === input.repeatMonthly,
  )?.id

  const patch = (partial: Partial<LeakInput>) => setInput((current) => ({ ...current, ...partial }))

  const card = (
    <ResultCard
      lost={lost}
      recovered={recovered}
      perDay={formatMoney(result.perDay)}
      jobs={formatCount(result.bookedJobs)}
      repeatCustomers={config.repeat ? formatCount(result.repeatCustomers) : null}
      firstJobRevenue={formatMoney(result.firstJobRevenue)}
      repeatRevenue={config.repeat ? formatMoney(result.repeatRevenue) : null}
      repeatNoun={config.repeat?.noun ?? null}
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
            {config.presets.map((preset) => {
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
                      repeatMonthly: preset.repeatMonthly,
                    })
                  }
                  className={`min-h-11 rounded-full px-3.5 text-sm font-semibold transition-colors ${
                    selected ? 'bg-[#1B4332] text-white' : 'bg-[#F3EFE7] text-[#1C1915] hover:bg-[#E7E0D4]'
                  }`}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
          <p className="mt-3 text-sm text-[#5C564E]">Start from a week that looks like yours, then move the numbers.</p>

          <div className="mt-6 space-y-6">
            <Field
              id="calls-per-week"
              label="Calls and messages a week"
              hint={config.calls.hint}
              min={config.calls.min}
              max={config.calls.max}
              step={config.calls.step}
              value={input.callsPerWeek}
              onChange={(callsPerWeek) => patch({ callsPerWeek })}
            />
            <Field
              id="missed-percent"
              label="Missed or after hours"
              hint={config.missed.hint}
              min={config.missed.min}
              max={config.missed.max}
              step={config.missed.step}
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
              label={config.job.label}
              hint={config.job.hint}
              min={config.job.min}
              max={config.job.max}
              step={config.job.step}
              value={input.averageJob}
              prefix="$"
              onChange={(averageJob) => patch({ averageJob })}
            />
            {config.repeat ? (
              <Field
                id="repeat-value"
                label={config.repeat.label}
                hint={config.repeat.hint}
                min={config.repeat.min}
                max={config.repeat.max}
                step={config.repeat.step}
                value={input.repeatMonthly}
                prefix="$"
                onChange={(repeatMonthly) => patch({ repeatMonthly })}
              />
            ) : null}
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
                  Contacts a month = calls and messages a week × {WEEKS_PER_MONTH}. Missed contacts = that total ×
                  your missed percent.
                </p>
                <p className="mt-2">
                  Jobs = missed contacts × {config.bookRateLabel}. That booking rate is an assumption, not your close
                  rate.
                </p>
                {config.repeat ? (
                  <p className="mt-2">
                    {config.repeat.noun} = those jobs × {config.repeat.shareLabel}. Monthly revenue lost = jobs ×{' '}
                    {config.job.label.toLowerCase()}, plus {config.repeat.noun} × the monthly value. Monthly revenue
                    recovered uses the same figure, on the assumption those contacts get an answer and book at that
                    rate.
                  </p>
                ) : (
                  <p className="mt-2">
                    Monthly revenue lost = jobs × {config.job.label.toLowerCase()}. Later work from the same customer
                    is not included. Monthly revenue recovered uses the same figure, on the assumption those contacts
                    get an answer and book at that rate.
                  </p>
                )}
              </div>
            ) : null}
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            {card}
            <BookDemo className="w-full">Book a Demo</BookDemo>
            <p className="text-sm leading-relaxed text-[#5C564E]">
              Illustrative only. Not a promise, and not a client result. Your close rate will differ. On the demo we
              will use a real week from your phone.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-4 lg:hidden">
        {card}
        <BookDemo className="w-full">Book a Demo</BookDemo>
        <p className="text-sm leading-relaxed text-[#5C564E]">
          Illustrative only. Not a promise, and not a client result. Your close rate will differ. On the demo we will
          use a real week from your phone.
        </p>
      </div>
    </div>
  )
}
