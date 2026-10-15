import { Check } from 'lucide-react'
import { PaperHeading, PaperPage, RelatedLinks } from '@/components/paper/shell'
import { FaqList } from '@/components/trade/faq'
import { BookDemo } from '@/components/trade/links'
import { FaqSchema } from '@/components/trade/schema'
import styles from '@/components/trade/trade.module.css'
import { PLANS, PRICING_NOTE } from '@/content/pricing'
import { pageMeta } from '@/lib/page-meta'

const PATH = '/websites'

const faqs = [
  {
    q: 'Is this Kansas City web design, or a phone product with a page attached?',
    a: 'It is both, sold together. Every plan includes a site and an AI receptionist on the number you already use. Starter is a one-page site plus a voice line that takes messages and texts you the lead. Pro and Growth are a full multi-page site, and those plans quote and book. We are not a branding studio that hands you a design and leaves the phone on voicemail.',
  },
  {
    q: 'Do you do web design in Overland Park?',
    a: 'Yes. The work is built in Olathe and aimed at Overland Park, Olathe, Shawnee, Lenexa, Lee’s Summit, and the rest of the Kansas City metro, on both the 913 and 816 sides of the state line. You do not need an Overland Park storefront for us to build the site.',
  },
  {
    q: 'What does the site include?',
    a: 'Starter is one page: who you are, what you do, how to reach you, and the phone line behind it. Pro and Growth are a multi-page site, plus chat and text, and a GoHighLevel CRM with pipeline and review requests. Growth adds a custom dashboard. Copy and structure are built around your services. We do not sell a logo package by itself.',
  },
  {
    q: 'How many edits do I get?',
    a: 'Starter includes up to 2 site edits a month. Pro and Growth include up to 5. Edits past that allowance are billed hourly or quoted before the work starts.',
  },
  {
    q: 'Can I buy only the website?',
    a: 'No. The published plans are a website and the front office together. If you want a design-only project, this is the wrong shop, and we would rather say that than pretend otherwise.',
  },
  {
    q: 'How fast is it live?',
    a: 'Plan on about two weeks after the demo. That covers the site, the number forwarding, the rules for how calls are handled, and test calls you hear before a customer does. Month-to-month after launch. Cancel anytime.',
  },
]

export const metadata = pageMeta({
  path: PATH,
  title: 'Kansas City web design with an AI receptionist — FrontDesk KC',
  description:
    'Web design in Overland Park and across Kansas City, sold as a website plus an AI receptionist. Built in Olathe. Starter $197 a month for a one-page site. Pro $397 for a multi-page site that quotes and books.',
  ogTitle: 'Kansas City web design, with the phone answered.',
  ogDescription:
    'A website and an AI receptionist, built in Olathe for Overland Park and the Kansas City metro. Plans from $197 a month.',
  ogImage: '/og/websites.png',
  ogAlt: 'Kansas City web design from FrontDesk KC: a website bundled with an AI receptionist, built in Olathe.',
})

export default function WebsitesPage() {
  return (
    <PaperPage
      currentHref={PATH}
      kicker="Kansas City web design"
      title="Kansas City web design, with the phone answered."
      lede="FrontDesk builds the site and the receptionist as one bundle, from a desk in Olathe, for Overland Park and the rest of the metro. Starter is a one-page site at $197 a month. Pro is a multi-page site at $397 a month, and that plan quotes and books. This is not a design-only studio."
      schema={<FaqSchema path={PATH} faqs={faqs} />}
    >
      <section className="border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PaperHeading
            kicker="Web design in Overland Park"
            title="A site for the cities you actually drive."
            lede="Overland Park, Olathe, Shawnee, Lenexa, and Lee’s Summit show up on the pages because that is the map. The number on the site is the number already on the truck, 913 or 816, forwarded so a missed call still reaches the line. We are not ranking you with a promise, and we are not publishing a traffic figure."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              ['The site', 'One page on Starter. A full multi-page site on Pro and Growth. Written around your services, not a generic template with the city name swapped in.'],
              ['The phone', 'AI voice on your existing number. Starter takes the message and texts you the lead, and it texts the caller back when the call was missed.'],
              ['Quoting and booking', 'Pro and Growth. Inside price bands you approve. Anything outside those bands is a message to you, not an invented bid.'],
              ['The CRM', 'Pro and Growth include GoHighLevel with a pipeline and review requests. The custom dashboard is Growth only.'],
            ].map(([title, body]) => (
              <li key={title} className="rounded-2xl border border-[#DDD5C8] bg-[#FBF8F3] p-5">
                <h3 className="font-semibold text-[#1C1915]">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="plans" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PaperHeading
            kicker="The bundle"
            title="The website is priced with the front office."
            lede="Same three plans as the rest of the site. If you only want a brochure and a logo, we are the wrong call."
          />
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {PLANS.map((plan) => (
              <article
                key={plan.name}
                className={`flex flex-col rounded-2xl border p-5 sm:p-6 ${
                  plan.highlight ? 'border-[#1B4332] bg-[#F4FAF6]' : 'border-[#DDD5C8] bg-[#FBF8F3]'
                }`}
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <p className="mt-2 flex items-baseline gap-1">
                  <span className={`${styles.nums} text-4xl font-semibold tracking-tight`}>{plan.priceLabel}</span>
                  <span className="text-sm text-[#5C564E]">{plan.period}</span>
                </p>
                <p className="mt-1 text-sm text-[#5C564E]">One-time setup {plan.setupLabel}</p>
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
          <RelatedLinks omit={PATH} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <PaperHeading kicker="Questions" title="Web design, with the receptionist attached." />
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
    </PaperPage>
  )
}
