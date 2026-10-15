import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { TradePage } from '@/components/trade/page'
import { SITE } from '@/components/trade/constants'
import { getTrade, trades } from '@/content/trades'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return trades.map((trade) => ({ trade: trade.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ trade: string }>
}): Promise<Metadata> {
  const { trade: slug } = await params
  const trade = getTrade(slug)
  if (!trade) return {}
  const { metadata } = trade
  const url = `${SITE}/${trade.slug}`
  const image = `${SITE}${metadata.ogImage}`
  return {
    title: { absolute: metadata.title },
    description: metadata.description,
    alternates: { canonical: `/${trade.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      locale: 'en_US',
      type: 'website',
      url,
      siteName: 'FrontDesk KC',
      images: [{ url: image, width: 1200, height: 630, alt: metadata.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.ogTitle,
      description: metadata.ogDescription,
      images: [image],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ trade: string }> }) {
  const { trade: slug } = await params
  const trade = getTrade(slug)
  if (!trade) notFound()
  return <TradePage trade={trade} />
}
