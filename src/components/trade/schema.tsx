import { PLANS } from '@/content/pricing'
import type { TradeConfig } from '@/content/trades/types'
import { PHONE_E164, SITE } from './constants'

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
      telephone: PHONE_E164,
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
          telephone: PHONE_E164,
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

const BUSINESS_ADDRESS = {
  '@type': 'PostalAddress',
  addressLocality: 'Olathe',
  addressRegion: 'KS',
  addressCountry: 'US',
}

const BUSINESS_AREA = {
  '@type': 'AdministrativeArea',
  name: 'Kansas City metropolitan area',
}

export function HomeSchema({
  description,
  faqs,
}: {
  description: string
  faqs: { q: string; a: string }[]
}) {
  const url = `${SITE}/`
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: 'FrontDesk KC',
        alternateName: 'FrontDesk AI',
        url,
        telephone: PHONE_E164,
        image: `${SITE}/og/home.png`,
        founder: {
          '@type': 'Person',
          name: 'Will Coatney',
        },
        address: BUSINESS_ADDRESS,
        areaServed: BUSINESS_AREA,
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${SITE}/#localbusiness`,
        name: 'FrontDesk KC',
        alternateName: 'FrontDesk AI',
        url,
        telephone: PHONE_E164,
        image: `${SITE}/og/home.png`,
        priceRange: '$197-$797+',
        description,
        parentOrganization: { '@id': `${SITE}/#organization` },
        founder: {
          '@type': 'Person',
          name: 'Will Coatney',
        },
        address: BUSINESS_ADDRESS,
        areaServed: BUSINESS_AREA,
      },
      {
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
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
}

export function ServiceAndBusinessSchema({
  path,
  name,
  serviceType,
  image,
}: {
  path: string
  name: string
  serviceType: string
  image: string
}) {
  const url = `${SITE}${path}`
  const businessId = `${url}#localbusiness`
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': businessId,
        name: 'FrontDesk KC',
        url,
        telephone: PHONE_E164,
        image: `${SITE}${image}`,
        address: BUSINESS_ADDRESS,
        areaServed: BUSINESS_AREA,
      },
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name,
        serviceType,
        url,
        areaServed: BUSINESS_AREA,
        provider: { '@id': businessId },
      },
    ],
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(graph) }} />
}
