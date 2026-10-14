import Link from 'next/link'
import { Check } from 'lucide-react'
import { BeforeAfter } from './compare'
import { LeakCalculator } from './calculator'
import { BOOK_HREF, PHONE, PHONE_HREF } from './constants'
import { ProductDemos } from './demos'
import { FaqList } from './faq'
import { BookDemo, CallWill } from './links'
import { StickyCta } from './sticky'
import styles from './cleaning-v2.module.css'

const STATS = [
  {
    stat: '62%',
    label: 'of calls to small businesses go unanswered',
    context:
      'That is more than half of inbound leads going to voicemail — or to the next cleaner on Google.',
  },
  {
    stat: '85%',
    label: "of callers won't try again if they can't reach you",
    context: 'One missed call does not just lose a call. It loses the recurring client. Permanently.',
  },
  {
    stat: '$200+',
    label: 'average revenue lost per missed call',
    context:
      'A company missing 5 calls a day is watching $1,000+ walk out the door. Daily. A biweekly client is worth far more than one visit.',
  },
]

const JOBS = [
  {
    title: 'Recurring, biweekly',
    body: 'Weekly or every other week, baths, pets, and the city. It books the route.',
  },
  {
    title: 'Move-outs',
    body: 'Beds, baths, condition, and the day they need the keys. It quotes inside your band or holds the slot.',
  },
  {
    title: 'Deep cleans',
    body: 'What “deep” means for your company, so a one-time clean is not priced like a maintenance visit.',
  },
  {
    title: 'Commercial walkthroughs',
    body: 'No made-up bid. It captures the building and books the walk. You price it after you see it.',
  },
  {
    title: 'Crew dispatch',
    body: 'Teams, travel buffers, and a day you can read on your phone between houses.',
  },
  {
    title: 'Review requests',
    body: 'When a job is marked done, the customer gets a text in wording you approved.',
  },
]

const INCLUDED = [
  'A marketing website for the services you actually sell, with quote forms that land in the same pipeline as the phone',
  'A voice receptionist that answers every call, quotes inside your bands, and books estimates and cleans',
  'AI chat on the site and text on the business number, with the same answers',
  'A dashboard for leads, quotes, the crew calendar, recurring clients, and review requests',
  'Setup with you: service area, crew rules, and test calls you hear before anything goes live',
]

const TIMELINE = [
  {
    when: 'Day one',
    title: 'A 30-minute demo',
    body: 'Your services, your price bands, your crews. No slide deck. You leave knowing whether it fits.',
  },
  {
    when: 'The days after',
    title: 'We build it around the company',
    body: 'The number is forwarded, the site goes up, and the rules are loaded. You listen to test calls before a customer does.',
  },
  {
    when: 'About two weeks',
    title: 'Live, then tuned',
    body: 'Real calls book onto the calendar. We tighten the wording on the first jobs while you keep cleaning.',
  },
]

const PLANS = [
  {
    name: 'Starter',
    price: '$597',
    desc: 'For an owner-operator or a small residential crew that is tired of missing calls.',
    highlight: false,
    bullets: [
      'AI voice receptionist (up to 300 calls/mo)',
      'AI website chat and business-number text',
      'Calendar booking for estimates and cleans',
      'Conversations inbox',
      'Customer contacts',
      '1 location',
      '30-day onboarding support',
    ],
  },
  {
    name: 'Growth',
    price: '$1,197',
    desc: 'The system on this page: crews, pipeline, recurring clients, and reviews in one place.',
    highlight: true,
    bullets: [
      'Everything in Starter',
      'Unlimited calls',
      'Quotes, recurring clients, and reporting',
      'Multi-crew calendar',
      'Rebooking and review-request texts',
      'Monthly strategy call with us',
      'Priority support — direct line',
    ],
  },
]

function SectionHeading({
  kicker,
  title,
  lede,
}: {
  kicker: string
  title: string
  lede?: string
}) {
  return (
    <div className="max-w-2xl">
      <p className={styles.kicker}>{kicker}</p>
      <h2
        className={`${styles.display} mt-2 text-[1.85rem] leading-[1.12] font-medium tracking-[-0.03em] text-[#1C1915] sm:text-4xl`}
      >
        {title}
      </h2>
      {lede ? <p className="mt-3 text-base leading-relaxed text-[#3C3832] sm:text-lg">{lede}</p> : null}
    </div>
  )
}

export default function CleaningV2Page() {
  return (
    <div className={`${styles.page} min-h-screen pb-24 md:pb-0`}>
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
            <Link href="/" className="hover:text-[#1B4332]">Home</Link>
            <a href="#leak" className="hover:text-[#1B4332]">The leak</a>
            <a href="#how" className="hover:text-[#1B4332]">How it works</a>
            <a href="#product" className="hover:text-[#1B4332]">See it</a>
            <a href="#offer" className="hover:text-[#1B4332]">The package</a>
            <a href="#faq" className="hover:text-[#1B4332]">FAQ</a>
          </nav>
          <BookDemo className="shrink-0 px-3.5 sm:px-5" />
        </div>
      </header>

      <div id="top">
        <section id="content" className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-12 sm:px-6 sm:pt-12 lg:grid-cols-2 lg:gap-12 lg:pt-14 lg:pb-16">
          <div>
            <p className={styles.kicker}>For Kansas City cleaning companies</p>
            <h1
              className={`${styles.display} mt-3 text-[2.15rem] leading-[1.05] font-medium tracking-[-0.03em] text-[#1C1915] sm:text-5xl lg:text-[3.35rem]`}
            >
              More booked cleans, without hiring a receptionist.
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[#3C3832] sm:text-lg">
              Will builds the front office: a marketing website, a voice line that answers every call and
              quotes and books, chat and text that reply instantly, and one dashboard for leads, crews,
              recurring clients, and reviews.
            </p>
            <div id="top-cta" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <BookDemo className="w-full sm:w-auto">Book a Demo</BookDemo>
              <CallWill className="w-full sm:w-auto" />
            </div>
            <p className="mt-4 text-sm text-[#5C564E]">
              30-minute demo <span aria-hidden>·</span> You keep your number <span aria-hidden>·</span> Live in
              about 2 weeks
            </p>
          </div>

          <figure>
            <div className="overflow-hidden rounded-2xl border border-[#DDD5C8] bg-[#F3EFE7] shadow-[0_28px_60px_-36px_rgba(28,25,21,0.55)]">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/videos/frontdesk-cleaning-v2-film-poster.jpg"
                width={1920}
                height={1080}
                aria-label="Narrated film: a night at a fictional Kansas City cleaning company, with and without FrontDesk AI"
                className="aspect-video h-auto w-full bg-[#F3EFE7]"
              >
                <source src="/videos/frontdesk-cleaning-v2-film.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <figcaption className="mt-3 text-sm leading-relaxed text-[#5C564E]">
              About 90 seconds, narrated. A 9:47 PM call, a late website chat, and a commercial walkthrough.
              Dollar figures in the film are illustrative. Sparkle KC Cleaning is fictional.
            </figcaption>
          </figure>
        </section>
      </div>

      <section id="leak" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="The leak"
            title="Every missed call is a missed clean."
            lede="You are in a house or on a floor. The person who would answer is holding a vacuum. The next customer does not wait."
          />
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {STATS.map((item) => (
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
            <h3 className={`${styles.display} text-2xl text-[#1C1915] sm:text-3xl`}>
              Put your own week in.
            </h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-[#3C3832]">
              Calls, the share you miss, a typical job, and what a recurring client is worth. The result is
              illustrative. It is there so the cost is yours, not a generic statistic.
            </p>
            <div className="mt-6">
              <LeakCalculator />
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="How it works"
            title="Call, chat, or text. Then it is on the calendar."
            lede="Three steps. The same system handles the phone, the website, and the crew."
          />
          <ol className="mt-8 max-w-3xl">
            {[
              {
                n: '1',
                title: 'They reach you',
                body: 'A call to the number on the van. A chat on the website. A text to the business line. Nights and Sundays included.',
                extra: (
                  <ul className="flex flex-wrap gap-2" aria-label="Ways people reach you">
                    {['Call', 'Website chat', 'Text'].map((item) => (
                      <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-[#1B4332]">
                        {item}
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                n: '2',
                title: 'The AI quotes and books',
                body: 'It asks beds, baths, pets, city, and how often. It quotes inside the ranges you set. If the job needs a walkthrough, it books that instead of inventing a price.',
                extra: (
                  <p className="rounded-xl border border-[#DDD5C8] bg-white px-3 py-2 text-sm text-[#1C1915]">
                    Sample only · biweekly · $145–$175 · Thursday 6:30 PM
                  </p>
                ),
              },
              {
                n: '3',
                title: 'The dashboard has the crew',
                body: 'The estimate or the clean lands on the calendar, with the team and a buffer between houses. Recurring clients stay visible. A review text goes out when the job is marked done.',
                extra: (
                  <ul className="space-y-1.5 text-sm">
                    <li className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                      <span>8:30 · Brookside recurring</span>
                      <span className="font-semibold text-[#1B4332]">Team B</span>
                    </li>
                    <li className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                      <span>11:00 · Shawnee move-out</span>
                      <span className="font-semibold text-[#1B4332]">Team A</span>
                    </li>
                  </ul>
                ),
              },
            ].map((step, index, list) => (
              <li key={step.n} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-4">
                <div className="flex flex-col items-center">
                  <span className={`${styles.display} grid size-10 place-items-center rounded-full bg-[#1B4332] text-sm text-white`}>
                    {step.n}
                  </span>
                  {index < list.length - 1 ? <span className="my-2 w-px flex-1 bg-[#C9BFB0]" /> : null}
                </div>
                <div className={index < list.length - 1 ? 'pb-8' : ''}>
                  <h3 className="text-lg font-semibold text-[#1C1915]">{step.title}</h3>
                  <p className="mt-1 text-base leading-relaxed text-[#3C3832]">{step.body}</p>
                  <div className="mt-3">{step.extra}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="Before and after"
            title="Same night. Two different mornings."
            lede="A fictional shop, Sparkle KC Cleaning, so you can see the shape of the day without borrowing a real company’s name."
          />
          <div className="mt-8">
            <BeforeAfter />
          </div>
        </div>
      </section>

      <section id="product" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="See it"
            title="The phone, the chat, and the crew day."
            lede="Tap through a sample call, a website chat, and the dashboard. Built in the page, not a screenshot. Sparkle KC Cleaning is fictional."
          />
          <div className="mt-8">
            <ProductDemos />
          </div>
        </div>
      </section>

      <section id="built" className="scroll-mt-24 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            kicker="Built for cleaning"
            title="The jobs you actually run."
            lede="Residential routes, commercial nights, or both. The line knows the difference."
          />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {JOBS.map((job) => (
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
            lede="Not a login and a tutorial. Will sets it up around your company. Live in about two weeks."
          />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className={`${styles.card} p-5 sm:p-6`}>
              <h3 className="text-lg font-semibold">What is included</h3>
              <ul className="mt-4 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-[#3C3832]">
                    <Check className="mt-0.5 size-4 shrink-0 text-[#1B4332]" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <ol className={`${styles.card} p-5 sm:p-6`}>
              {TIMELINE.map((step, index) => (
                <li key={step.title} className={index < TIMELINE.length - 1 ? 'mb-5 border-b border-[#E7E0D4] pb-5' : ''}>
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
              These are the rates already on the FrontDesk offer. The demo confirms which one fits. If your
              crews or call volume sit outside them, the price is a custom quote after the 30-minute demo.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {PLANS.map((plan) => (
                <article
                  key={plan.name}
                  className={`rounded-2xl border p-5 sm:p-6 ${
                    plan.highlight ? 'border-[#1B4332] bg-[#F4FAF6]' : 'border-[#DDD5C8] bg-[#FBF8F3]'
                  }`}
                >
                  {plan.highlight ? (
                    <p className="mb-3 text-[11px] font-semibold tracking-[0.14em] text-[#1B4332] uppercase">
                      The full system
                    </p>
                  ) : null}
                  <h3 className="text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 flex items-baseline gap-1">
                    <span className={`${styles.nums} text-4xl font-semibold tracking-tight`}>{plan.price}</span>
                    <span className="text-sm text-[#5C564E]">/ month</span>
                  </p>
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
            <p className="mt-4 text-sm leading-relaxed text-[#5C564E]">
              All plans include a one-time setup fee of $497. Month-to-month after launch. Cancel anytime.
            </p>
          </div>
        </div>
      </section>

      <section className="px-4 py-14 sm:px-6 sm:py-20">
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
                <p className="text-sm text-[#5C564E]">Olathe, Kansas</p>
              </figcaption>
            </div>
            <blockquote className="mt-5 space-y-3 text-base leading-relaxed text-[#3C3832]">
              <p>
                I put this together for cleaning company owners around Kansas City. You are usually in a house,
                or on a floor, when the next customer calls. They do not leave a voicemail. They call the next
                company.
              </p>
              <p>
                The demo is half an hour, on a cleaning company, with your services and your crews. If it is
                not a fit, say so. I would rather you know what the missed calls are worth than sit through a
                pitch.
              </p>
            </blockquote>
            <p className={`${styles.display} mt-4 text-lg text-[#1C1915]`}>— Will</p>
          </figure>

          <div className="grid content-start gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {[
              ['Local', 'Built and run from Olathe, for both sides of the state line.'],
              ['Your number', 'Customers keep dialing the number on the van and the Google listing.'],
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
            <FaqList />
          </div>
        </div>
      </section>

      <section id="final-cta" className="scroll-mt-24 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#1B4332] px-5 py-10 text-[#F6F3EC] sm:px-10 sm:py-14">
          <h2 className={`${styles.display} text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-5xl`}>
            See it on your routes.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D7E6DC] sm:text-lg">
            Thirty minutes with Will. A cleaning company on the screen, your services in the conversation. If
            it is not a fit, you still leave knowing what the missed calls are worth.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a
              href={BOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-[#F6F3EC] px-5 text-base font-semibold text-[#1B4332] hover:bg-white"
            >
              Book a Demo
            </a>
            <a
              href={PHONE_HREF}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 px-5 text-base font-semibold text-white hover:bg-white/10"
            >
              Call {PHONE}
            </a>
          </div>
          <p className="mt-5 text-sm text-[#D7E6DC]">
            Overland Park, Olathe, Shawnee, Lenexa, Lee’s Summit, and the rest of the Kansas City metro.
          </p>
        </div>
      </section>

      <footer className="border-t border-[#E7E0D4] px-4 py-8 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 text-sm text-[#5C564E] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-[#1C1915]">
            FrontDesk AI <span className="font-normal text-[#5C564E]">· FrontDesk KC · Olathe, KS</span>
          </p>
          <p>© {new Date().getFullYear()} FrontDesk KC</p>
          <p className="flex flex-wrap gap-4">
            <Link href="/" className="underline underline-offset-4">
              All service businesses
            </Link>
            <a href={PHONE_HREF} className="font-semibold text-[#1B4332] underline underline-offset-4">
              {PHONE}
            </a>
          </p>
        </div>
      </footer>

      <StickyCta />
    </div>
  )
}
