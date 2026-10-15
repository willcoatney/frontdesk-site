import Link from 'next/link'
import { Check } from 'lucide-react'
import { PLANS, PRICING_NOTE } from '@/content/pricing'
import type { StepExtra, TradeConfig } from '@/content/trades/types'
import { BeforeAfter } from './compare'
import { LeakCalculator } from './calculator'
import { SiteFooter } from './footer'
import { ProductDemos } from './demos'
import { FaqList } from './faq'
import { BookDemo, CallWill } from './links'
import { TradeSchema } from './schema'
import { StickyCta } from './sticky'
import styles from './trade.module.css'

const EVERY_PLAN = [
  'Done-for-you setup around your company. Not a blank login and a tutorial.',
  'Your existing business number, forwarded. Customers keep dialing the number they already have.',
  'Test calls you hear before a customer does.',
  'Month-to-month after launch. Cancel anytime.',
  'Site edits inside the monthly allowance. Extra edits are billed hourly or quoted before we do them.',
]

function timeline(keepDoing: string) {
  return [
    {
      when: 'Day one',
      title: 'A 30-minute demo',
      body: 'Your services, your price bands, and how you want calls handled. No slide deck. You leave knowing whether it fits.',
    },
    {
      when: 'The days after',
      title: 'We build it around the company',
      body: 'The number is forwarded, the site goes up, and the rules are loaded. You listen to test calls before a customer does.',
    },
    {
      when: 'About two weeks',
      title: 'Live, then tuned',
      body: `Real calls come in. We tighten the wording on the first jobs while you keep ${keepDoing}.`,
    },
  ]
}

function SectionHeading({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
  return (
    <div className="max-w-2xl">
      <p className={styles.kicker}>{kicker}</p>
      <h2 className={`${styles.display} mt-2 text-[1.85rem] leading-[1.12] font-medium tracking-[-0.03em] text-[#1C1915] sm:text-4xl`}>
        {title}
      </h2>
      {lede ? <p className="mt-3 text-base leading-relaxed text-[#3C3832] sm:text-lg">{lede}</p> : null}
    </div>
  )
}

function StepExtraView({ extra }: { extra: StepExtra }) {
  if (extra.type === 'pills') {
    return (
      <ul className="flex flex-wrap gap-2" aria-label={extra.label}>
        {extra.items.map((item) => (
          <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#1B4332]">
            {item}
          </li>
        ))}
      </ul>
    )
  }
  if (extra.type === 'note') {
    return <p className="rounded-xl border border-[#DDD5C8] bg-white px-3 py-2 text-sm text-[#1C1915]">{extra.text}</p>
  }
  return (
    <ul className="space-y-1.5 text-sm">
      {extra.rows.map((row) => (
        <li key={row.left} className="flex items-center justify-between gap-3 rounded-lg bg-white px-3 py-2">
          <span>{row.left}</span>
          <span className="shrink-0 font-semibold text-[#1B4332]">{row.right}</span>
        </li>
      ))}
    </ul>
  )
}

export function TradePage({ trade }: { trade: TradeConfig }) {
  const steps = timeline(trade.keepDoing)
  return (
    <div className={`${styles.page} min-h-screen pb-24 md:pb-0`}>
      <TradeSchema trade={trade} />
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#DDD5C8] bg-[#F3EFE7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <a href="#top" className="flex min-w-0 items-center gap-2.5">
            <span className={`${styles.display} grid size-8 shrink-0 place-items-center rounded-lg bg-[#1B4332] text-sm text-[#F6F3EC]`} aria-hidden>
              Fd
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm leading-tight font-semibold">FrontDesk AI</span>
              <span className="block text-[11px] leading-tight text-[#5C564E]">
                FrontDesk KC · Olathe · {trade.navLabel}
              </span>
            </span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-[#3C3832] lg:flex" aria-label="On this page">
            <Link href="/" className="hover:text-[#1B4332]">Home</Link>
            <a href="#leak" className="hover:text-[#1B4332]">The leak</a>
            <a href="#how" className="hover:text-[#1B4332]">How it works</a>
            <a href="#product" className="hover:text-[#1B4332]">See it</a>
            <a href="#offer" className="hover:text-[#1B4332]">Pricing</a>
            <a href="#faq" className="hover:text-[#1B4332]">FAQ</a>
          </nav>
          <BookDemo header className="shrink-0" />
        </div>
      </header>

      <div id="top">
        <section id="content" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:grid-cols-2 lg:gap-12 lg:pt-14 lg:pb-16">
          <div>
            <p className={styles.kicker}>{trade.hero.kicker}</p>
            <h1 className={`${styles.display} mt-3 text-[2.15rem] leading-[1.05] font-medium tracking-[-0.03em] text-[#1C1915] sm:text-5xl lg:text-[3.35rem]`}>
              {trade.hero.title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3C3832] sm:text-lg">{trade.hero.lede}</p>
            <div id="top-cta" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookDemo className="w-full sm:w-auto" />
              <CallWill className="w-full sm:w-auto" />
            </div>
            <p className="mt-4 text-sm text-[#5C564E]">
              30-minute demo <span aria-hidden>·</span> You keep your number <span aria-hidden>·</span> Live in about 2 weeks
            </p>
          </div>

          {trade.film ? (
            <figure>
              <div className="overflow-hidden rounded-2xl border border-[#DDD5C8] bg-[#F3EFE7] shadow-[0_28px_60px_-36px_rgba(28,25,21,0.55)]">
                <video
                  controls
                  playsInline
                  preload="metadata"
                  poster={trade.film.poster}
                  width={trade.film.width}
                  height={trade.film.height}
                  aria-label={trade.film.aria}
                  className="aspect-video h-auto w-full bg-[#F3EFE7]"
                >
                  <source src={trade.film.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <figcaption className="mt-3 text-sm leading-relaxed text-[#5C564E]">{trade.film.caption}</figcaption>
            </figure>
          ) : trade.heroAside ? (
            <aside className={`${styles.card} p-5 sm:p-7`}>
              <p className={styles.kicker}>{trade.heroAside.kicker}</p>
              <ul className="mt-4 space-y-4">
                {trade.heroAside.lines.map((line) => (
                  <li key={line} className="flex gap-3 text-base leading-relaxed text-[#1C1915]">
                    <span className="mt-2 size-2 shrink-0 rounded-full bg-[#9C4221]" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-relaxed text-[#5C564E]">{trade.heroAside.footnote}</p>
            </aside>
          ) : null}
        </section>
      </div>

      <section id="leak" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading kicker="The leak" title={trade.leakTitle} lede={trade.leakLede} />
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {trade.stats.map((item) => (
              <div key={item.stat} className={`${styles.card} p-5`}>
                <dt className={`${styles.display} text-5xl tracking-tight text-[#9C4221]`}>{item.stat}</dt>
                <dd className="mt-3">
                  <p className="font-semibold text-[#1C1915]">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C564E]">{item.context}</p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-10">
            <h3 className={`${styles.display} text-2xl text-[#1C1915] sm:text-3xl`}>Put your own week in.</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#3C3832]">{trade.calculatorIntro}</p>
            <div className="mt-6">
              <LeakCalculator config={trade.calculator} />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="How it works"
            title="Call, chat, or text. Then someone has the lead."
            lede={trade.howLede}
          />
          <ol className="mt-8 max-w-3xl">
            {trade.steps.map((step, index, list) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4">
                <div className="flex flex-col items-center">
                  <span className={`${styles.display} grid size-10 place-items-center rounded-full bg-[#1B4332] text-sm text-white`}>
                    {index + 1}
                  </span>
                  {index < list.length - 1 ? <span className="my-2 w-px flex-1 bg-[#C9BFB0]" /> : null}
                </div>
                <div className={index < list.length - 1 ? 'pb-8' : ''}>
                  <h3 className="text-lg font-semibold text-[#1C1915]">{step.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-[#3C3832]">{step.body}</p>
                  <div className="mt-3">
                    <StepExtraView extra={step.extra} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading kicker="Before and after" title="Same day. Two different endings." lede={trade.beforeAfterLede} />
          <div className="mt-8">
            <BeforeAfter before={trade.before} after={trade.after} />
          </div>
        </div>
      </section>

      <section id="product" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading kicker="See it" title="The phone, the chat, and the day." lede={trade.demosLede} />
          <div className="mt-8">
            <ProductDemos demo={trade.demos} />
          </div>
        </div>
      </section>

      <section id="built" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading kicker={trade.jobsKicker} title={trade.jobsTitle} lede={trade.jobsLede} />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {trade.jobs.map((job) => (
              <li key={job.title} className={`${styles.card} p-5`}>
                <h3 className="font-semibold text-[#1C1915]">{job.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#3C3832]">{job.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="offer" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="The package"
            title="A front office, done for you."
            lede="Not a login and a tutorial. Will sets it up around your company. Live in about two weeks. The plan decides whether the line quotes, and whether you get the CRM or the custom dashboard."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className={`${styles.card} p-5 sm:p-6`}>
              <h3 className="text-lg font-semibold">On every plan</h3>
              <ul className="mt-4 space-y-3">
                {EVERY_PLAN.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#3C3832]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1B4332]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ol className={`${styles.card} p-5 sm:p-6`}>
              {steps.map((step, index) => (
                <li key={step.title} className={index < steps.length - 1 ? 'mb-5 border-b border-[#E7E0D4] pb-5' : ''}>
                  <p className={styles.kicker}>{step.when}</p>
                  <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-[#3C3832]">{step.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-10">
            <h3 className={`${styles.display} text-2xl sm:text-3xl`}>Published plans</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#3C3832]">
              The same three plans on every FrontDesk page. The demo confirms which one fits. If the company sits
              outside them, the price is a custom quote after the 30-minute demo.
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-3">
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
                  <BookDemo className="mt-6 w-full" />
                </article>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">{PRICING_NOTE}</p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <figure className={`${styles.card} p-5 sm:p-7`}>
            <div className="flex items-center gap-3">
              <span className={`${styles.display} grid size-12 place-items-center rounded-full bg-[#1B4332] text-lg text-[#F6F3EC]`} aria-hidden>
                W
              </span>
              <figcaption>
                <p className="font-semibold text-[#1C1915]">Will Coatney</p>
                <p className="text-sm text-[#5C564E]">Olathe, Kansas</p>
              </figcaption>
            </div>
            <blockquote className="mt-5 space-y-3 text-base leading-relaxed text-[#3C3832]">
              {trade.will.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </blockquote>
            <p className={`${styles.display} mt-4 text-lg text-[#1C1915]`}>— Will</p>
          </figure>

          <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Local', 'Built and run from Olathe, for both sides of the state line.'],
              ['Your number', `Customers keep dialing the number on the ${trade.vehicle} and the Google listing.`],
              ['You hear it first', 'Test calls happen before a customer ever reaches the line.'],
              ['Month to month', 'After launch, you are not locked into a long contract.'],
            ].map(([title, body]) => (
              <div key={title} className={`${styles.card} p-4`}>
                <h3 className="font-semibold text-[#1C1915]">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#3C3832]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <SectionHeading kicker="Questions" title="The objections, answered." />
          <div className="mt-6">
            <FaqList faqs={trade.faqs} />
          </div>
        </div>
      </section>

      <section id="final-cta" className="scroll-mt-24 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#1B4332] px-5 py-10 text-[#F6F3EC] sm:px-10 sm:py-14">
          <h2 className={`${styles.display} text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-5xl`}>
            {trade.finalTitle}
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D7E6DC] sm:text-lg">{trade.finalBody}</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookDemo tone="inverse" className="w-full sm:w-auto" />
            <CallWill tone="inverse" className="w-full sm:w-auto" />
          </div>
          <p className="mt-5 text-sm text-[#D7E6DC]">
            Overland Park, Olathe, Shawnee, Lenexa, Lee’s Summit, and the rest of the Kansas City metro.
          </p>
        </div>
      </section>

      <SiteFooter currentSlug={trade.slug} />

      <StickyCta />
    </div>
  )
}
