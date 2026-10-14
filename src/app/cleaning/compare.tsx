'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

const BEFORE = [
  '9:47 PM. You are locking up a house. The call goes to voicemail.',
  'A chat about a move-out waits until morning. They book someone else.',
  'Every price waits on you, because the bands live in your head.',
  'Tomorrow’s route is a thread of texts.',
  'The review ask happens if you remember on Friday.',
]

const AFTER = [
  'The same call is answered. A biweekly estimate is on Thursday at 6:30.',
  'The chat books a Shawnee move-out at 10:31 PM.',
  'An office in Lenexa becomes a walkthrough, not a guessed price.',
  'Team A and Team B have the day, with drive time between houses.',
  'The review text sends when the clean is marked done.',
]

export function BeforeAfter() {
  const [side, setSide] = useState<'before' | 'after'>('before')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Before and after"
        className="mb-4 grid grid-cols-2 gap-1 rounded-xl bg-[#E7E0D4] p-1 md:hidden"
      >
        {(
          [
            ['before', 'Before'],
            ['after', 'After'],
          ] as const
        ).map(([id, label]) => {
          const selected = side === id
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setSide(id)}
              className={`min-h-11 rounded-lg text-sm font-semibold ${
                selected ? 'bg-[#FBF8F3] text-[#1C1915] shadow-sm' : 'text-[#3C3832]'
              }`}
            >
              {label}
            </button>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <article className={`${side === 'before' ? 'block' : 'hidden'} rounded-2xl border border-[#E7D2C8] bg-[#FBF6F3] p-5 md:block sm:p-6`}>
          <h3 className="text-lg font-semibold text-[#9C4221]">The night you already know</h3>
          <ul className="mt-4 space-y-3">
            {BEFORE.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#3C3832]">
                <X className="mt-0.5 size-4 shrink-0 text-[#9C4221]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className={`${side === 'after' ? 'block' : 'hidden'} rounded-2xl border border-[#C9DDD2] bg-[#F4FAF6] p-5 md:block sm:p-6`}>
          <h3 className="text-lg font-semibold text-[#1B4332]">The same night, with a front office</h3>
          <ul className="mt-4 space-y-3">
            {AFTER.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#1C1915]">
                <Check className="mt-0.5 size-4 shrink-0 text-[#1B4332]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </div>
  )
}
