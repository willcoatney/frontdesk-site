import { Fraunces } from 'next/font/google'

const display = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>
}
