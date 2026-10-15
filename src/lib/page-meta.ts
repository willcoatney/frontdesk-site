import type { Metadata } from 'next'
import { SITE } from '@/components/trade/constants'

export function pageMeta(opts: {
  path: string
  title: string
  description: string
  ogTitle: string
  ogDescription: string
  ogImage: string
  ogAlt: string
}): Metadata {
  const url = `${SITE}${opts.path}`
  const image = `${SITE}${opts.ogImage}`
  return {
    title: { absolute: opts.title },
    description: opts.description,
    alternates: { canonical: opts.path },
    robots: { index: true, follow: true },
    openGraph: {
      title: opts.ogTitle,
      description: opts.ogDescription,
      locale: 'en_US',
      type: 'website',
      url,
      siteName: 'FrontDesk KC',
      images: [{ url: image, width: 1200, height: 630, alt: opts.ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: opts.ogTitle,
      description: opts.ogDescription,
      images: [image],
    },
  }
}
