import type { Metadata } from 'next'
import { Fraunces } from 'next/font/google'

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

const TITLE = 'More booked cleans, without a receptionist — FrontDesk AI'
const DESCRIPTION =
  'A done-for-you front office for Kansas City cleaning companies: a marketing website, a 24/7 voice receptionist that quotes and books, instant chat and text, and a crew dashboard. Book a 30-minute demo.'
const OG_TITLE = 'More booked cleans, without a receptionist'
const OG_DESCRIPTION =
  'Website, 24/7 voice, chat and text, and a crew dashboard for Kansas City cleaning companies. Book a 30-minute demo with Will.'
const OG_IMAGE = 'https://frontdeskkc.com/og/cleaning.png'
const OG_ALT =
  'FrontDesk AI for cleaning companies: more booked cleans, without hiring a receptionist. Every call and message answered instantly.'

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/cleaning' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    locale: 'en_US',
    type: 'website',
    url: 'https://frontdeskkc.com/cleaning',
    siteName: 'FrontDesk KC',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: OG_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function CleaningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={display.variable}>{children}</div>
}
