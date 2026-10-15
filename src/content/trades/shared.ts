import { costFaq, editsFaq } from '../pricing'
import type { CalculatorConfig, Stat } from './types'

/**
 * 411 Locals, published January 2016. They monitored 85 small businesses
 * across 58 industries for 30 days: 37.8% answered live, 37.8% went to
 * voicemail, 24.3% got no response. About 62% did not reach a live person.
 * Vendor study, small sample, not a current census.
 */
export const UNANSWERED_STUDY =
  'A 2016 411 Locals study of 85 small businesses found about 62% of calls did not reach a live person (about 38% went to voicemail and about 24% got no response). One vendor study, not a current census.'

export const MISSED_HINT = `Voicemail, or anything that comes in while you are on a job. ${UNANSWERED_STUDY} Use your own share.`

export function tradeStats(third: Stat): Stat[] {
  return [
    {
      stat: '62%',
      label: 'of calls in one small-business study did not reach a live person',
      context: `${UNANSWERED_STUDY} It lines up with what owners describe: the phone rings while the work is in their hands.`,
    },
    {
      stat: 'Next',
      label: 'listing often gets the job when you do not pick up',
      context:
        'People who need the work done today call the next company. The often-repeated “85% won’t call back” line has no study we can cite, so it is not a number on this page.',
    },
    third,
  ]
}

export function callsRange(hint = 'Phone calls, plus website chats and texts.'): CalculatorConfig['calls'] {
  return { min: 4, max: 60, step: 1, hint }
}

export function missedRange(): CalculatorConfig['missed'] {
  return { min: 5, max: 80, step: 1, hint: MISSED_HINT }
}

export function phoneFaq(vehicle: string) {
  return {
    q: 'Do I have to switch my phone number?',
    a: `No. We forward the number already on your ${vehicle}, your site, and your Google listing. Customers dial the same number. If you would rather keep that line for yourself, we can add a local Kansas City number instead.`,
  }
}

export function setupFaq(keepDoing: string) {
  return {
    q: 'How long does setup take?',
    a: `Plan on about two weeks to be live. That covers the demo, the rules for how calls should be handled, the website, test calls you listen to, and the first days of real calls while we tighten the wording. You keep ${keepDoing} while that happens.`,
  }
}

export function withSharedFaqs(
  specific: { q: string; a: string }[],
  vehicle: string,
  keepDoing: string,
) {
  return [...specific, costFaq(), editsFaq(), phoneFaq(vehicle), setupFaq(keepDoing)]
}

export const BOOK_RATE = 1 / 3
export const BOOK_RATE_LABEL = '1 in 3'
