import type { Metadata } from 'next'

export const dynamic = 'force-static'

export const metadata: Metadata = {
  title: { absolute: 'Pipeline' },
  description: 'Internal sales pipeline',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      nosnippet: true,
    },
  },
  alternates: { canonical: '/admin' },
  openGraph: {
    title: 'Pipeline',
    description: 'Internal sales pipeline',
    images: [],
  },
  twitter: {
    card: 'summary',
    title: 'Pipeline',
    description: 'Internal sales pipeline',
    images: [],
  },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
