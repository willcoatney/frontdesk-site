import { Check } from 'lucide-react'
import { PaperHeading, PaperPage, RelatedLinks } from '@/components/paper/shell'
import { FaqList } from '@/components/trade/faq'
import { BookDemo } from '@/components/trade/links'
import { FaqSchema, PricingOffers } from '@/components/trade/schema'
import styles from '@/components/trade/trade.module.css'
import { PLANS, PRICING_NOTE, costFaq, editsFaq } from '@/content/pricing'
import { pageMeta } from '@/lib/page-meta'

const PATH = '/pricing'

const faqs = [
  {
    q: 'What is the difference between Starter, Pro, and Growth?',
    a: 'Starter is $197 a month with a $297 setup: a one-page site, AI voice that takes a message and texts you the lead, missed-call text-back, and up to 2 site edits a month. Pro is $397 a month with a $497 setup: a full multi-page site, AI voice that quotes and books, chat and text, GoHighLevel CRM with pipeline and review requests, and up to 5 site edits a month. Growth starts at $797 a month with a $997 setup and is quoted up from there. It includes everything in Pro, plus a custom dashboard fed by the voice line and the CRM, a monthly strategy call, and priority support and turnaround.',
  },
  {
    q: 'Is Growth a flat $797?',
    a: 'No. Growth starts at $797 a month and is quoted up from there, with a $997 setup. The demo is where that quote gets specific. We do not publish a ceiling.',
  },
  {
    q: 'Which plan actually quotes and books?',
    a: 'Pro and Growth. Starter takes the message and texts you the lead, and it includes missed-call text-back. It does not quote a job or hold a calendar slot. The custom dashboard is on Growth.',
  },
  costFaq(),
  editsFaq(),
  {
    q: 'Is there a contract?',
    a: 'Month-to-month after launch. Cancel anytime. Setup is a one-time fee on the plan you pick. There is no per-minute charge on these three plans.',
  },
  {
    q: 'Do you cover 816 and 913 numbers?',
    a: 'Yes. FrontDesk is run from Olathe and works on both sides of the state line. We forward the number already on the truck, the site, and the Google listing, whether it is 913 or 816. If you would rather add a local number, we can.',
  },
  {
    q: 'What if my company does not fit a published plan?',
    a: 'Then the price is a custom quote after the 30-minute demo. We would rather say that than stretch a plan past what it includes.',
  },
]

export const metadata = pageMeta({
  path: PATH,
  title: 'FrontDesk AI pricing — Starter $197, Pro $397, Growth $797+',
  description:
    'Published FrontDesk plans for Kansas City service businesses. Starter $197 a month, Pro $397, Growth from $797. One-time setup. Month-to-month. Built in Olathe for 913 and 816.',
  ogTitle: 'Starter $197. Pro $397. Growth $797 and up.',
  ogDescription:
    'Three published FrontDesk plans. Setup is one-time. Month-to-month after launch. Book a demo with Will in Olathe.',
  ogImage: '/og/pricing.png',
  ogAlt: 'FrontDesk AI pricing: Starter $197 a month, Pro $397 a month, Growth $797 a month and up.',
})

export default function PricingPage() {
  return (
    <PaperPage
      currentHref={PATH}
      kicker="Pricing"
      title="Three plans. The prices are the prices."
      lede="Starter is $197 a month. Pro is $397 a month. Growth starts at $797 a month and is quoted up from there. Setup is a one-time fee on the plan you pick. The same three plans are on every FrontDesk page."
      schema={
        <>
          <FaqSchema path={PATH} faqs={faqs} />
          <PricingOffers path={PATH} />
        </>
      }
    >
      <section id="plans" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PaperHeading
            kicker="The plans"
            title="What each one actually does."
            lede="Starter catches the lead. Pro quotes and books. Growth adds the dashboard and a monthly call. None of them charge per minute."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-5 sm:p-6 ${
                  plan.highlight ? 'border-[#1B4332] bg-[#F4FAF6]' : 'border-[#DDD5C8] bg-[#FBF8F3]'
                }`}
              >
                {plan.badge ? (
                  <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-[#1B4332] uppercase">{plan.badge}</p>
                ) : (
                  <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-transparent uppercase" aria-hidden>
                    Plan
                  </p>
                )}
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className={`${styles.nums} text-4xl font-semibold tracking-tight`}>{plan.priceLabel}</span>
                  <span className="text-sm text-[#5C564E]">{plan.period}</span>
                </p>
                <p className="mt-1 text-sm text-[#5C564E]">One-time setup {plan.setupLabel}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{plan.desc}</p>
                <ul className="mt-4 space-y-2">
                  {plan.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2 text-sm text-[#1C1915]">
                      <Check className="mt-0.5 size-4 shrink-0 text-[#1B4332]" aria-hidden />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <BookDemo className="mt-6 w-full">Book a Demo</BookDemo>
              </article>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">{PRICING_NOTE}</p>
        </div>
      </section>

      <section className="bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <PaperHeading
            kicker="What is not included"
            title="A few lines we would rather say here."
          />
          <ul className="mt-6 space-y-3 text-base leading-relaxed text-[#3C3832]">
            <li>Starter does not quote a price or book a slot. That starts on Pro.</li>
            <li>The custom dashboard is on Growth, not on Starter or Pro.</li>
            <li>Edits past the monthly allowance are billed hourly or quoted before the work starts.</li>
            <li>If the company sits outside these three plans, the price is a custom quote after the demo.</li>
          </ul>
          <RelatedLinks omit={PATH} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <PaperHeading kicker="Questions" title="Pricing, answered in plain language." />
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
    </PaperPage>
  )
}
