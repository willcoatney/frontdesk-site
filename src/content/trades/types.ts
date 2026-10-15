export type Stat = {
  stat: string
  label: string
  context: string
}

export type StepExtra =
  | { type: 'pills'; label: string; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'rows'; rows: { left: string; right: string }[] }

export type HowStep = {
  title: string
  body: string
  extra: StepExtra
}

export type CalculatorPreset = {
  id: string
  label: string
  callsPerWeek: number
  missedPercent: number
  averageJob: number
  repeatMonthly: number
}

export type NumberRange = {
  min: number
  max: number
  step: number
}

export type CalculatorConfig = {
  presets: CalculatorPreset[]
  defaultPresetId: string
  calls: NumberRange & { hint: string }
  missed: NumberRange & { hint: string }
  job: NumberRange & { label: string; hint: string }
  repeat:
    | (NumberRange & {
        label: string
        hint: string
        share: number
        shareLabel: string
        noun: string
      })
    | null
  bookRate: number
  bookRateLabel: string
}

export type DemoLine = {
  who: string
  text: string
}

export type DemoConfig = {
  company: string
  short: string
  initial: string
  site: string
  call: {
    time: string
    lines: DemoLine[]
    headline: string
    body: string
    note: string
  }
  chat: {
    time: string
    introTitle: string
    intro: string
    groupLabel: string
    scenarios: { id: string; label: string; lines: DemoLine[] }[]
    note: string
  }
  dashboard: {
    schedule: { time: string; name: string; detail: string }[]
    flash: string
    leads: { stage: string; detail: string }[]
    reviewTitle: string
    reviewBody: string
    reviewNote: string
  }
}

export type TradeConfig = {
  slug: string
  navLabel: string
  /** Noun used in “the number on your …” */
  vehicle: string
  /** Verb phrase for the timeline, e.g. “cleaning”. */
  keepDoing: string
  metadata: {
    title: string
    description: string
    ogTitle: string
    ogDescription: string
    ogImage: string
    ogAlt: string
  }
  hero: {
    kicker: string
    title: string
    lede: string
  }
  film?: {
    src: string
    poster: string
    width: number
    height: number
    aria: string
    caption: string
  }
  heroAside?: {
    kicker: string
    lines: string[]
    footnote: string
  }
  leakTitle: string
  leakLede: string
  calculatorIntro: string
  stats: Stat[]
  calculator: CalculatorConfig
  howLede: string
  steps: HowStep[]
  beforeAfterLede: string
  before: string[]
  after: string[]
  demosLede: string
  demos: DemoConfig
  jobsKicker: string
  jobsTitle: string
  jobsLede: string
  jobs: { title: string; body: string }[]
  will: string[]
  faqs: { q: string; a: string }[]
  finalTitle: string
  finalBody: string
}
