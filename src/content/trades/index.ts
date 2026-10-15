import cleaning from './cleaning'
import electricians from './electricians'
import handyman from './handyman'
import lawnCare from './lawn-care'
import mobileDetailing from './mobile-detailing'
import painters from './painters'
import pestControl from './pest-control'
import treeService from './tree-service'
import { tradeNav } from './nav'
import type { TradeConfig } from './types'

export const trades: TradeConfig[] = [
  cleaning,
  electricians,
  treeService,
  painters,
  handyman,
  mobileDetailing,
  lawnCare,
  pestControl,
]

const slugs = trades.map((trade) => trade.slug)
if (new Set(slugs).size !== slugs.length) {
  throw new Error('Trade slugs must be unique')
}
if (slugs.join() !== tradeNav.map((trade) => trade.slug).join()) {
  throw new Error('Trade nav is out of date')
}

export { tradeNav } from './nav'

export function getTrade(slug: string) {
  return trades.find((trade) => trade.slug === slug)
}

export type { TradeConfig } from './types'
