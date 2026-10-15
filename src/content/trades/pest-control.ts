import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'pest-control',
  navLabel: 'Pest control',
  vehicle: 'trucks',
  keepDoing: 'on routes',
  metadata: {
    title: 'AI Receptionist for Pest Control in KC | FrontDesk AI',
    description:
      'AI receptionist for Kansas City pest control companies. The line answers in a crawlspace. General pest can sit in a band. Termites are an inspection.',
    ogTitle: 'AI Receptionist for Pest Control in KC | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City pest control companies. The line answers in a crawlspace. General pest can sit in a band. Termites are an inspection.',
    ogImage: '/og/pest-control.png',
    ogAlt: 'FrontDesk AI for Kansas City pest control: the phone is answered while you are under the house.',
  },
  hero: {
    kicker: 'For Kansas City pest control companies',
    title: 'The phone gets answered while you are under the house.',
    lede: 'You are in a crawlspace or treating a kitchen, and a homeowner with ants will call the next company that picks up. Will builds the front office from Olathe. Starter takes the message and texts you the lead. Pro asks the pest, quotes an initial visit inside your bands, and can describe the plan you actually sell. Growth adds the dashboard. Termite prices wait until an inspection.',
  },
  heroAside: {
    kicker: 'While you are in the crawlspace',
    lines: [
      'On your back under a house in Lee’s Summit. The phone is in the truck.',
      'Treating a kitchen in Overland Park. You are not stopping to take a new-customer call.',
      'A spring rush, when every missed call is a quarterly plan someone else starts.',
    ],
    footnote: 'Threshold Pest Co. is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'Ants do not wait on a callback.',
  leakLede:
    'The person who found droppings this morning wants someone today or tomorrow. You are already under a house.',
  calculatorIntro:
    'Calls, the share you miss, an initial visit, and what a plan is worth each month. The result is illustrative. The share that becomes a plan is an assumption you can read in the math.',
  stats: tradeStats({
    stat: '$175',
    label: 'illustrative value of one missed initial visit',
    context:
      'Illustrative, not a study and not your price sheet. A general-pest initial often lands in this neighborhood. A quarterly plan is worth more over the year, and termite work is priced after an inspection.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo tech', callsPerWeek: 12, missedPercent: 45, averageJob: 175, repeatMonthly: 55 },
      { id: 'routes', label: 'Two routes', callsPerWeek: 22, missedPercent: 35, averageJob: 189, repeatMonthly: 60 },
      { id: 'termite', label: 'Pest and termite leads', callsPerWeek: 30, missedPercent: 30, averageJob: 250, repeatMonthly: 70 },
    ],
    defaultPresetId: 'routes',
    calls: { min: 4, max: 60, step: 1, hint: 'New-customer calls, plan questions, and the texts that arrive while you are under a house.' },
    missed: missedRange(),
    job: {
      min: 80,
      max: 600,
      step: 5,
      label: 'Initial visit',
      hint: 'A typical general-pest initial, not a termite treatment.',
    },
    repeat: {
      min: 30,
      max: 150,
      step: 5,
      label: 'Plan, per month',
      hint: 'What a quarterly or monthly plan is worth each month, spread out. Not the initial treatment.',
      share: 2 / 5,
      shareLabel: '2 in 5',
      noun: 'new plans',
    },
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are under the house. The plan decides whether you get a text or a visit already on the route.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'Ants in the kitchen. A scratching in the attic. A realtor who needs a termite letter. You are not in a place to talk.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It names the pest before it names a price',
      body: 'Starter texts you the pest, the city, and how bad they say it is. Pro and Growth ask where they are seeing it and whether kids or pets are in the house. A general-pest initial can sit in a band, and the plan you sell can be described in your words. Termites, wildlife, and bed bugs follow the rule you set — usually an inspection, not a treatment price.',
      extra: { type: 'note', text: 'Pro sample only · general pest initial · $149–$219 · quarterly plan described, not invented' },
    },
    {
      title: 'The route has the stop',
      body: 'On Pro the lead sits in the GoHighLevel pipeline, and a review request can go out after the visit. On Growth the dashboard shows initials, plan customers, and the inspections that still need a person.',
      extra: {
        type: 'rows',
        rows: [
          { left: '9:30 · OP ants', right: 'Initial' },
          { left: '1:00 · Lee’s Summit termite look', right: 'Inspection' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional company, Threshold Pest Co., so the route has a shape without using a real company’s name.',
  before: [
    '11:05 AM. You are in a crawlspace. The call goes to voicemail.',
    'They have ants and a closing date. They book whoever answers.',
    'A termite price gets invented on a callback you are too tired to make carefully.',
    'Tomorrow’s stops are a text from the office you do not have.',
    'The plan renewal happens if someone remembers.',
  ],
  after: [
    'The same call is answered. An initial is on the route for tomorrow morning.',
    'You get a text: Overland Park, ants in the kitchen, dog in the house, no kids.',
    'The termite question becomes an inspection, not a treatment price.',
    'The route shows initials and plan stops.',
    'The review text sends when the visit is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Threshold Pest Co. Quoting is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Threshold Pest Co.',
    short: 'Threshold',
    initial: 'T',
    site: 'threshold-pest.example',
    call: {
      time: '11:05 AM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Threshold Pest Co. This is Maya. What are you seeing?' },
        { who: 'Caller', text: 'Ants in the kitchen in Lee’s Summit. Do you do quarterly plans?' },
        { who: 'AI', text: 'Yes. Where are they coming from, and are there kids or pets in the house?' },
        { who: 'Caller', text: 'Along the back door. One dog. No kids.' },
        { who: 'AI', text: 'An initial visit for something like that is usually $149 to $219. The quarterly plan most of our customers use is about $49 to $69 a month, billed the way we set it — I can go through that on the visit, not invent a new plan on the phone. Tomorrow between 9 and 11 is open. Book it?' },
        { who: 'Caller', text: 'Book it.' },
        { who: 'AI', text: 'Booked. Tomorrow 9 to 11, Lee’s Summit. The note says kitchen ants, dog, back door.' },
      ],
      headline: 'Answered at 11:05 AM, while you were still under a house.',
      body: 'The Pro line asks the pest, the entry, and pets before it uses your initial-visit band. It describes the plan you already sell. It does not price a termite treatment.',
      note: 'Sample ranges only. Your price sheet, not a published rate. Threshold Pest Co. is fictional.',
    },
    chat: {
      time: '8:05 PM',
      introTitle: 'General pest, plans, and the jobs that need an inspection.',
      intro: 'On Pro and Growth, the site chat and a text to the business number use the same bands and the same refusal to invent a termite price.',
      groupLabel: 'Try a pest call',
      scenarios: [
        {
          id: 'ants',
          label: 'Ants',
          lines: [
            { who: 'Them', text: 'Ants in the kitchen, Lee’s Summit. Do you have a quarterly plan?' },
            { who: 'AI', text: 'Yes. Kids or pets? And where are you seeing them?' },
            { who: 'Them', text: 'One dog. Along the back door.' },
            { who: 'AI', text: 'An initial is usually $149–$219. The quarterly plan we actually sell is about $49–$69 a month. Tomorrow 9–11 is open. Book the initial?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Tomorrow 9–11, Lee’s Summit. Dog noted.' },
          ],
        },
        {
          id: 'rodent',
          label: 'Rodents',
          lines: [
            { who: 'Them', text: 'Scratching in the attic in Shawnee. Could be mice. How fast can you come?' },
            { who: 'AI', text: 'We can inspect. I will not promise a trapping price until someone sees the entry. Thursday at 1:00 PM is open for the inspection. Book it?' },
            { who: 'Them', text: 'Yes. We hear it at night.' },
            { who: 'AI', text: 'Booked. Thursday 1:00, Shawnee attic. The note says nighttime scratching.' },
          ],
        },
        {
          id: 'termite',
          label: 'Termites',
          lines: [
            { who: 'Them', text: 'Our realtor wants a termite letter on a house in Olathe. What does treatment cost?' },
            { who: 'AI', text: 'I will not price a treatment without an inspection. I can book the inspection. If a letter is all they need and the inspection is clear, that is a different fee, usually $75–$125. Wednesday at 10:00 is open.' },
            { who: 'Them', text: 'Book the inspection.' },
            { who: 'AI', text: 'Booked. Wednesday 10:00, Olathe. Treatment, if any, is priced after the inspection.' },
          ],
        },
      ],
      note: 'Sample prices. Termite treatment, wildlife, and bed bugs follow your inspection rule. They are not priced from a text.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Olathe quarterly', detail: 'Plan customer · exterior' },
        { time: '9:30 AM', name: 'Overland Park ants', detail: 'Initial · dog in the house' },
        { time: '1:00 PM', name: 'Lee’s Summit termite', detail: 'Inspection · no treatment price' },
        { time: '3:30 PM', name: 'Shawnee attic', detail: 'Rodent look' },
      ],
      flash: 'New · call at 11:06 AM · Lee’s Summit kitchen ants, dog, tomorrow 9–11.',
      leads: [
        { stage: 'New', detail: 'Shawnee attic · chat · Thursday inspection' },
        { stage: 'Initial', detail: 'Lee’s Summit ants · voice · tomorrow' },
        { stage: 'Inspection', detail: 'Olathe termite letter · Wednesday' },
        { stage: 'Plan', detail: 'Overland Park · quarterly · exterior' },
      ],
      reviewTitle: 'Queued after the Overland Park initial is marked done',
      reviewBody:
        'Thanks for having Threshold out. If the visit earned it, a short Google review helps the next neighbor who found ants this morning.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for pest routes',
  jobsTitle: 'The calls you actually run.',
  jobsLede: 'General pest can sit in a band. Termites, wildlife, and anything you inspect before treating stay inspections.',
  jobs: [
    { title: 'General pest', body: 'Ants, spiders, roaches. It asks where, pets, and kids, then uses your initial-visit band.' },
    { title: 'Quarterly and monthly plans', body: 'Described in your words, at the price you set. It does not invent a new program on the call.' },
    { title: 'Rodents', body: 'Scratching, droppings, and where. An inspection is booked. Trapping is priced after the entry is seen, unless you have a band for a simple case.' },
    { title: 'Termites', body: 'Letters and inspections can have a fee you approve. Treatment is never priced before someone has been under or around the house.' },
    { title: 'Mosquitoes', body: 'If you sell a seasonal program, the line can book the first visit and describe the cadence. It does not promise a species it has not seen.' },
    { title: 'Wildlife and bed bugs', body: 'Handled with the script you approve: often a referral or an inspection, not a casual price.' },
  ],
  will: [
    'I put this together for pest control owners around Kansas City. You are in a crawlspace or a kitchen when the next customer calls. They do not wait. They book the company that answers.',
    'The demo is half an hour, on a pest company, with your initial bands and the pests you will not price before an inspection. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on ants, a rodent complaint, and a termite letter, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'Will it quote a termite treatment?',
        a: 'No. On Pro and Growth it can quote the inspection or letter fee you approve, and it says treatment is priced after the inspection. General pest uses your initial and plan bands. On Starter it does not quote. It texts you the pest and the address. You hear the test calls first.',
      },
      {
        q: 'What about pets and kids?',
        a: 'The line asks, because you told it to. It uses the prep instructions you approved — what to put away, how long to stay off the lawn — and it does not freelance a chemical name you did not give it.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. Between stops, you can pick up. While you are under the house, it answers.',
      },
    ],
    'trucks',
    'on routes',
  ),
  finalTitle: 'See it on a route you are already running.',
  finalBody:
    'Thirty minutes with Will. A pest company on the screen, your bands and the inspections you will not price early. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
