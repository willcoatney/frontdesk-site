import type { MetadataRoute } from 'next'

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
    {
      url: `${SITE}/cleaning`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]
}
