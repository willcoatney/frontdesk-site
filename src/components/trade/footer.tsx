import Link from 'next/link'
import { siteNav } from '@/content/site-nav'
import { tradeNav } from '@/content/trades/nav'
import { BookDemo, CallWill } from './links'

export function SiteFooter({
  currentSlug,
  currentHref,
}: {
  currentSlug?: string
  currentHref?: string
}) {
  return (
    <footer className="border-t border-[#E7E0D4] px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <nav aria-label="Pages" className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {siteNav.map((item) =>
            item.href === currentHref ? (
              <span key={item.href} aria-current="page" className="font-semibold text-[#1C1915]">
                {item.label}
              </span>
            ) : (
              <Link key={item.href} href={item.href} className="text-[#1B4332] underline underline-offset-4">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <nav aria-label="Trades" className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
          {tradeNav.map((item) =>
            item.slug === currentSlug ? (
              <span key={item.slug} aria-current="page" className="font-semibold text-[#1C1915]">
                {item.label}
              </span>
            ) : (
              <Link key={item.slug} href={`/${item.slug}`} className="text-[#1B4332] underline underline-offset-4">
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <BookDemo className="w-full sm:w-auto" />
          <CallWill className="w-full sm:w-auto" />
        </div>
        <div className="mt-4 flex flex-col gap-3 text-sm text-[#5C564E] sm:flex-row sm:items-center sm:justify-between">
          <p className="font-semibold text-[#1C1915]">
            FrontDesk AI <span className="font-normal text-[#5C564E]">· FrontDesk KC · Olathe, KS</span>
          </p>
          <p>© {new Date().getFullYear()} FrontDesk KC</p>
          <p>
            <Link href="/" className="underline underline-offset-4">
              All service businesses
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
