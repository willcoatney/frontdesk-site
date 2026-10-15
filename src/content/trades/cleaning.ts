import { BOOK_RATE, BOOK_RATE_LABEL, callsRange, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'cleaning',
  navLabel: 'Cleaning',
  vehicle: 'vans',
  keepDoing: 'cleaning',
  metadata: {
    title: 'More booked cleans, without a receptionist — FrontDesk AI',
    description:
      'A done-for-you front office for Kansas City cleaning companies. The line answers while you are in a house. Starter takes the message. Pro quotes and books. Book a 30-minute demo.',
    ogTitle: 'More booked cleans, without a receptionist',
    ogDescription:
      'Website, voice, chat and text, and a crew dashboard for Kansas City cleaning companies. Plans from $197 a month. Book a 30-minute demo with Will.',
    ogImage: '/og/cleaning.png',
    ogAlt:
      'FrontDesk AI for cleaning companies: more booked cleans, without hiring a receptionist. Every call and message answered instantly.',
  },
  hero: {
    kicker: 'For Kansas City cleaning companies',
    title: 'More booked cleans, without hiring a receptionist.',
    lede: 'Will builds the front office from Olathe. A site for the services you sell, and a voice line that answers while you are in a house. Starter takes the message and texts you the lead. Pro quotes and books, with chat, text, and a GoHighLevel pipeline. Growth adds the crew dashboard.',
  },
  film: {
    src: '/videos/frontdesk-cleaning-v2-film.mp4',
    poster: '/videos/frontdesk-cleaning-v2-film-poster.jpg',
    width: 1920,
    height: 1080,
    aria: 'Narrated film: a night at a fictional Kansas City cleaning company, with and without FrontDesk AI',
    caption:
      'About 90 seconds, narrated. A 9:47 PM call, a late website chat, and a commercial walkthrough. Dollar figures in the film are illustrative. Sparkle KC Cleaning is fictional.',
  },
  leakTitle: 'Every missed call is a missed clean.',
  leakLede:
    'You are in a house or on a floor. The person who would answer is holding a vacuum. The next customer does not wait.',
  calculatorIntro:
    'Calls, the share you miss, a typical job, and what a recurring client is worth. The result is illustrative. It is there so the cost is yours, not a generic statistic.',
  stats: tradeStats({
    stat: '$200+',
    label: 'illustrative value of one missed first clean',
    context:
      'Illustrative, not a measured average. A first visit often lands in that neighborhood, and a biweekly client is worth more than one visit. Put your own numbers in the calculator.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo crew', callsPerWeek: 12, missedPercent: 50, averageJob: 160, repeatMonthly: 280 },
      { id: 'busy', label: 'Busy residential', callsPerWeek: 24, missedPercent: 40, averageJob: 185, repeatMonthly: 320 },
      { id: 'mixed', label: 'Homes and offices', callsPerWeek: 40, missedPercent: 35, averageJob: 240, repeatMonthly: 520 },
    ],
    defaultPresetId: 'busy',
    calls: { ...callsRange(), max: 80 },
    missed: missedRange(),
    job: {
      min: 80,
      max: 600,
      step: 5,
      label: 'Average job value',
      hint: 'A typical first clean or one-time job, not the whole route.',
    },
    repeat: {
      min: 100,
      max: 2000,
      step: 10,
      label: 'Recurring client, per month',
      hint: 'What one client who stays is worth each month. A $150 biweekly visit is about $325.',
      share: 1 / 4,
      shareLabel: '1 in 4',
      noun: 'new recurring clients',
    },
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'Three steps. The same system can cover the phone, the website, and the crew. What is turned on depends on the plan.',
  steps: [
    {
      title: 'They reach you',
      body: 'A call to the number on the van. A chat on the website, on Pro and Growth. A text to the business line. Nights and Sundays included.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'The line handles it the way you set',
      body: 'Starter takes the message and texts you the lead, and a missed call gets a text-back. Pro and Growth ask beds, baths, pets, city, and how often. They quote inside the ranges you set. If the job needs a walkthrough, they book that instead of inventing a price.',
      extra: { type: 'note', text: 'Pro sample only · biweekly · $145–$175 · Thursday 6:30 PM' },
    },
    {
      title: 'The lead has a home',
      body: 'On Pro, the estimate lands in the GoHighLevel pipeline, and a review text can go out when the job is marked done. On Growth, the custom dashboard also shows the crew calendar, with a team and a buffer between houses.',
      extra: {
        type: 'rows',
        rows: [
          { left: '8:30 · Brookside recurring', right: 'Team B' },
          { left: '11:00 · Shawnee move-out', right: 'Team A' },
        ],
      },
    },
  ],
  beforeAfterLede:
    'A fictional shop, Sparkle KC Cleaning, so you can see the shape of the day without borrowing a real company’s name.',
  before: [
    '9:47 PM. You are locking up a house. The call goes to voicemail.',
    'A chat about a move-out waits until morning. They book someone else.',
    'Every price waits on you, because the bands live in your head.',
    'Tomorrow’s route is a thread of texts.',
    'The review ask happens if you remember on Friday.',
  ],
  after: [
    'The same call is answered. A biweekly estimate is on Thursday at 6:30.',
    'The chat books a Shawnee move-out at 10:31 PM.',
    'An office in Lenexa becomes a walkthrough, not a guessed price.',
    'Team A and Team B have the day, with drive time between houses.',
    'The review text sends when the clean is marked done.',
  ],
  demosLede:
    'Tap through a sample call, a website chat, and the dashboard. Built in the page, not a screenshot. Sparkle KC Cleaning is fictional. Quoting is the Pro sample. The crew dashboard is the Growth sample.',
  demos: {
    company: 'Sparkle KC Cleaning',
    short: 'Sparkle KC',
    initial: 'S',
    site: 'sparkle-kc.example',
    call: {
      time: '9:47 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Sparkle KC Cleaning. This is Maya. How can I help you tonight?' },
        { who: 'Caller', text: 'I need a price for a recurring clean. Three bedrooms in Overland Park.' },
        { who: 'AI', text: 'Weekly, or every other week? And how many baths — any pets?' },
        { who: 'Caller', text: 'Every other week. Two baths, and we have a dog.' },
        { who: 'AI', text: 'That biweekly clean usually lands between $145 and $175 a visit. I can book a free in-home estimate Thursday at 6:30 PM and lock the price.' },
        { who: 'Caller', text: 'Thursday works.' },
        { who: 'AI', text: 'You are booked for Thursday at 6:30 PM. A confirmation text is on the way, and the estimate is on the crew calendar.' },
      ],
      headline: 'Answered at 9:47 PM. Quoted. Booked.',
      body: 'The Pro voice asks the questions that change a cleaning price: cadence, baths, pets, and city. It quotes only inside the bands you set, then puts the estimate where your plan keeps leads. Starter would take the message and text you instead of quoting.',
      note: 'Sample range only. Your bands, not a published rate. Sparkle KC Cleaning is fictional.',
    },
    chat: {
      time: '10:30 PM',
      introTitle: 'Homes and offices, cleaned.',
      intro: 'On Pro and Growth, the same chat sits in the corner of the marketing site. A text to the business number gets the same reply.',
      groupLabel: 'Try a cleaning job',
      scenarios: [
        {
          id: 'recurring',
          label: 'Recurring',
          lines: [
            { who: 'Them', text: 'Do you do recurring cleans? 3 bed in Overland Park.' },
            { who: 'AI', text: 'Yes. Weekly or every other week — and how many baths? Any pets?' },
            { who: 'Them', text: 'Every other week. Two baths, and a dog.' },
            { who: 'AI', text: 'A biweekly clean like that usually lands between $145 and $175 a visit. Thursday at 6:30 PM is open for a free estimate. Book it?' },
            { who: 'Them', text: 'Yes, book it.' },
            { who: 'AI', text: 'Booked. Thursday 6:30 PM, Overland Park. It is on the crew calendar.' },
          ],
        },
        {
          id: 'moveout',
          label: 'Move-out',
          lines: [
            { who: 'Them', text: 'Do you do move-out cleans? 2 bed, 1 bath in Shawnee. Saturday morning?' },
            { who: 'AI', text: 'Yes. How does the place look — maintenance clean, or a full move-out with appliances?' },
            { who: 'Them', text: 'Full move-out. Empty, appliances included.' },
            { who: 'AI', text: 'A 2-bed move-out like that is usually $280–$340. Saturday at 9:00 AM is open. Book it?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Saturday 9:00 AM. Team A has the Shawnee move-out.' },
          ],
        },
        {
          id: 'office',
          label: 'Office',
          lines: [
            { who: 'Them', text: 'We need a nightly clean for a small office in Lenexa. What would that run?' },
            { who: 'AI', text: 'We do commercial. I will not guess a price without seeing the space. I can book a walkthrough.' },
            { who: 'Them', text: 'Tuesday after 5?' },
            { who: 'AI', text: 'Tuesday at 5:30 PM is open. I will put the walkthrough on the calendar and text you. A person confirms the bid after the walk.' },
          ],
        },
      ],
      note: 'Sample prices. An office bid is a walkthrough, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:30 AM', name: 'Brookside recurring', detail: 'Team B · biweekly' },
        { time: '11:00 AM', name: 'Shawnee move-out', detail: 'Team A · booked in chat' },
        { time: '2:00 PM', name: 'Plaza deep clean', detail: 'Team B · one-time' },
        { time: '6:30 PM', name: 'Overland Park estimate', detail: 'Booked by the voice line' },
      ],
      flash: 'New · website chat at 10:31 PM · 2-bed move-out in Shawnee, on Saturday.',
      leads: [
        { stage: 'New', detail: 'Lenexa office · text · walkthrough requested' },
        { stage: 'Estimate', detail: 'Overland Park · voice · Thu 6:30' },
        { stage: 'Won', detail: 'Shawnee move-out · chat · Saturday' },
        { stage: 'Recurring', detail: 'Brookside · biweekly · Team B' },
      ],
      reviewTitle: 'Queued after the Shawnee move-out is marked done',
      reviewBody:
        'Thanks for having Sparkle KC out today. If the clean earned it, a short Google review helps other neighbors find us.',
      reviewNote:
        'You approve the wording once. An unhappy reply comes back to you before it becomes a public complaint. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for cleaning',
  jobsTitle: 'The jobs you actually run.',
  jobsLede: 'Residential routes, commercial nights, or both. The line knows the difference.',
  jobs: [
    { title: 'Recurring, biweekly', body: 'Weekly or every other week, baths, pets, and the city. It books the route.' },
    { title: 'Move-outs', body: 'Beds, baths, condition, and the day they need the keys. It quotes inside your band or holds the slot.' },
    { title: 'Deep cleans', body: 'What “deep” means for your company, so a one-time clean is not priced like a maintenance visit.' },
    { title: 'Commercial walkthroughs', body: 'No made-up bid. It captures the building and books the walk. You price it after you see it.' },
    { title: 'Crew dispatch', body: 'On Growth, teams, travel buffers, and a day you can read on your phone between houses.' },
    { title: 'Review requests', body: 'On Pro and Growth, when a job is marked done, the customer gets a text in wording you approved.' },
  ],
  will: [
    'I put this together for cleaning company owners around Kansas City. You are usually in a house, or on a floor, when the next customer calls. They do not leave a voicemail. They call the next company.',
    'The demo is half an hour, on a cleaning company, with your services and your crews. If it is not a fit, say so. I would rather you know what the missed calls are worth than sit through a pitch.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on your work — biweekly, deep, move-out, and a commercial walkthrough — and you say what sounds off. It asks the questions a sharp office person would ask. It is still a voice on a phone. The demo is the fastest way to decide if you would put it on your vans.',
      },
      {
        q: 'What if it gets something wrong?',
        a: 'On Pro and Growth it quotes only inside the ranges you approve. Outside those ranges it does not invent a price. It books the walkthrough or the estimate and texts you. On Starter it does not quote. It takes the message and texts you the lead. Nothing goes live until you have heard the test calls.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. You can pick up, and you can have the line hand a call to you when a person should decide. When you are on a job, it answers. When you want the phone, you take it.',
      },
      {
        q: 'What if a job needs a walkthrough before anyone can price it?',
        a: 'That is a normal cleaning call. Commercial bids, and homes outside your bands, are booked as walkthroughs or in-home estimates. The line captures the details and puts them where you will see them. You set the price after you see the place.',
      },
    ],
    'vans',
    'cleaning',
  ),
  finalTitle: 'See it on your routes.',
  finalBody:
    'Thirty minutes with Will. A cleaning company on the screen, your services in the conversation. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
