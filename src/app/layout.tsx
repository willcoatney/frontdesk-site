import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const SITE = 'https://frontdeskkc.com'
const TITLE = 'FrontDesk AI — AI Receptionist for Kansas City Service Businesses'
const DESCRIPTION =
  'FrontDesk AI answers every call, books appointments, texts clients, and tracks every lead. Built and supported locally in Kansas City by FrontDesk KC.'
const OG_IMAGE = 'https://frontdeskkc.com/og/home.png'
const OG_ALT =
  'FrontDesk AI: your front desk, working 24/7 for Kansas City service businesses.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { absolute: TITLE },
  description: DESCRIPTION,
  applicationName: 'FrontDesk KC',
  authors: [{ name: 'FrontDesk KC', url: SITE }],
  creator: 'FrontDesk KC',
  publisher: 'FrontDesk KC',
  alternates: { canonical: '/' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE,
    siteName: 'FrontDesk KC',
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className={`${inter.className} min-h-full`}>{children}</body>
    </html>
  )
}
