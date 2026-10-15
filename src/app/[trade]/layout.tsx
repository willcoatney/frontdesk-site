import { display } from '@/components/display-font'

export default function TradeLayout({ children }: { children: React.ReactNode }) {
  return <div className={display.variable}>{children}</div>
}
