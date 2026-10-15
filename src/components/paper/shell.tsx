import type { ReactNode } from 'react'
import Link from 'next/link'
import { siteNav } from '@/content/site-nav'
import { SiteFooter } from '@/components/trade/footer'
import { BOOK_HREF, PHONE, PHONE_HREF } from '@/components/trade/constants'
import { BookDemo, CallWill } from '@/components/trade/links'
import { StickyCta } from '@/components/trade/sticky'
import styles from '@/components/trade/trade.module.css'

const RELATED = [
  { href: '/pricing', label: 'Pricing' },
  { href: '/missed-call-text-back', label: 'Missed-call text-back' },
  { href: '/ai-receptionist-vs-answering-service', label: 'AI receptionist vs answering service' },
  { href: '/websites', label: 'Kansas City web design' },
  { href: '/plumbers', label: 'Plumbers' },
  { href: '/hvac', label: 'HVAC' },
  { href: '/roofing', label: 'Roofing' },
  { href: '/cleaning', label: 'Cleaning' },
] as const

export function RelatedLinks({ omit }: { omit: string }) {
  return (
    <nav aria-label="Related pages" className="mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
      {RELATED.filter((item) => item.href !== omit).map((item) => (
        <Link key={item.href} href={item.href} className="text-[#1B4332] underline underline-offset-4">
          {item.label}
        </Link>
      ))}
    </nav>
  )
}

export function PaperHeading({ kicker, title, lede }: { kicker: string; title: string; lede?: string }) {
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

export function PaperPage({
  currentHref,
  kicker,
  title,
  lede,
  schema,
  children,
}: {
  currentHref: string
  kicker: string
  title: string
  lede: string
  schema?: ReactNode
  children: ReactNode
}) {
  return (
    <div className={`${styles.page} min-h-screen pb-24 md:pb-0`}>
      {schema}
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-3 focus:py-2"
      >
        Skip to content
      </a>

      <header className="sticky top-0 z-40 border-b border-[#DDD5C8] bg-[#F3EFE7]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <Link href="/" className="flex min-w-0 items-center gap-2.5">
            <span className={`${styles.display} grid size-8 shrink-0 place-items-center rounded-lg bg-[#1B4332] text-sm text-[#F6F3EC]`} aria-hidden>
              Fd
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm leading-tight font-semibold">FrontDesk AI</span>
              <span className="block text-[11px] leading-tight text-[#5C564E]">FrontDesk KC · Olathe</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm text-[#3C3832] lg:flex" aria-label="Pages">
            <Link href="/" className="hover:text-[#1B4332]">Home</Link>
            {siteNav.map((item) =>
              item.href === currentHref ? (
                <span key={item.href} aria-current="page" className="font-semibold text-[#1C1915]">
                  {item.label}
                </span>
              ) : (
                <Link key={item.href} href={item.href} className="hover:text-[#1B4332]">
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <BookDemo className="shrink-0 px-3.5 sm:px-5" />
        </div>
      </header>

      <div id="top">
        <section id="content" className="mx-auto max-w-6xl px-4 pt-8 pb-10 sm:px-6 sm:pt-12 lg:pt-14">
          <p className={styles.kicker}>{kicker}</p>
          <h1 className={`${styles.display} mt-3 max-w-3xl text-[2.15rem] leading-[1.05] font-medium tracking-[-0.03em] text-[#1C1915] sm:text-5xl`}>
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3C3832] sm:text-lg">{lede}</p>
          <div id="top-cta" className="mt-6 flex flex-col gap-3 sm:flex-row">
            <BookDemo className="w-full sm:w-auto">Book a Demo</BookDemo>
            <CallWill className="w-full sm:w-auto" />
          </div>
          <p className="mt-4 text-sm text-[#5C564E]">
            Built in Olathe <span aria-hidden>·</span> 913 and 816 <span aria-hidden>·</span> Month-to-month after launch
          </p>
        </section>
      </div>

      {children}

      <section id="final-cta" className="scroll-mt-24 px-4 pb-16 sm:px-6">
        <div className="mx-auto max-w-6xl rounded-3xl bg-[#1B4332] px-5 py-10 text-[#F6F3EC] sm:px-10 sm:py-14">
          <h2 className={`${styles.display} text-[2rem] leading-[1.1] font-medium tracking-[-0.03em] sm:text-5xl`}>
            Thirty minutes. Your number. Your week.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#D7E6DC] sm:text-lg">
            The demo is where we match a plan to the calls you actually get. No slide deck, and no invented close rate.
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

      <SiteFooter currentHref={currentHref} />
      <StickyCta />
    </div>
  )
}
