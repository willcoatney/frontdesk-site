import Link from 'next/link'
import { Check } from 'lucide-react'
import { display } from '@/components/display-font'
import { ElevenLabsWidgetSlot } from '@/components/elevenlabs-widget-slot'
import { PaperHeading } from '@/components/paper/shell'
import { LeakCalculator } from '@/components/trade/calculator'
import { BeforeAfter } from '@/components/trade/compare'
import { PHONE, PHONE_HREF } from '@/components/trade/constants'
import { ProductDemos } from '@/components/trade/demos'
import { SiteFooter } from '@/components/trade/footer'
import { FaqList } from '@/components/trade/faq'
import { BookDemo, CallWill } from '@/components/trade/links'
import { HomeSchema } from '@/components/trade/schema'
import { StickyCta } from '@/components/trade/sticky'
import styles from '@/components/trade/trade.module.css'
import {
  HOME_DESCRIPTION,
  HOME_OG_ALT,
  HOME_OG_DESCRIPTION,
  HOME_OG_IMAGE,
  HOME_OG_TITLE,
  HOME_PATH,
  HOME_TITLE,
  after,
  before,
  homeCalculator,
  homeDemos,
  homeFaqs,
  homeStats,
  howSteps,
  included,
  tradePicks,
} from '@/content/home'
import { PLANS, PRICING_NOTE } from '@/content/pricing'
import { siteNav } from '@/content/site-nav'
import { pageMeta } from '@/lib/page-meta'

export const dynamic = 'force-static'

export const metadata = pageMeta({
  path: HOME_PATH,
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  ogTitle: HOME_OG_TITLE,
  ogDescription: HOME_OG_DESCRIPTION,
  ogImage: HOME_OG_IMAGE,
  ogAlt: HOME_OG_ALT,
})

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]'

function SeePricing({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/pricing"
      className={`inline-flex min-h-12 items-center justify-center rounded-xl border border-[#DDD5C8] bg-[#FBF8F3] px-5 text-base font-semibold text-[#1C1915] transition-colors hover:border-[#1B4332] ${focus} ${className}`}
    >
      See pricing
    </Link>
  )
}

export default function Page() {
  return (
    <div className={display.variable}>
      <div className={`${styles.page} min-h-screen pb-24 md:pb-0`}>
        <HomeSchema description={HOME_DESCRIPTION} faqs={homeFaqs} />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
        >
          Skip to content
        </a>

        <header className="sticky top-0 z-40 border-b border-[#DDD5C8] bg-[#F3EFE7]/90 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
            <a href="#top" className="flex min-w-0 items-center gap-2.5">
              <span
                className={`${styles.display} grid size-8 shrink-0 place-items-center rounded-lg bg-[#1B4332] text-sm text-[#F6F3EC]`}
                aria-hidden
              >
                Fd
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm leading-tight font-semibold">FrontDesk AI</span>
                <span className="block text-[11px] leading-tight text-[#5C564E]">FrontDesk KC · Olathe</span>
              </span>
            </a>
            <nav className="hidden items-center gap-6 text-sm text-[#3C3832] lg:flex" aria-label="On this page">
              <a href="#who-its-for" className="hover:text-[#1B4332]">
                Trades
              </a>
              <a href="#how-it-works" className="hover:text-[#1B4332]">
                How it works
              </a>
              <a href="#features" className="hover:text-[#1B4332]">
                Included
              </a>
              <Link href="/pricing" className="hover:text-[#1B4332]">
                Pricing
              </Link>
              <a href="#faq" className="hover:text-[#1B4332]">
                FAQ
              </a>
            </nav>
            <BookDemo header className="shrink-0" />
          </div>
        </header>

        <div id="top">
          <section
            id="content"
            className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-12 lg:pt-14 lg:pb-16"
          >
            <div>
              <p className={styles.kicker}>Kansas City owner-operators</p>
              <h1
                className={`${styles.display} mt-3 text-[2.15rem] leading-[1.05] font-medium tracking-[-0.03em] text-[#1C1915] sm:text-5xl lg:text-[3.35rem]`}
              >
                Never miss a call or a lead.
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3C3832] sm:text-lg">
                The website, the phone answering, and the follow-up, handled for one monthly price. Residential or
                commercial. Will Coatney builds it from Olathe, and he is in Kansas City when you need a person.
              </p>
              <div id="top-cta" className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BookDemo className="w-full sm:w-auto" />
                <CallWill className="w-full sm:w-auto" />
                <SeePricing className="w-full sm:w-auto" />
              </div>
              <p className="mt-4 text-sm text-[#5C564E]">
                15 minutes <span aria-hidden>·</span> You keep your number <span aria-hidden>·</span> About a week to go
                live
              </p>
            </div>

            <aside className={`${styles.card} p-5 sm:p-7`}>
              <p className={styles.kicker}>One monthly price</p>
              <ul className="mt-4 divide-y divide-[#E7E0D4]">
                {PLANS.map((plan) => (
                  <li key={plan.id} className="flex items-baseline justify-between gap-3 py-3">
                    <span>
                      <span className="block font-semibold text-[#1C1915]">{plan.name}</span>
                      <span className="block text-sm text-[#5C564E]">Setup {plan.setupLabel}</span>
                    </span>
                    <span className={`${styles.nums} text-right text-lg font-semibold text-[#1C1915]`}>
                      {plan.priceLabel}
                      <span className="block text-xs font-medium text-[#5C564E]">{plan.period}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">
                Month-to-month after launch. No long contract. The{' '}
                <Link href="/pricing" className="font-semibold text-[#1B4332] underline underline-offset-4">
                  pricing page
                </Link>{' '}
                says what each plan does, and what it does not.
              </p>
            </aside>
          </section>
        </div>

        <section id="who-its-for" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="Pick your trade"
              title="Start with the work you actually do."
              lede="Same offer, written around the calls that trade gets. Residential or commercial. If yours is not listed, the demo is where we say whether it fits."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tradePicks.map((trade) => (
                <li key={trade.slug}>
                  <Link
                    href={`/${trade.slug}`}
                    className={`${styles.card} block h-full p-5 transition-colors hover:border-[#1B4332]`}
                  >
                    <h3 className="font-semibold text-[#1C1915]">{trade.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{trade.line}</p>
                    <p className="mt-3 text-sm font-semibold text-[#1B4332]">See {trade.label.toLowerCase()}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="problem" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="The problem"
              title="The call comes in while the work is in your hands."
              lede="You are on a roof, under a sink, or with a customer in front of you. The phone rings. Voicemail does not book the job, and the next company that answers often gets it."
            />
            <dl className="mt-8 grid gap-3 sm:grid-cols-3">
              {homeStats.map((item) => (
                <div key={item.stat} className={`${styles.card} p-5`}>
                  <dt className={`${styles.display} text-5xl tracking-tight text-[#9C4221]`}>{item.stat}</dt>
                  <dd className="mt-3">
                    <p className="font-semibold text-[#1C1915]">{item.label}</p>
                    <p className="mt-2 text-sm leading-relaxed text-[#5C564E]">{item.context}</p>
                  </dd>
                </div>
              ))}
            </dl>

            <div className={`${styles.card} mt-6 p-5 sm:p-7`}>
              <p className={styles.kicker}>The offer</p>
              <h3 className={`${styles.display} mt-2 text-2xl text-[#1C1915] sm:text-3xl`}>
                One price covers the site, the answering, and the follow-up.
              </h3>
              <ul className="mt-4 space-y-3">
                {[
                  'A website, so the number people call has a page behind it.',
                  'An AI voice receptionist on the number you already publish. Starter texts you the lead. Pro and Growth can quote and book inside rules you set.',
                  'Missed-call text-back, so a call you could not take still gets an answer.',
                  'GoHighLevel on Pro and Growth. The custom dashboard is Growth. Will sets it up from Olathe.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#3C3832] sm:text-base">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1B4332]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10">
              <h3 className={`${styles.display} text-2xl text-[#1C1915] sm:text-3xl`}>Same morning. Two endings.</h3>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#3C3832]">
                A fictional day for a Kansas City owner-operator. Not a client story, and not a result we measured.
              </p>
              <div className="mt-6">
                <BeforeAfter before={before} after={after} />
              </div>
            </div>
          </div>
        </section>

        <section id="leak" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="Illustrative"
              title="Put your own week in."
              lede="The result is a model, labeled illustrative. It is not a promise and not a client result. The 62% figure above is a 2016 vendor study of 85 businesses. The calculator starts on an example week, not on that study."
            />
            <div className="mt-8">
              <LeakCalculator config={homeCalculator} />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="How it works"
              title="About a week to go live."
              lede="Three steps. You keep working. Nothing answers a customer until you have heard a test call."
            />
            <ol className="mt-8 max-w-3xl">
              {howSteps.map((step, index, list) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4">
                  <div className="flex flex-col items-center">
                    <span
                      className={`${styles.display} grid size-10 place-items-center rounded-full bg-[#1B4332] text-sm text-white`}
                    >
                      {index + 1}
                    </span>
                    {index < list.length - 1 ? <span className="my-2 w-px flex-1 bg-[#C9BFB0]" aria-hidden /> : null}
                  </div>
                  <div className={index < list.length - 1 ? 'pb-8' : ''}>
                    <h3 className="text-lg font-semibold text-[#1C1915]">{step.title}</h3>
                    <p className="mt-1 text-base leading-relaxed text-[#3C3832]">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="features" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="What's included"
              title="The front office, not a login."
              lede="Website, voice receptionist, follow-up, and the CRM or dashboard the plan actually includes. Edits past the monthly cap are billed hourly or quoted before the work starts."
            />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item.title} className={`${styles.card} p-5`}>
                  <p className="text-[11px] font-semibold tracking-[0.14em] text-[#1B4332] uppercase">{item.plan}</p>
                  <h3 className="mt-2 font-semibold text-[#1C1915]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{item.body}</p>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#3C3832]">
              Nothing says unprofessional like a Gmail address listed as a business email.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">{PRICING_NOTE}</p>
          </div>
        </section>

        <section id="product" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="See it"
              title="A call, a chat, and the day."
              lede="Hearthline Services is fictional, so the sample has a shape without using a real company’s name. Quoting in the call is the Pro sample. The dashboard is the Growth sample."
            />
            <div className="mt-8">
              <ProductDemos demo={homeDemos} />
            </div>
          </div>
        </section>

        <section id="local" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <figure className={`${styles.card} p-5 sm:p-7`}>
              <div className="flex items-center gap-3">
                <span
                  className={`${styles.display} grid size-12 place-items-center rounded-full bg-[#1B4332] text-lg text-[#F6F3EC]`}
                  aria-hidden
                >
                  W
                </span>
                <figcaption>
                  <p className="font-semibold text-[#1C1915]">Will Coatney</p>
                  <p className="text-sm text-[#5C564E]">Olathe, Kansas · FrontDesk KC</p>
                </figcaption>
              </div>
              <div className="mt-5 space-y-3 text-base leading-relaxed text-[#3C3832]">
                <p>
                  The edge is that he is here. FrontDesk is run from Olathe for both sides of the state line. When you
                  call {PHONE}, you get Will, not a queue in another timezone.
                </p>
                <p>
                  He will meet you in the metro for the demo if that is easier than a screen. The setup is done around
                  your company, and you hear the test calls before a customer does.
                </p>
                <p>
                  Overland Park, Olathe, Shawnee, Lenexa, Leawood, Prairie Village, Lee’s Summit, Independence, Liberty,
                  and Blue Springs are the map. 913 and 816 both forward.
                </p>
              </div>
              <p className="mt-5 text-sm text-[#5C564E]">
                <a href={PHONE_HREF} className="font-semibold text-[#1B4332] underline underline-offset-4">
                  Call {PHONE}
                </a>
              </p>
            </figure>

            <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ['Local', 'Built and run from Olathe. A person in Kansas City, not a faceless signup.'],
                ['Reachable', 'The same phone number on this page. You are not opening a ticket to change a sentence.'],
                ['Shows up', 'The 15-minute demo can be a call or a meeting in the metro.'],
                ['Your number', 'Customers keep dialing the number already on the truck and the Google listing.'],
                ['You hear it first', 'Test calls happen before a customer ever reaches the line.'],
                ['Month to month', 'After launch there is no long contract. Cancel anytime.'],
              ].map(([title, body]) => (
                <div key={title} className={`${styles.card} p-4`}>
                  <h3 className="font-semibold text-[#1C1915]">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#3C3832]">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-6xl">
            <PaperHeading
              kicker="Pricing"
              title="The prices are the prices."
              lede="Starter is $197 a month. Pro is $397 a month. Growth starts at $797 a month and is quoted up from there. Setup is one-time. This is the summary. The pricing page is the full version."
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
                    <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-[#1B4332] uppercase">
                      {plan.badge}
                    </p>
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
                  <BookDemo className="mt-6 w-full" />
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">{PRICING_NOTE}</p>
            <aside className={`${styles.card} mt-4 p-5`}>
              <p className={styles.kicker}>First five clients</p>
              <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">
                You can ask about a founding-client rate on the demo. The price is not published here. It is an offer,
                not a fourth plan.
              </p>
            </aside>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <SeePricing className="w-full sm:w-auto" />
              <BookDemo className="w-full sm:w-auto" />
            </div>
            <nav aria-label="Related pages" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {siteNav.map((item) => (
                <Link key={item.href} href={item.href} className="text-[#1B4332] underline underline-offset-4">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </section>

        <section id="faq" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
          <div className="mx-auto max-w-3xl">
            <PaperHeading kicker="Questions" title="Before you book the 15 minutes." />
            <div className="mt-6">
              <FaqList faqs={homeFaqs} />
            </div>
          </div>
        </section>

        <section id="final-cta" className="scroll-mt-24 px-4 pb-16 sm:px-6">
          <div id="book-demo" className="mx-auto max-w-6xl rounded-3xl bg-[#1B4332] px-5 py-10 text-[#F6F3EC] sm:px-10 sm:py-14">
            <h2 className={`${styles.display} text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-5xl`}>
              Fifteen minutes. Your number. Your week.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D7E6DC] sm:text-lg">
              Bring the calls you missed this week. On the demo we say which plan fits, or that it does not. No slide deck,
              and no invented close rate.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookDemo tone="inverse" className="w-full sm:w-auto" />
              <CallWill tone="inverse" className="w-full sm:w-auto" />
            </div>
            <p className="mt-5 text-sm text-[#D7E6DC]">
              <Link href="/pricing" className="font-semibold text-white underline underline-offset-4">
                See pricing
              </Link>
              <span aria-hidden> · </span>
              Overland Park, Olathe, Shawnee, Lenexa, Lee’s Summit, and the rest of the Kansas City metro.
            </p>
          </div>
        </section>

        {/* ElevenLabs chat/voice widget mounts here when the agent embed is ready. */}
        <ElevenLabsWidgetSlot />

        <SiteFooter />
        <StickyCta />
      </div>
    </div>
  )
}
