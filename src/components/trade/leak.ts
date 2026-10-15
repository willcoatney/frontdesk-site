/** Illustrative model for the revenue-leak calculator. Not a forecast. */

export const WEEKS_PER_MONTH = 4.33

export type LeakInput = {
  callsPerWeek: number
  missedPercent: number
  averageJob: number
  repeatMonthly: number
}

export type LeakRates = {
  bookRate: number
  repeatShare: number
}

export type LeakResult = {
  contactsPerMonth: number
  missedContacts: number
  bookedJobs: number
  repeatCustomers: number
  firstJobRevenue: number
  repeatRevenue: number
  monthlyLost: number
  monthlyRecovered: number
  perDay: number
}

function finite(value: number) {
  return Number.isFinite(value) ? value : 0
}

export function estimateLeak(input: LeakInput, rates: LeakRates): LeakResult {
  const callsPerWeek = Math.max(0, finite(input.callsPerWeek))
  const missedPercent = Math.min(100, Math.max(0, finite(input.missedPercent)))
  const averageJob = Math.max(0, finite(input.averageJob))
  const repeatMonthly = Math.max(0, finite(input.repeatMonthly))
  const bookRate = Math.max(0, finite(rates.bookRate))
  const repeatShare = Math.max(0, finite(rates.repeatShare))

  const contactsPerMonth = callsPerWeek * WEEKS_PER_MONTH
  const missedContacts = contactsPerMonth * (missedPercent / 100)
  const bookedJobs = missedContacts * bookRate
  const repeatCustomers = bookedJobs * repeatShare
  const firstJobRevenue = Math.round(bookedJobs * averageJob)
  const repeatRevenue = Math.round(repeatCustomers * repeatMonthly)
  const monthlyLost = firstJobRevenue + repeatRevenue

  return {
    contactsPerMonth,
    missedContacts,
    bookedJobs,
    repeatCustomers,
    firstJobRevenue,
    repeatRevenue,
    monthlyLost,
    monthlyRecovered: monthlyLost,
    perDay: Math.round(monthlyLost / 30),
  }
}

export function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

export function formatCount(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}
