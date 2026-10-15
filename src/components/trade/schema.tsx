import { PLANS } from '@/content/pricing'
import type { TradeConfig } from '@/content/trades/types'
import { SITE } from './constants'

function jsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c')
}

export function FaqSchema({
  path,
  faqs,
}: {
  path: string
  faqs: { q: string; a: string }[]
}) {
  const url = `${SITE}${path}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${url}#faq`,
    url,
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  )
}

export function PricingOffers({ path }: { path: string }) {
  const url = `${SITE}${path}`
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'FrontDesk AI',
    serviceType: 'AI receptionist and marketing site',
    url,
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Kansas City metropolitan area',
    },
    provider: {
      '@type': 'LocalBusiness',
      name: 'FrontDesk KC',
      telephone: '+1-913-717-7841',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Olathe',
        addressRegion: 'KS',
        addressCountry: 'US',
      },
      areaServed: 'Kansas City metropolitan area',
    },
    offers: PLANS.map((plan) =>
      plan.id === 'growth'
        ? {
            '@type': 'Offer',
            name: plan.name,
            url: `${url}#plans`,
            priceCurrency: 'USD',
            priceSpecification: {
              '@type': 'PriceSpecification',
              minPrice: plan.price,
              priceCurrency: 'USD',
              unitText: 'MONTH',
            },
            description: plan.schemaDescription,
          }
        : {
            '@type': 'Offer',
            name: plan.name,
            url: `${url}#plans`,
            priceCurrency: 'USD',
            price: plan.price,
            description: plan.schemaDescription,
          },
    ),
  }

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />
  )
}

export function TradeSchema({ trade }: { trade: TradeConfig }) {
  const url = `${SITE}/${trade.slug}`
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'FAQPage',
        '@id': `${url}#faq`,
        url,
        mainEntity: trade.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: `FrontDesk AI for ${trade.navLabel.toLowerCase()}`,
        serviceType: 'AI receptionist and marketing site',
        url,
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Kansas City metropolitan area',
        },
        provider: {
          '@type': 'LocalBusiness',
          name: 'FrontDesk KC',
          telephone: '+1-913-717-7841',
          image: `${SITE}${trade.metadata.ogImage}`,
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Olathe',
            addressRegion: 'KS',
            addressCountry: 'US',
          },
          areaServed: 'Kansas City metropolitan area',
        },
        offers: PLANS.map((plan) =>
          plan.id === 'growth'
            ? {
                '@type': 'Offer',
                name: `${plan.name} for ${trade.navLabel.toLowerCase()}`,
                url: `${url}#offer`,
                priceCurrency: 'USD',
                priceSpecification: {
                  '@type': 'PriceSpecification',
                  minPrice: plan.price,
                  priceCurrency: 'USD',
                  unitText: 'MONTH',
                },
                description: plan.schemaDescription,
              }
            : {
                '@type': 'Offer',
                name: `${plan.name} for ${trade.navLabel.toLowerCase()}`,
                url: `${url}#offer`,
                priceCurrency: 'USD',
                price: plan.price,
                description: plan.schemaDescription,
              },
        ),
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd(graph) }}
    />
  )
}
