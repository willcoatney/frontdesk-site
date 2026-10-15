export type Plan = {
  id: 'starter' | 'pro' | 'growth'
  name: string
  /** Monthly floor. Growth is this amount and up. */
  price: number
  priceLabel: string
  period: string
  setup: number
  setupLabel: string
  desc: string
  highlight: boolean
  badge: string | null
  bullets: string[]
  /** Honest offer text for JSON-LD. Setup is one-time and is not the monthly price. */
  schemaDescription: string
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 197,
    priceLabel: '$197',
    period: '/ month',
    setup: 297,
    setupLabel: '$297',
    desc: 'A one-page site and a voice line that catches the lead while you are on the job.',
    highlight: false,
    badge: null,
    bullets: [
      'One-page site',
      'AI voice answering that takes messages and texts you the lead',
      'Missed-call text-back',
      'Up to 2 site edits a month',
    ],
    schemaDescription:
      '$197 per month. One-time setup $297. Includes a one-page site, AI voice answering that takes messages and texts the owner the lead, missed-call text-back, and up to 2 site edits a month. Month-to-month. Cancel anytime. Edits beyond the monthly allowance are billed hourly or quoted.',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 397,
    priceLabel: '$397',
    period: '/ month',
    setup: 497,
    setupLabel: '$497',
    desc: 'The quoting front office: a full site, a voice line that books, chat and text, and the CRM.',
    highlight: true,
    badge: 'Quotes and books',
    bullets: [
      'Full multi-page site',
      'AI voice that quotes and books',
      'Chat and text',
      'GoHighLevel CRM with pipeline and review requests',
      'Up to 5 site edits a month',
    ],
    schemaDescription:
      '$397 per month. One-time setup $497. Includes a full multi-page site, AI voice that quotes and books, chat and text, GoHighLevel CRM with pipeline and review requests, and up to 5 site edits a month. Month-to-month. Cancel anytime. Edits beyond the monthly allowance are billed hourly or quoted.',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 797,
    priceLabel: '$797',
    period: '/ month and up',
    setup: 997,
    setupLabel: '$997',
    desc: 'Everything in Pro, plus a custom dashboard, a monthly strategy call, and priority turnaround.',
    highlight: false,
    badge: 'Custom dashboard',
    bullets: [
      'Everything in Pro',
      'Custom dashboard fed by the voice line and the CRM',
      'Monthly strategy call',
      'Priority support and turnaround',
    ],
    schemaDescription:
      'Starting at $797 per month and quoted up from there. One-time setup $997. Includes everything in Pro plus a custom dashboard fed by the voice line and the CRM, a monthly strategy call, and priority support and turnaround. Month-to-month. Cancel anytime. Edits beyond the monthly allowance are billed hourly or quoted.',
  },
]

export const PRICING_NOTE =
  'Month-to-month after launch. Cancel anytime. Edits beyond the monthly allowance are billed hourly or quoted.'

export const RECEPTIONIST_COMPARE =
  'A person answering the phone is often $2,500 to $4,000 a month before benefits, and they go home. FrontDesk Starter is $197 a month with a $297 setup. Pro is $397 a month with a $497 setup. Growth starts at $797 a month with a $997 setup and is quoted up from there. Month-to-month after launch. Cancel anytime. The 30-minute demo is where we confirm which plan fits.'

export function costFaq() {
  return {
    q: 'What does it cost compared with a receptionist?',
    a: RECEPTIONIST_COMPARE,
  }
}

export function editsFaq() {
  return {
    q: 'What if I need more site edits than the plan includes?',
    a: 'Starter includes up to 2 site edits a month. Pro and Growth include up to 5. Edits beyond that allowance are billed hourly or quoted before the work starts.',
  }
}
