/** Illustrative model for the revenue-leak calculator. Not a forecast. */

export const WEEKS_PER_MONTH = 4.33
/** Share of missed contacts assumed to book if someone had answered. */
export const BOOK_RATE = 1 / 3
/** Share of those bookings assumed to become a recurring client. */
export const RECURRING_SHARE = 1 / 4

export type LeakInput = {
  callsPerWeek: number
  missedPercent: number
  averageJob: number
  recurringMonthly: number
}

export type LeakResult = {
  contactsPerMonth: number
  missedContacts: number
  bookedJobs: number
  recurringClients: number
  firstJobRevenue: number
  recurringRevenue: number
  monthlyLost: number
  monthlyRecovered: number
  perDay: number
}

export const PRESETS = [
  {
    id: 'solo',
    label: 'Solo crew',
    callsPerWeek: 12,
    missedPercent: 50,
    averageJob: 160,
    recurringMonthly: 280,
  },
  {
    id: 'busy',
    label: 'Busy residential',
    callsPerWeek: 24,
    missedPercent: 40,
    averageJob: 185,
    recurringMonthly: 320,
  },
  {
    id: 'mixed',
    label: 'Homes and offices',
    callsPerWeek: 40,
    missedPercent: 35,
    averageJob: 240,
    recurringMonthly: 520,
  },
] as const

export const DEFAULT_INPUT: LeakInput = {
  callsPerWeek: PRESETS[1].callsPerWeek,
  missedPercent: PRESETS[1].missedPercent,
  averageJob: PRESETS[1].averageJob,
  recurringMonthly: PRESETS[1].recurringMonthly,
}

function finite(value: number) {
  return Number.isFinite(value) ? value : 0
}

export function estimateLeak(input: LeakInput): LeakResult {
  const callsPerWeek = Math.max(0, finite(input.callsPerWeek))
  const missedPercent = Math.min(100, Math.max(0, finite(input.missedPercent)))
  const averageJob = Math.max(0, finite(input.averageJob))
  const recurringMonthly = Math.max(0, finite(input.recurringMonthly))

  const contactsPerMonth = callsPerWeek * WEEKS_PER_MONTH
  const missedContacts = contactsPerMonth * (missedPercent / 100)
  const bookedJobs = missedContacts * BOOK_RATE
  const recurringClients = bookedJobs * RECURRING_SHARE
  const firstJobRevenue = Math.round(bookedJobs * averageJob)
  const recurringRevenue = Math.round(recurringClients * recurringMonthly)
  const monthlyLost = firstJobRevenue + recurringRevenue

  return {
    contactsPerMonth,
    missedContacts,
    bookedJobs,
    recurringClients,
    firstJobRevenue,
    recurringRevenue,
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
