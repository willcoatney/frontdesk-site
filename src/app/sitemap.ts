import type { MetadataRoute } from 'next'
import { tradeNav } from '@/content/trades/nav'

export const dynamic = 'force-static'

const SITE = 'https://frontdeskkc.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: `${SITE}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...tradeNav.map((trade) => ({
      url: `${SITE}/${trade.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: trade.slug === 'cleaning' ? 0.9 : 0.8,
    })),
  ]
}
