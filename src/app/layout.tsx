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
    url: '/',
    siteName: 'FrontDesk KC',
    title: TITLE,
    description: DESCRIPTION,
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
