import { Fraunces } from 'next/font/google'

export const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})
