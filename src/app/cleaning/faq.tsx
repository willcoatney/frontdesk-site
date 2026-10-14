'use client'

import { useId, useState } from 'react'
import { PHONE, PHONE_HREF } from './constants'

const FAQS = [
  {
    q: 'Does it sound robotic?',
    a: 'You hear it before a customer does. During setup we run test calls on your work — biweekly, deep, move-out, and a commercial walkthrough — and you say what sounds off. It asks the questions a sharp office person would ask. It is still a voice on a phone. The demo is the fastest way to decide if you would put it on your vans.',
  },
  {
    q: 'What if it gets something wrong?',
    a: 'It quotes only inside the ranges you approve. Outside those ranges it does not invent a price. It books the walkthrough or the estimate and texts you. You can change or cancel a booking from the dashboard. Nothing goes live until you have heard the test calls.',
  },
  {
    q: 'Can I take over a call?',
    a: 'Yes. It is your number. You can pick up, and you can have the line hand a call to you when a person should decide. When you are on a job, it answers. When you want the phone, you take it.',
  },
  {
    q: 'What does it cost compared with a receptionist?',
    a: 'A person answering the phone is often $2,500 to $4,000 a month before benefits, and they go home. The published FrontDesk plans are $597 and $1,197 a month, plus a one-time $497 setup. Month-to-month after launch. The 30-minute demo is where we confirm which plan fits. If your crews or call volume sit outside those plans, the price is a custom quote after that demo.',
  },
  {
    q: 'Do I have to switch my phone number?',
    a: 'No. We forward the number already on your vans, your site, and your Google listing. Customers dial the same number. If you would rather keep that line for yourself, we can add a local Kansas City number instead.',
  },
  {
    q: 'How long does setup take?',
    a: 'Plan on about two weeks to be live. That covers the demo, your price bands and crew rules, the website, test calls you listen to, and the first days of real calls while we tighten the wording. You keep cleaning while that happens.',
  },
  {
    q: 'What if a job needs a walkthrough before anyone can price it?',
    a: 'That is a normal cleaning call. Commercial bids, and homes outside your bands, are booked as walkthroughs or in-home estimates. The line captures the details and puts them on your calendar. You set the price after you see the place.',
  },
]

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

export function FaqList() {
  return (
    <div>
      {FAQS.map((faq) => (
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
