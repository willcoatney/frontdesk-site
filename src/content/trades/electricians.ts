import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'electricians',
  navLabel: 'Electricians',
  vehicle: 'trucks',
  keepDoing: 'running calls',
  metadata: {
    title: 'Answered while you are on the ladder — FrontDesk AI for electricians',
    description:
      'A front office for Kansas City electricians. The line answers while you are on a ladder or in a panel. Starter texts you the lead. Pro quotes service work and books the visit. Built in Olathe.',
    ogTitle: 'Answered while you are on the ladder',
    ogDescription:
      'FrontDesk AI for Kansas City electricians. The phone is covered while you are in a panel. Plans from $197 a month. Book a demo with Will in Olathe.',
    ogImage: '/og/electricians.png',
    ogAlt: 'FrontDesk AI for Kansas City electricians: the phone is answered while you are on the ladder.',
  },
  hero: {
    kicker: 'For Kansas City electricians',
    title: 'The phone gets answered while you are on the ladder.',
    lede: 'A panel, an attic, a crawlspace. You cannot pick up, and a homeowner with the lights out will not wait on voicemail. Will builds the front office from Olathe: Starter takes the message and texts you the lead. Pro quotes inside your service-call bands and books the window. Growth adds a dashboard fed by the line and the CRM.',
  },
  heroAside: {
    kicker: 'While the tools are in your hands',
    lines: [
      'On a ladder in a Prairie Village stairwell. The phone rings in the pouch.',
      'Under a house in Shawnee, tracing a dead circuit.',
      'Between a panel upgrade and a ceiling-fan add, with both hands on the wheel.',
    ],
    footnote: 'Hearthline Electric is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'A dead circuit does not wait on voicemail.',
  leakLede:
    'You are on a ladder or in a panel. The next caller has half the kitchen dark. They call the next truck on the map.',
  calculatorIntro:
    'Calls, the share you miss, and a typical job. The result is illustrative. Follow-up work, panels, and rewires are not added on top, so the figure stays on the first job.',
  stats: tradeStats({
    stat: '$400',
    label: 'illustrative value of one missed service call',
    context:
      'Illustrative, not a study and not your rate card. A troubleshooting visit often lands in this neighborhood. Panels, chargers, and rewires are more, and the line should not invent those prices.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo van', callsPerWeek: 8, missedPercent: 55, averageJob: 320, repeatMonthly: 0 },
      { id: 'busy', label: 'Busy residential', callsPerWeek: 16, missedPercent: 45, averageJob: 480, repeatMonthly: 0 },
      { id: 'mixed', label: 'Service and remodels', callsPerWeek: 28, missedPercent: 35, averageJob: 750, repeatMonthly: 0 },
    ],
    defaultPresetId: 'busy',
    calls: { min: 4, max: 60, step: 1, hint: 'Service calls, estimate requests, and the texts that come in from the truck.' },
    missed: missedRange(),
    job: {
      min: 120,
      max: 4000,
      step: 10,
      label: 'Average job value',
      hint: 'A typical service call or small job. Leave the whole rewire out unless that is the call you actually miss.',
    },
    repeat: null,
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are on the job. The plan decides whether the line only takes a message or quotes and books.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'A homeowner with a tripping breaker. A realtor who needs a panel looked at before closing. A text about an EV charger. Nights included.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It asks what changes the visit',
      body: 'Starter texts you the address, the symptom, and a callback number. Pro and Growth ask which circuit, how old the panel is, and whether they need a window tonight. A service call can be quoted inside a band you set. A panel, a charger, or a rewire is booked as a look, not a made-up bid.',
      extra: { type: 'note', text: 'Pro sample only · service call · $150–$275 before parts · tonight 7:30–9:30' },
    },
    {
      title: 'You see the lead before the next stop',
      body: 'On Pro the lead sits in the GoHighLevel pipeline. On Growth the custom dashboard shows the day: service calls, estimates, and the after-hours window, fed by the voice line and the CRM.',
      extra: {
        type: 'rows',
        rows: [
          { left: '8:00 · Olathe breaker', right: 'Service' },
          { left: '11:30 · Lenexa charger estimate', right: 'Look first' },
        ],
      },
    },
  ],
  beforeAfterLede:
    'A fictional shop, Hearthline Electric, so you can see the shape of the evening without borrowing a real contractor’s name.',
  before: [
    '7:12 PM. You are on a ladder. The call buzzes and goes to voicemail.',
    'They needed a breaker looked at tonight. They book the next company.',
    'A panel price lives in your head, so every estimate waits until you call back.',
    'Tomorrow’s stops are a thread of texts with the apprentice.',
    'The review ask happens if you remember in the driveway.',
  ],
  after: [
    'The same call is answered. A service window is held for 7:30 to 9:30.',
    'The owner gets a text with the address, the symptom, and the panel age.',
    'A Lenexa charger is an estimate on the calendar, not a price invented on the phone.',
    'The day is readable between stops.',
    'The review text sends when the service call is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Hearthline Electric. Quoting is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Hearthline Electric',
    short: 'Hearthline',
    initial: 'H',
    site: 'hearthline.example',
    call: {
      time: '7:12 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Hearthline Electric. This is Maya. What is going on at the house?' },
        { who: 'Caller', text: 'The kitchen breaker keeps tripping. We are in Prairie Village. Can someone come tonight?' },
        { who: 'AI', text: 'I can take that. Is it one circuit, and about how old is the panel?' },
        { who: 'Caller', text: 'One kitchen circuit. The panel is from the nineties, I think.' },
        { who: 'AI', text: 'A service call like that is usually quoted between $150 and $275 before parts, once we see it. I will not price a panel over the phone. I can hold 7:30 to 9:30 tonight and text the owner.' },
        { who: 'Caller', text: 'Hold it.' },
        { who: 'AI', text: 'You are on the board for 7:30 to 9:30. A text is on the way to you and to the owner.' },
      ],
      headline: 'Answered at 7:12 PM, while you were still on the ladder.',
      body: 'The Pro line asks the questions that change an electrical visit: which circuit, panel age, and whether they need a window tonight. It quotes only inside the service-call band you set. It does not invent a panel price.',
      note: 'Sample range only. Your bands, not a published rate. Hearthline Electric is fictional.',
    },
    chat: {
      time: '8:40 PM',
      introTitle: 'Service calls, panels, and chargers.',
      intro: 'On Pro and Growth, the chat on the site and a text to the business number use the same rules.',
      groupLabel: 'Try an electrical job',
      scenarios: [
        {
          id: 'breaker',
          label: 'Breaker',
          lines: [
            { who: 'Them', text: 'Kitchen breaker keeps tripping in Prairie Village. Can you come tonight?' },
            { who: 'AI', text: 'I can help. One circuit, or more than one? About how old is the panel?' },
            { who: 'Them', text: 'Just the kitchen. Panel is older. 1990s.' },
            { who: 'AI', text: 'A service call like that is usually $150–$275 before parts. I will not price a panel on a text. 7:30–9:30 tonight is open. Hold it?' },
            { who: 'Them', text: 'Yes.' },
            { who: 'AI', text: 'Held. Prairie Village, 7:30–9:30. The owner has the text.' },
          ],
        },
        {
          id: 'charger',
          label: 'EV charger',
          lines: [
            { who: 'Them', text: 'We want a charger in the garage in Olathe. What does that run?' },
            { who: 'AI', text: 'I need to know the panel before anyone prices a charger. I can book a look and ask the amperage questions then.' },
            { who: 'Them', text: 'Saturday morning?' },
            { who: 'AI', text: 'Saturday at 9:00 AM is open for the estimate. A person prices it after seeing the panel. I will not guess a number here.' },
          ],
        },
        {
          id: 'fan',
          label: 'Ceiling fan',
          lines: [
            { who: 'Them', text: 'Can you swap a ceiling fan in Lenexa this week? There is already a box.' },
            { who: 'AI', text: 'Yes, if the box is fan-rated. A straight swap like that is usually $180–$280 before the fan. Thursday at 2:00 PM is open. Book it?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday 2:00 PM, Lenexa. If the box is not fan-rated, the tech will stop and tell you before any extra work.' },
          ],
        },
      ],
      note: 'Sample prices. A panel or a charger is a look, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Olathe breaker', detail: 'Service call · one circuit' },
        { time: '11:30 AM', name: 'Lenexa EV estimate', detail: 'Look first · panel unknown' },
        { time: '2:00 PM', name: 'Shawnee ceiling fan', detail: 'Swap · existing box' },
        { time: '7:30 PM', name: 'Prairie Village window', detail: 'Held by the voice line' },
      ],
      flash: 'New · text at 8:41 PM · Olathe garage charger, estimate Saturday at 9:00.',
      leads: [
        { stage: 'New', detail: 'Olathe charger · text · panel not seen' },
        { stage: 'Window', detail: 'Prairie Village · voice · tonight 7:30' },
        { stage: 'Booked', detail: 'Shawnee fan · chat · Thursday' },
        { stage: 'Estimate', detail: 'Lenexa EV · Saturday 9:00' },
      ],
      reviewTitle: 'Queued after the Olathe service call is marked done',
      reviewBody:
        'Thanks for having Hearthline out today. If the visit earned it, a short Google review helps the next neighbor with the lights out.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for electrical shops',
  jobsTitle: 'The calls you actually run.',
  jobsLede: 'Service work can sit inside a band. Anything that needs eyes on the panel does not get a made-up price.',
  jobs: [
    { title: 'Troubleshooting', body: 'Tripping breakers, dead outlets, flickering lights. It captures the circuit and the timing, and quotes only inside your service-call band.' },
    { title: 'Panels', body: 'Age, brand if they know it, and what is failing. The visit is booked. The price waits until you open the cover.' },
    { title: 'EV chargers', body: 'Garage, panel capacity, and how they drive. An estimate on the calendar, not a charger price over the phone.' },
    { title: 'Fans and fixtures', body: 'A straight swap can sit in a small band. A missing box or a remodel is flagged before anyone promises a number.' },
    { title: 'Remodels and rough-in', body: 'It takes the scope and books the walk. You bid it after you see the walls.' },
    { title: 'After-hours windows', body: 'It can hold a window and text you. It does not dispatch a truck you do not have on the road.' },
  ],
  will: [
    'I put this together for electricians around Kansas City. You are usually on a ladder, in a panel, or under a house when the next customer calls. They do not leave a voicemail. They call the next truck.',
    'The demo is half an hour, on an electrical company, with your service-call bands and the jobs you refuse to price blind. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a tripping breaker, a ceiling fan, and a panel someone wants priced sight unseen. You say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'Will it invent a price for a panel or a rewire?',
        a: 'No. On Pro and Growth it quotes only inside bands you approve, which for most shops means service calls and small swaps. Panels, chargers, and rewires are booked as a look. On Starter it does not quote at all. It texts you the lead. Nothing goes live until you have heard the test calls.',
      },
      {
        q: 'What about a real emergency?',
        a: 'The line can take the address, what is sparking or dead, and whether anyone is safe, then text you immediately. It does not promise a truck that is not available. You decide whether to roll. If you want those calls handed to your phone, we set that rule.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. You can pick up, and you can have the line hand a call to you when a person should decide. When you are on a ladder, it answers. When you want the phone, you take it.',
      },
    ],
    'trucks',
    'running calls',
  ),
  finalTitle: 'See it on a night you are already booked.',
  finalBody:
    'Thirty minutes with Will. An electrical company on the screen, your service calls in the conversation. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
