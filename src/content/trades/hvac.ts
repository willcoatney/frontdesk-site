import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'hvac',
  navLabel: 'HVAC',
  vehicle: 'trucks',
  keepDoing: 'on the roof or in the attic',
  metadata: {
    title: 'AI Receptionist for HVAC Companies in KC | FrontDesk AI',
    description:
      'AI receptionist for Kansas City HVAC companies, for 913 and 816. Answers on a roof or in an attic. Maintenance can sit in a band. A replacement is a look.',
    ogTitle: 'AI Receptionist for HVAC Companies in KC | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City HVAC companies, for 913 and 816. Answers on a roof or in an attic. Maintenance can sit in a band. A replacement is a look.',
    ogImage: '/og/hvac.png',
    ogAlt: 'FrontDesk AI for Kansas City HVAC: the phone is answered while you are on the roof.',
  },
  hero: {
    kicker: 'For Kansas City heating and air',
    title: 'The phone gets answered while you are on the roof.',
    lede: 'An attic in July, or a furnace on the first cold week. You cannot pick up, and a house without air or heat calls the next company. Will builds the front office from Olathe, for 913 and 816 numbers. Starter takes the message and texts you the lead. Pro can quote a diagnostic or a maintenance visit inside your bands. A system replacement is booked as a look.',
  },
  heroAside: {
    kicker: 'While you are in the attic or on the roof',
    lines: [
      'On a roof in Overland Park, checking a condenser. The phone is in the van.',
      'In an attic in Lee’s Summit on an 816 no-cool call.',
      'The first cold morning in Olathe, with a no-heat list already longer than the day.',
    ],
    footnote: 'Crosswind Heating & Air is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'A house without air does not leave a voicemail.',
  leakLede:
    'You are on a roof or in an attic. The next caller is hot, or the heat just died. They call the next truck on the map.',
  calculatorIntro:
    'Calls, the share you miss, a typical diagnostic, and what a maintenance plan is worth if you sell one. The result is illustrative. System replacements are not included.',
  stats: tradeStats({
    stat: '$200',
    label: 'illustrative value of one missed diagnostic',
    context:
      'Illustrative, not a study and not your price sheet. A no-cool or no-heat diagnostic often lands in this neighborhood. A replacement is more, and it is priced after someone sees the system.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo tech', callsPerWeek: 12, missedPercent: 45, averageJob: 189, repeatMonthly: 22 },
      { id: 'two', label: 'Two trucks', callsPerWeek: 22, missedPercent: 35, averageJob: 220, repeatMonthly: 28 },
      { id: 'season', label: 'Peak week', callsPerWeek: 40, missedPercent: 40, averageJob: 240, repeatMonthly: 30 },
    ],
    defaultPresetId: 'two',
    calls: { min: 4, max: 70, step: 1, hint: 'No-cool, no-heat, and maintenance calls, plus the texts that arrive while you are on a roof.' },
    missed: missedRange(),
    job: {
      min: 80,
      max: 800,
      step: 5,
      label: 'Diagnostic or first visit',
      hint: 'A typical diagnostic or maintenance visit, not a system replacement.',
    },
    repeat: {
      min: 0,
      max: 80,
      step: 1,
      label: 'Maintenance plan, per month',
      hint: 'What one maintenance agreement is worth each month, spread across the year. Set this to zero if you do not sell plans. A $240 yearly plan is about $20 a month.',
      share: 1 / 4,
      shareLabel: '1 in 4',
      noun: 'new maintenance plans',
    },
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are on the equipment. The plan decides whether you get a text or a diagnostic already on the board.',
  steps: [
    {
      title: 'They reach the number on the van',
      body: 'No cool in Overland Park. No heat in Independence. A maintenance visit they meant to book in the spring. The number may be 913 or 816. You are not climbing down to answer.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It separates a diagnostic from a replacement',
      body: 'Starter texts you the symptom, the city, and whether the system is running at all. Pro and Growth ask heat or cool, how old if they know, and whether they want a diagnostic today. A diagnostic or a tune-up can sit in a band. A full system is a look. The line does not invent a tonnage or a brand.',
      extra: { type: 'note', text: 'Pro sample only · no-cool diagnostic · $89–$189 · today 5:00–7:00' },
    },
    {
      title: 'The board has the next house',
      body: 'On Pro the lead sits in the GoHighLevel pipeline, and a maintenance customer can get a review request after the visit. On Growth the dashboard shows diagnostics, tune-ups, and the replacement looks.',
      extra: {
        type: 'rows',
        rows: [
          { left: '9:00 · Olathe tune-up', right: 'Plan customer' },
          { left: '5:00 · OP no-cool', right: 'Diagnostic' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional company, Crosswind Heating & Air, so the hot afternoon has a shape without using a real company’s name.',
  before: [
    '3:20 PM. You are on a roof. The call goes to voicemail.',
    'They have no air in Prairie Village. They book whoever answers.',
    'A replacement price gets guessed on a callback you make from the driveway.',
    'Tomorrow’s maintenance stops are a whiteboard in the shop.',
    'The plan renewal happens if someone remembers in October.',
  ],
  after: [
    'The same call is answered. A diagnostic window is held for 5:00 to 7:00.',
    'You get a text: Prairie Village, no cool, system is about 12 years old, 913 number.',
    'A replacement question becomes a look, not a system price.',
    'Tune-ups and diagnostics are on the board.',
    'The review text sends when the visit is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Crosswind Heating & Air. Quoting a diagnostic is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Crosswind Heating & Air',
    short: 'Crosswind',
    initial: 'C',
    site: 'crosswind.example',
    call: {
      time: '3:20 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Crosswind Heating and Air. This is Maya. Is it the heat, the air, or a maintenance visit?' },
        { who: 'Caller', text: 'No air. We are in Prairie Village. The fan runs and the house is getting hot.' },
        { who: 'AI', text: 'About how old is the system, and is the outdoor unit running or silent?' },
        { who: 'Caller', text: 'Maybe 12 years. The outdoor unit is humming. It is not cooling.' },
        { who: 'AI', text: 'A diagnostic for that is usually $89 to $189, credited toward the repair if we do the work. I will not price a new system over the phone. I can hold 5:00 to 7:00 today.' },
        { who: 'Caller', text: 'Hold it.' },
        { who: 'AI', text: 'Held. Prairie Village, 5:00 to 7:00. The owner has a text. If you need it sooner and we have no truck, I will say so instead of promising one.' },
      ],
      headline: 'Answered at 3:20 PM, while you were still on a roof.',
      body: 'The Pro line asks heat or cool, age, and what the outdoor unit is doing. It quotes only the diagnostic band you set. A replacement waits until someone is in front of the equipment.',
      note: 'Sample range only. Your price sheet, not a published rate. Crosswind Heating & Air is fictional.',
    },
    chat: {
      time: '8:30 PM',
      introTitle: 'No-cool, no-heat, and maintenance.',
      intro: 'On Pro and Growth, the site chat and a text to the business number use the same diagnostic band and the same refusal to price a system blind.',
      groupLabel: 'Try an HVAC call',
      scenarios: [
        {
          id: 'nocool',
          label: 'No cool',
          lines: [
            { who: 'Them', text: 'No air in Prairie Village. Fan runs, house is hot. Today?' },
            { who: 'AI', text: 'A diagnostic is usually $89–$189. How old is the system, and is the outdoor unit running?' },
            { who: 'Them', text: 'About 12 years. It is humming.' },
            { who: 'AI', text: '5:00–7:00 today is open. I will not price a replacement on a text. Hold the diagnostic?' },
            { who: 'Them', text: 'Yes.' },
            { who: 'AI', text: 'Held. Prairie Village, 5:00–7:00.' },
          ],
        },
        {
          id: 'noheat',
          label: 'No heat',
          lines: [
            { who: 'Them', text: 'Furnace will not kick on in Independence. It is the first cold morning. Gas furnace in a closet.' },
            { who: 'AI', text: 'I can book a diagnostic. The same $89–$189 band applies if that is how your company prices a no-heat call. Tomorrow 8:00–10:00 is open. Book it?' },
            { who: 'Them', text: 'Book it. We have kids in the house.' },
            { who: 'AI', text: 'Booked. Tomorrow 8:00–10:00, Independence. The note says no heat, gas closet furnace, kids in the house. If you want that call handed to a person, say so and we set that rule.' },
          ],
        },
        {
          id: 'tuneup',
          label: 'Tune-up',
          lines: [
            { who: 'Them', text: 'We want the spring maintenance on a system in Lenexa. Do you have a plan?' },
            { who: 'AI', text: 'Yes. A one-time tune-up is usually $89–$149. The maintenance plan we actually sell is described on the visit, at the price you set — I will not invent a new plan here. Thursday at 10:00 is open. Book the tune-up?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday 10:00, Lenexa.' },
          ],
        },
      ],
      note: 'Sample prices. A system replacement is a look, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Independence no-heat', detail: 'Diagnostic · gas furnace' },
        { time: '10:00 AM', name: 'Lenexa tune-up', detail: 'Maintenance' },
        { time: '1:30 PM', name: 'Olathe replacement look', detail: 'No system price yet' },
        { time: '5:00 PM', name: 'Prairie Village no-cool', detail: 'Held by the voice line' },
      ],
      flash: 'New · call at 3:21 PM · Prairie Village, no cool, outdoor unit humming, today 5:00–7:00.',
      leads: [
        { stage: 'New', detail: 'OP no-cool · voice · today 5:00' },
        { stage: 'Booked', detail: 'Independence no-heat · chat · tomorrow' },
        { stage: 'Tune-up', detail: 'Lenexa · Thursday 10:00' },
        { stage: 'Look', detail: 'Olathe replacement · equipment not priced' },
      ],
      reviewTitle: 'Queued after the Lenexa tune-up is marked done',
      reviewBody:
        'Thanks for having Crosswind out. If the visit earned it, a short Google review helps the next neighbor when the air stops.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for heating and air',
  jobsTitle: 'The calls you actually run.',
  jobsLede: 'Diagnostics and tune-ups can sit in a band. Replacements are priced in front of the equipment.',
  jobs: [
    { title: 'No cool', body: 'What the fan and the outdoor unit are doing, and how old the system is if they know. Diagnostic band only.' },
    { title: 'No heat', body: 'Gas, electric, or a heat pump, and whether the house is unsafe. The line texts you. It does not promise a truck you do not have.' },
    { title: 'Maintenance and tune-ups', body: 'Spring and fall visits, in the words of the plan you actually sell. It does not invent a club price.' },
    { title: 'Thermostats', body: 'A straight swap can be a small band if you do that work. A system that will not talk to the new stat is flagged.' },
    { title: 'Replacements', body: 'No tonnage, no brand, no financing number on the phone unless you have written that script. The look is booked.' },
    { title: 'Both sides of the line', body: '913 and 816. The lead keeps the city and the number so a Lenexa tune-up is not mixed up with an Independence no-heat.' },
  ],
  will: [
    'I put this together for heating and air companies around Kansas City. You are on a roof or in an attic when the next house calls. In July that is no air. On the first cold week it is no heat. They call the next truck.',
    'The demo is half an hour, on an HVAC company, with your diagnostic bands and the replacements you will only price on site. If it is not a fit, say so. I am in Olathe.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a no-cool, a no-heat, a tune-up, and a replacement someone wants priced from the age of the unit. You say what sounds off. The demo is how you decide if you would put it on the van.',
      },
      {
        q: 'Will it quote a new system?',
        a: 'No. On Pro and Growth it can quote the diagnostic or tune-up band you approve. A replacement is a look. On Starter it does not quote. It texts you the symptom and the address. You hear the test calls first.',
      },
      {
        q: 'What about a maintenance plan?',
        a: 'If you sell one, the line describes it in your words and at your price. It does not invent a plan, a discount, or a filter schedule you did not approve. If you do not sell plans, we leave that out.',
      },
      {
        q: 'Do you cover 816 and 913?',
        a: 'Yes. We are in Olathe and the work is for both sides of the metro. We forward the number already on the van, 913 or 816. A second local number is an option if you want one. The lead keeps the city so the route stays readable.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. Between houses, you can pick up. While you are on the roof, it answers.',
      },
    ],
    'trucks',
    'on the roof or in the attic',
  ),
  finalTitle: 'See it on a roof you are already on.',
  finalBody:
    'Thirty minutes with Will in Olathe. A heating and air company on the screen, your diagnostic bands in the conversation. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
