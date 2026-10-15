import { BOOK_RATE, BOOK_RATE_LABEL, missedRange } from '@/content/trades/shared'
import type { CalculatorConfig } from '@/content/trades/types'

/** Example weeks for the missed-call page. Not a Kansas City average and not a text-back study. */
export const missedCallCalculator: CalculatorConfig = {
  presets: [
    { id: 'quiet', label: 'Quieter week', callsPerWeek: 8, missedPercent: 35, averageJob: 180, repeatMonthly: 0 },
    { id: 'typical', label: 'Example week', callsPerWeek: 16, missedPercent: 45, averageJob: 250, repeatMonthly: 0 },
    { id: 'busy', label: 'Heavier week', callsPerWeek: 28, missedPercent: 55, averageJob: 400, repeatMonthly: 0 },
  ],
  defaultPresetId: 'typical',
  calls: {
    min: 4,
    max: 80,
    step: 1,
    hint: 'Phone calls, website chats, and texts in a week you recognize. The presets are examples, not a metro average.',
  },
  missed: missedRange(),
  job: {
    min: 50,
    max: 2500,
    step: 10,
    label: 'Average job value',
    hint: 'A typical first job from a call you would have taken. Leave the outlier off unless that is the call you miss.',
  },
  repeat: null,
  bookRate: BOOK_RATE,
  bookRateLabel: BOOK_RATE_LABEL,
}
