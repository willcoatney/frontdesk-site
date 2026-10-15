'use client'

import { useState } from 'react'
import { Check, X } from 'lucide-react'

export function BeforeAfter({ before, after }: { before: string[]; after: string[] }) {
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
          <h3 className="text-lg font-semibold text-[#9C4221]">The day you already know</h3>
          <ul className="mt-4 space-y-3">
            {before.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#3C3832]">
                <X className="mt-0.5 size-4 shrink-0 text-[#9C4221]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
        <article className={`${side === 'after' ? 'block' : 'hidden'} rounded-2xl border border-[#C9DDD2] bg-[#F4FAF6] p-5 md:block sm:p-6`}>
          <h3 className="text-lg font-semibold text-[#1B4332]">The same day, with a front office</h3>
          <ul className="mt-4 space-y-3">
            {after.map((item) => (
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
