'use client'

import { useId, useState } from 'react'
import { PHONE, PHONE_HREF } from './constants'

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  const panelId = useId()
  return (
    <div className="border-b border-[#DDD5C8]">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-start justify-between gap-4 py-4 text-left text-base font-semibold text-[#1C1915]"
        >
          <span>{q}</span>
          <span aria-hidden className={`mt-0.5 text-xl leading-none text-[#1B4332] ${open ? 'rotate-45' : ''}`}>
            +
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" hidden={!open}>
        <p className="pb-4 text-base leading-relaxed text-[#3C3832]">{a}</p>
      </div>
    </div>
  )
}

export function FaqList({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <div>
      {faqs.map((faq) => (
        <Item key={faq.q} q={faq.q} a={faq.a} />
      ))}
      <p className="mt-6 text-sm text-[#5C564E]">
        More questions?{' '}
        <a href={PHONE_HREF} className="font-semibold text-[#1B4332] underline underline-offset-4">
          Call {PHONE}
        </a>
        . You will get a person.
      </p>
    </div>
  )
}
