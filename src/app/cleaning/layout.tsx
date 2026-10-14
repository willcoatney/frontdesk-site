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

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: '/cleaning' },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'More booked cleans, without a receptionist',
    description:
      'Website, 24/7 voice, chat and text, and a crew dashboard for Kansas City cleaning companies. Book a 30-minute demo with Will.',
    locale: 'en_US',
    type: 'website',
    url: '/cleaning',
    siteName: 'FrontDesk KC',
    images: [
      {
        url: '/videos/frontdesk-cleaning-v2-film-poster.jpg',
        alt: 'Narrated FrontDesk AI film for a Kansas City cleaning company',
      },
    ],
  },
}

export default function CleaningLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={display.variable}>{children}</div>
}
