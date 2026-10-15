import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

const PUBLIC_RULES = {
  allow: '/',
  disallow: ['/admin', '/api/admin'],
}

/** Named on purpose so the allow is explicit. The wildcard already allows them. */
const AI_CRAWLERS = [
  'GPTBot',
  'PerplexityBot',
  'ClaudeBot',
  'Google-Extended',
  'OAI-SearchBot',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', ...PUBLIC_RULES },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, ...PUBLIC_RULES })),
    ],
    sitemap: 'https://frontdeskkc.com/sitemap.xml',
    host: 'https://frontdeskkc.com',
  }
}
