import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'painters',
  navLabel: 'Painters',
  vehicle: 'trucks',
  keepDoing: 'painting',
  metadata: {
    title: 'AI Receptionist for Painters in Kansas City | FrontDesk AI',
    description:
      'AI receptionist for Kansas City painters. The line answers on a ladder or while cutting in. Straightforward rooms can sit in a band. Bad walls get a walk.',
    ogTitle: 'AI Receptionist for Painters in Kansas City | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City painters. The line answers on a ladder or while cutting in. Straightforward rooms can sit in a band. Bad walls get a walk.',
    ogImage: '/og/painters.png',
    ogAlt: 'FrontDesk AI for Kansas City painters: the phone is answered while the brush is in your hand.',
  },
  hero: {
    kicker: 'For Kansas City painters',
    title: 'The phone gets answered while the brush is in your hand.',
    lede: 'You are on a ladder or cutting in a line, and the next estimate is calling someone who picks up. Will builds the front office from Olathe. Starter takes the message and texts you the lead. Pro asks about rooms, ceilings, and condition, quotes inside your bands, and books the walk when the walls are a mess. Growth adds the dashboard.',
  },
  heroAside: {
    kicker: 'While the wall is wet',
    lines: [
      'Cutting in a Lenexa colonial. The phone is downstairs in a bucket.',
      'On an extension ladder on the shady side of a Prairie Village house.',
      'Spraying cabinets in a garage in Olathe, with the respirator on.',
    ],
    footnote: 'Fieldhouse Painting is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'The next estimate calls whoever answers.',
  leakLede:
    'A repaint is easy to postpone, and easy to give to the painter who called back first. You are on the ladder.',
  calculatorIntro:
    'Calls, the share you miss, and a typical job you would have sold. The result is illustrative. A whole-house exterior or a commercial suite belongs in the number only if that is the call you miss.',
  stats: tradeStats({
    stat: '$2,000',
    label: 'illustrative value of one missed interior repaint',
    context:
      'Illustrative, not a study and not your rate card. A straightforward few rooms often lands in this neighborhood. Exteriors, cabinets, and damaged walls are priced after someone sees them.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo', callsPerWeek: 6, missedPercent: 45, averageJob: 900, repeatMonthly: 0 },
      { id: 'crew', label: 'Crew', callsPerWeek: 12, missedPercent: 40, averageJob: 2200, repeatMonthly: 0 },
      { id: 'mixed', label: 'Interior and exterior', callsPerWeek: 18, missedPercent: 35, averageJob: 3400, repeatMonthly: 0 },
    ],
    defaultPresetId: 'crew',
    calls: { min: 2, max: 40, step: 1, hint: 'Estimate requests, color questions, and the texts that arrive while a wall is wet.' },
    missed: missedRange(),
    job: {
      min: 400,
      max: 15000,
      step: 50,
      label: 'Average job value',
      hint: 'A typical repaint you would have sold from that call, not your biggest commercial bid.',
    },
    repeat: null,
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while the brush is in your hand. The plan decides whether you get a text or a walk already booked.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'Three bedrooms and a hall. An exterior that has not been painted since the last owner. A cabinet job. You are not wiping your hands to answer.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It asks what changes the price',
      body: 'Starter texts you rooms, city, and a callback number. Pro and Growth ask ceilings, trim, occupied or empty, and whether the walls are in decent shape. A straightforward repaint can sit in a band. Peeling, repairs, and cabinets are booked as a walk.',
      extra: { type: 'note', text: 'Pro sample only · 3 rooms and a hall · $1,800–$2,600 · walk Thursday 5:30' },
    },
    {
      title: 'The estimate is on the board',
      body: 'On Pro the lead sits in the GoHighLevel pipeline. On Growth the dashboard shows walks, rooms already sold, and the exteriors that still need eyes on the siding.',
      extra: {
        type: 'rows',
        rows: [
          { left: '8:00 · Olathe bedrooms', right: 'Crew A' },
          { left: '5:30 · Lenexa walk', right: 'You' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional shop, Fieldhouse Painting, so the evening has a shape without using a real company’s name.',
  before: [
    '4:40 PM. You are cutting in. The call goes to voicemail.',
    'They wanted three bedrooms priced tonight. They book the painter who answered.',
    'Every number waits on you, because the condition of the walls is in your head.',
    'Tomorrow’s rooms are a text thread with the crew.',
    'The review ask waits until you remember the homeowner’s name.',
  ],
  after: [
    'The same call is answered. A walk is on Thursday at 5:30, or a band if the walls are straightforward.',
    'You get a text: Lenexa, three bedrooms and a hall, occupied, ceilings included.',
    'Peeling siding becomes a walk, not a guessed exterior price.',
    'Crew A can see which rooms are sold.',
    'The review text sends when the job is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Fieldhouse Painting. Quoting is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Fieldhouse Painting',
    short: 'Fieldhouse',
    initial: 'F',
    site: 'fieldhouse.example',
    call: {
      time: '4:40 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Fieldhouse Painting. This is Maya. What are you hoping to paint?' },
        { who: 'Caller', text: 'Three bedrooms and the hall in a Lenexa colonial. What would a repaint be?' },
        { who: 'AI', text: 'Are the ceilings included, and is the house occupied? How are the walls — hairline cracks, or peeling?' },
        { who: 'Caller', text: 'Ceilings yes. We live here. Walls are in decent shape. Trim too, if that is normal.' },
        { who: 'AI', text: 'A straightforward repaint like that usually lands between $1,800 and $2,600. If we find repairs, we stop and price those before painting. I can book a walk Thursday at 5:30 PM to lock it.' },
        { who: 'Caller', text: 'Thursday works.' },
        { who: 'AI', text: 'Booked. Thursday at 5:30, Lenexa. A confirmation text is on the way.' },
      ],
      headline: 'Answered at 4:40 PM, while the wall was still wet.',
      body: 'The Pro line asks ceilings, occupancy, and condition before it uses a band. Repairs and bad walls become a walk. It does not invent an exterior price from a sentence.',
      note: 'Sample range only. Your bands, not a published rate. Fieldhouse Painting is fictional.',
    },
    chat: {
      time: '7:20 PM',
      introTitle: 'Rooms, exteriors, and cabinets.',
      intro: 'On Pro and Growth, the site chat and a text to the business number use the same bands and the same “we have to see it” rules.',
      groupLabel: 'Try a painting job',
      scenarios: [
        {
          id: 'rooms',
          label: 'Rooms',
          lines: [
            { who: 'Them', text: 'Three bedrooms and a hall in Lenexa. Repaint. What is that?' },
            { who: 'AI', text: 'Ceilings included? Occupied or empty? Any peeling, or mostly scuffs?' },
            { who: 'Them', text: 'Ceilings yes. We live here. Walls are fine.' },
            { who: 'AI', text: 'That usually lands between $1,800 and $2,600. Thursday at 5:30 PM is open for a walk to lock the number. Book it?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday 5:30, Lenexa.' },
          ],
        },
        {
          id: 'exterior',
          label: 'Exterior',
          lines: [
            { who: 'Them', text: 'Two-story in Prairie Village. The south side is peeling. Ballpark?' },
            { who: 'AI', text: 'I will not guess an exterior with peeling. I can book a walk and look at the siding, the height, and what needs scraped.' },
            { who: 'Them', text: 'Saturday late morning?' },
            { who: 'AI', text: 'Saturday at 11:00 AM is open. A person prices it after the walk. Book that?' },
          ],
        },
        {
          id: 'cabinets',
          label: 'Cabinets',
          lines: [
            { who: 'Them', text: 'Kitchen cabinets in Overland Park. Maybe 25 doors. Can you spray them?' },
            { who: 'AI', text: 'We spray cabinets. The price depends on the doors and the condition, so I will not invent one. Tuesday at 4:00 PM is open for a look. Book it?' },
            { who: 'Them', text: 'Yes.' },
            { who: 'AI', text: 'Booked. Tuesday 4:00, Overland Park. The note says about 25 doors.' },
          ],
        },
      ],
      note: 'Sample prices. Peeling exteriors and cabinets are a walk, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Olathe bedrooms', detail: 'Crew A · occupied' },
        { time: '11:00 AM', name: 'Prairie Village walk', detail: 'Exterior · peeling south side' },
        { time: '2:00 PM', name: 'Shawnee touch-up', detail: 'Crew B · one room' },
        { time: '5:30 PM', name: 'Lenexa walk', detail: 'Booked by the voice line' },
      ],
      flash: 'New · chat at 7:21 PM · Overland Park cabinets, about 25 doors, Tuesday at 4:00.',
      leads: [
        { stage: 'New', detail: 'Cabinets · Overland Park · look Tuesday' },
        { stage: 'Walk', detail: 'Lenexa rooms · voice · Thu 5:30' },
        { stage: 'Sold', detail: 'Olathe bedrooms · Crew A' },
        { stage: 'Walk', detail: 'Prairie Village exterior · Saturday' },
      ],
      reviewTitle: 'Queued after the Olathe bedrooms are marked done',
      reviewBody:
        'Thanks for having Fieldhouse in the house. If the paint earned it, a short Google review helps the next neighbor who is ready to repaint.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for painters',
  jobsTitle: 'The jobs you actually bid.',
  jobsLede: 'Straightforward interiors can sit in a band. Anything with damage, height, or cabinets gets a walk.',
  jobs: [
    { title: 'Interior rooms', body: 'Count, ceilings, trim, occupied or empty, and whether the walls are sound. A clean repaint can be quoted inside your band.' },
    { title: 'Exteriors', body: 'Stories, siding, and how much is peeling. Booked as a walk. No price from a sentence about “the south side.”' },
    { title: 'Cabinets', body: 'Door count and whether you are spraying on site or in the shop. The look is booked. The number waits.' },
    { title: 'Color consults', body: 'If you sell the hour, the line can book it. It does not pick colors.' },
    { title: 'Repairs before paint', body: 'Drywall, water stains, and failed caulk are flagged so a maintenance price is not given for a repair job.' },
    { title: 'Commercial suites', body: 'Square footage and after-hours access. A walk, then your bid.' },
  ],
  will: [
    'I put this together for painters around Kansas City. You are on a ladder or cutting in when the next estimate calls. They do not leave a voicemail. They book the painter who answers.',
    'The demo is half an hour, on a painting company, with the rooms you will price from a description and the jobs you will only price in person. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a few rooms, an exterior, and a cabinet job, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'Will it underprice a bad wall?',
        a: 'Only if you tell it to, and you should not. On Pro and Growth it uses bands for straightforward work and books a walk when you have said the condition is unknown or poor. On Starter it does not quote. It texts you the lead. You hear the test calls before any of that is live.',
      },
      {
        q: 'Can it talk about paint brands and sheen?',
        a: 'Yes, in the words you approve. It can explain the line you actually spray and the sheens you recommend for baths and trim. It does not freelance a product you do not sell.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. When your hands are free and you want the conversation, you take it. When you are on the ladder, it answers.',
      },
    ],
    'trucks',
    'painting',
  ),
  finalTitle: 'See it on a wall you are already painting.',
  finalBody:
    'Thirty minutes with Will. A painting company on the screen, your bands and your walk rules in the conversation. If it is not a fit, you still leave knowing what the missed estimates are worth.',
}

export default trade
