import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'lawn-care',
  navLabel: 'Lawn care',
  vehicle: 'trucks',
  keepDoing: 'mowing',
  metadata: {
    title: 'Answered while you are on the mower — FrontDesk AI for lawn care',
    description:
      'A front office for Kansas City lawn companies. The line answers while you are on a mower. Mow routes can sit in a band. Landscape installs are a walk. Built in Olathe.',
    ogTitle: 'Answered while you are on the mower',
    ogDescription:
      'FrontDesk AI for Kansas City lawn care. The route keeps filling while you are on a mower. Plans from $197 a month. Book a demo with Will in Olathe.',
    ogImage: '/og/lawn-care.png',
    ogAlt: 'FrontDesk AI for Kansas City lawn care: the phone is answered while you are on the mower.',
  },
  hero: {
    kicker: 'For Kansas City lawn companies',
    title: 'The phone gets answered while you are on the mower.',
    lede: 'Ear protection on, a route to finish before the rain, and a new lawn calling the next truck. Will builds the front office from Olathe. Starter takes the message and texts you the lead. Pro asks the lot, quotes a mow inside your bands, and books the first visit. Growth adds the dashboard for the route.',
  },
  heroAside: {
    kicker: 'While the mower is running',
    lines: [
      'On a zero-turn in Shawnee, with the hearing protection on.',
      'Loading the trailer in Olathe between stops. The phone is in the cup holder, buzzing.',
      'A leaf week, when every missed call is a cleanup someone else will take.',
    ],
    footnote: 'Fairway Lane Lawn Care is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'A route is won by whoever picks up.',
  leakLede:
    'Mowing is a standing visit. The homeowner who cannot reach you this afternoon hires a truck that can start next week.',
  calculatorIntro:
    'Calls, the share you miss, a first visit, and what a standing route is worth each month. The result is illustrative. The share that becomes a route is an assumption you can see in the math, not a promise.',
  stats: tradeStats({
    stat: '$150',
    label: 'illustrative value of one missed first visit',
    context:
      'Illustrative, not a study and not your rate card. A first cleanup often lands in this neighborhood. A weekly mow is worth more across the season, which is what the calculator’s route field is for.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo route', callsPerWeek: 10, missedPercent: 45, averageJob: 150, repeatMonthly: 140 },
      { id: 'full', label: 'Full route', callsPerWeek: 20, missedPercent: 35, averageJob: 180, repeatMonthly: 160 },
      { id: 'extras', label: 'Mow and extras', callsPerWeek: 32, missedPercent: 30, averageJob: 220, repeatMonthly: 190 },
    ],
    defaultPresetId: 'full',
    calls: { min: 4, max: 60, step: 1, hint: 'New-lawn calls, cleanup requests, and the texts that arrive while you are on a mower.' },
    missed: missedRange(),
    job: {
      min: 60,
      max: 800,
      step: 5,
      label: 'First visit value',
      hint: 'A cleanup or the first mows, not the whole season.',
    },
    repeat: {
      min: 40,
      max: 400,
      step: 5,
      label: 'Route, per month',
      hint: 'What one standing mow is worth each month. A $45 weekly stop is about $195. A $55 biweekly stop is about $120.',
      share: 1 / 3,
      shareLabel: '1 in 3',
      noun: 'new routes',
    },
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are on the mower. The plan decides whether you get a text or a lawn already on the route.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'A biweekly mow. A spring cleanup. A mulch bed they saw on a neighbor’s lawn. You will not hear the phone over the machine.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It asks the lot, not just the ZIP',
      body: 'Starter texts you the city, roughly how big, and whether they want a mow or a cleanup. Pro and Growth ask frequency, fences, and whether there is a dog. A typical lot can sit in a band. A landscape install or a drainage problem is a walk.',
      extra: { type: 'note', text: 'Pro sample only · biweekly mow · $45–$70 a visit · first cut Thursday' },
    },
    {
      title: 'The route can absorb the stop',
      body: 'On Pro the lead sits in the GoHighLevel pipeline, and a review request can go out after a visit. On Growth the dashboard shows the day’s route, including the new lawn the line just booked.',
      extra: {
        type: 'rows',
        rows: [
          { left: 'Thu · Shawnee biweekly', right: 'Route B' },
          { left: 'Fri · Olathe cleanup', right: 'First visit' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional crew, Fairway Lane Lawn Care, so the week has a shape without using a real company’s name.',
  before: [
    '3:10 PM. You are on the mower. The call goes to voicemail.',
    'They wanted a biweekly start this week. They hire the truck that answered.',
    'Every price waits until you drive the lot, even the ones you could have banded.',
    'The route is a whiteboard and a group text.',
    'The review ask happens in November, if you remember.',
  ],
  after: [
    'The same call is answered. A first cut is on Thursday, inside the band.',
    'You get a text: Shawnee, fenced, dog in the house during the cut, biweekly.',
    'A patio and a planting bed become a walk, not a mow price.',
    'Route B can see the new stop.',
    'The review text sends when the visit is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Fairway Lane Lawn Care. Quoting is the Pro sample. The route dashboard is the Growth sample.',
  demos: {
    company: 'Fairway Lane Lawn Care',
    short: 'Fairway Lane',
    initial: 'F',
    site: 'fairway-lane.example',
    call: {
      time: '3:10 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Fairway Lane Lawn Care. This is Maya. Are you looking for mowing, or something bigger?' },
        { who: 'Caller', text: 'Biweekly mow. A normal lot in Shawnee. Do you have a route there?' },
        { who: 'AI', text: 'We do. Fenced yard? A dog I should know about? And is the lawn a regular cut, or does it need a cleanup first?' },
        { who: 'Caller', text: 'Fenced. Dog stays in. It is a little long. Probably a cleanup and then biweekly.' },
        { who: 'AI', text: 'A biweekly mow on a lot like that is usually $45 to $70 a visit. The first cleanup is often $120 to $180 if it is only overgrown, not a restoration. I can put the first cut on Thursday. Book it?' },
        { who: 'Caller', text: 'Thursday works.' },
        { who: 'AI', text: 'Booked. Thursday, Shawnee. The note says fenced, dog inside, cleanup first, then biweekly.' },
      ],
      headline: 'Answered at 3:10 PM, while you were still on the mower.',
      body: 'The Pro line asks frequency, fence, and dog before it uses a mow band. A cleanup is a separate number. A landscape install is not priced as a mow.',
      note: 'Sample ranges only. Your bands, not a published rate. Fairway Lane Lawn Care is fictional.',
    },
    chat: {
      time: '7:55 PM',
      introTitle: 'Routes, cleanups, and the jobs that are not a mow.',
      intro: 'On Pro and Growth, the site chat and a text to the business number use the same bands.',
      groupLabel: 'Try a lawn job',
      scenarios: [
        {
          id: 'mow',
          label: 'Biweekly',
          lines: [
            { who: 'Them', text: 'Biweekly mow, normal lot in Shawnee. Do you run out here?' },
            { who: 'AI', text: 'Yes. Fenced? Dog? And is it a regular cut or a cleanup first?' },
            { who: 'Them', text: 'Fenced, dog stays in, a little long.' },
            { who: 'AI', text: 'Biweekly is usually $45–$70 a visit. First cleanup $120–$180 if it is just overgrown. Thursday is open. Book it?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday, Shawnee. Dog inside for the cut.' },
          ],
        },
        {
          id: 'leaves',
          label: 'Leaves',
          lines: [
            { who: 'Them', text: 'Leaf cleanup in Brookside. Two big maples. What is that?' },
            { who: 'AI', text: 'A typical two-tree cleanup is often $180–$320 if we are hauling, not just blowing to the curb. I can book a look if the yard is steep or fenced tight. Saturday morning is open for the crew. Book the cleanup?' },
            { who: 'Them', text: 'Flat yard. Book Saturday.' },
            { who: 'AI', text: 'Booked. Saturday morning, Brookside. The note says haul-away, two maples, flat yard.' },
          ],
        },
        {
          id: 'beds',
          label: 'Mulch',
          lines: [
            { who: 'Them', text: 'We want the front beds mulched and a few shrubs planted in Lenexa. Price?' },
            { who: 'AI', text: 'I will not guess a planting from a text. I can book a walk and you will get a number after someone sees the beds.' },
            { who: 'Them', text: 'Tuesday after 4?' },
            { who: 'AI', text: 'Tuesday at 4:30 PM is open for the walk. Book it?' },
          ],
        },
      ],
      note: 'Sample prices. Planting, drainage, and hardscape are a walk, not a mow price invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Olathe weeklys', detail: 'Route A · six stops' },
        { time: '11:30 AM', name: 'Shawnee biweekly', detail: 'Route B · new, dog inside' },
        { time: '2:00 PM', name: 'Lenexa mulch walk', detail: 'No price yet' },
        { time: 'Sat AM', name: 'Brookside leaves', detail: 'Haul-away · two maples' },
      ],
      flash: 'New · call at 3:11 PM · Shawnee biweekly, fenced, cleanup first, Thursday.',
      leads: [
        { stage: 'New', detail: 'Lenexa beds · text · walk Tuesday' },
        { stage: 'First cut', detail: 'Shawnee · voice · Thursday' },
        { stage: 'Booked', detail: 'Brookside leaves · chat · Saturday' },
        { stage: 'Route', detail: 'Olathe weekly · Route A' },
      ],
      reviewTitle: 'Queued after the Shawnee first cut is marked done',
      reviewBody:
        'Thanks for having Fairway Lane on the lawn. If the cut earned it, a short Google review helps the next neighbor find a route.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for lawn routes',
  jobsTitle: 'The work you actually schedule.',
  jobsLede: 'Mows and straightforward cleanups can sit in a band. Installs and anything you have to see are walks.',
  jobs: [
    { title: 'Weekly and biweekly mows', body: 'Lot, fence, dog, and whether the first visit is a cleanup. Quoted inside the bands for a route you already run.' },
    { title: 'Cleanups', body: 'Spring and fall. Haul-away versus curb. A normal yard can be a band. A steep or packed yard is a look.' },
    { title: 'Leaves', body: 'Tree count and whether you are hauling. The line does not promise a price for a wooded acre.' },
    { title: 'Mulch', body: 'If it is beds you already maintain, it can follow your per-yard number. A new bed is a walk.' },
    { title: 'Fertilizer and weeds', body: 'Only if you sell it. The line uses your program names and does not invent a treatment.' },
    { title: 'Landscape installs', body: 'Planting, patios, and drainage are booked as a walk. No mow price on a construction job.' },
  ],
  will: [
    'I put this together for lawn companies around Kansas City. You are on a mower, with the hearing protection on, when the next lawn calls. They hire the truck that answers.',
    'The demo is half an hour, on a lawn company, with your mow bands and the jobs you will only price in the yard. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a biweekly mow, a leaf cleanup, and a planting they want priced blind, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'Will it quote a lot it has not seen?',
        a: 'Only inside bands you approve for a “normal” lot, and it asks the questions you use to define normal: fence, slope, dog, how overgrown. Anything outside that is a walk. On Starter it does not quote. It texts you the lead. You hear the test calls first.',
      },
      {
        q: 'Can it put a lawn on the right route?',
        a: 'It can offer the days you have opened for that part of town. It does not invent a stop on a route that is already over full. On Growth, the new stop shows on the dashboard with the route you assigned in the rules.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. Between stops, you can pick up. While the mower is running, it answers.',
      },
    ],
    'trucks',
    'mowing',
  ),
  finalTitle: 'See it on a route you are already running.',
  finalBody:
    'Thirty minutes with Will. A lawn company on the screen, your mow bands and your walk rules. If it is not a fit, you still leave knowing what the missed lawns are worth.',
}

export default trade
