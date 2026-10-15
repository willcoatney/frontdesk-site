import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const areaCodeFaq = {
  q: 'Do you cover 816 and 913?',
  a: 'Yes. FrontDesk is run from Olathe, on the Kansas side, for both sides of the state line. We forward the number already on the truck, whether it is 913 or 816. If you would rather add a local number, we can. Customers keep dialing what is on the truck and the Google listing.',
}

const trade: TradeConfig = {
  slug: 'plumbers',
  navLabel: 'Plumbers',
  vehicle: 'trucks',
  keepDoing: 'on the call',
  metadata: {
    title: 'AI Receptionist for Plumbers in Kansas City | FrontDesk AI',
    description:
      'AI receptionist for Kansas City plumbers. Answers under a sink or in a crawlspace, on 913 and 816 numbers. Starter texts the lead. Pro books the window.',
    ogTitle: 'AI Receptionist for Plumbers in Kansas City | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City plumbers. Answers under a sink or in a crawlspace, on 913 and 816 numbers. Starter texts the lead. Pro books the window.',
    ogImage: '/og/plumbers.png',
    ogAlt: 'FrontDesk AI for Kansas City plumbers: the phone is answered while you are under the sink.',
  },
  hero: {
    kicker: 'For Kansas City plumbers',
    title: 'The phone gets answered while you are under the sink.',
    lede: 'A shutoff, a crawlspace, a water heater that let go. You cannot pick up, and a homeowner with water on the floor will call the next truck. Will builds the front office from Olathe, for 913 and 816 numbers. Starter takes the message and texts you the lead. Pro quotes a service call inside your bands and books the window. It does not invent a repipe price.',
  },
  heroAside: {
    kicker: 'While the water is off',
    lines: [
      'Under a kitchen sink in Overland Park. The phone is in the truck.',
      'In a Lee’s Summit crawlspace, on an 816 callback you cannot take.',
      'Between a water heater in Olathe and a clogged line in Shawnee.',
    ],
    footnote: 'Clearwell Plumbing is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'Water on the floor does not wait on voicemail.',
  leakLede:
    'You are on a job. The next caller has a leak or no hot water. They call the next plumber who answers, on either side of the state line.',
  calculatorIntro:
    'Calls, the share you miss, and a typical visit. The result is illustrative. Water heaters, sewer lines, and repipes are not added on top, so the figure stays on the first job.',
  stats: tradeStats({
    stat: '$250',
    label: 'illustrative value of one missed plumbing visit',
    context:
      'Illustrative, not a study and not your rate card. A service call often lands in this neighborhood. A water heater or a sewer line is more, and the line should not invent those prices.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo truck', callsPerWeek: 10, missedPercent: 50, averageJob: 280, repeatMonthly: 0 },
      { id: 'busy', label: 'Busy residential', callsPerWeek: 18, missedPercent: 40, averageJob: 360, repeatMonthly: 0 },
      { id: 'mixed', label: 'Service and sewer', callsPerWeek: 28, missedPercent: 35, averageJob: 520, repeatMonthly: 0 },
    ],
    defaultPresetId: 'busy',
    calls: { min: 4, max: 60, step: 1, hint: 'Service calls, clogged lines, and the texts that come in while you are under a house.' },
    missed: missedRange(),
    job: {
      min: 100,
      max: 2500,
      step: 10,
      label: 'Average job value',
      hint: 'A typical service call or small repair. Leave the sewer replacement out unless that is the call you actually miss.',
    },
    repeat: null,
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are on the job. The plan decides whether you get a text or a window already held.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'A 913 number in Olathe or a 816 number in Independence. A leak, a water heater, a toilet that will not stop. You are not in a place to talk.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It asks what is actually wrong',
      body: 'Starter texts you the address, the symptom, and whether the water is still running. Pro and Growth ask fixture, how long, and if anyone can shut it off. A service call can sit in a band you set. A water heater, a sewer, or a repipe is booked as a look, not a made-up bid.',
      extra: { type: 'note', text: 'Pro sample only · service call · $150–$275 before parts · today 4:00–6:00' },
    },
    {
      title: 'You see the lead before the next stop',
      body: 'On Pro the lead sits in the GoHighLevel pipeline. On Growth the dashboard shows service calls, the after-hours window, and the jobs that still need eyes on the pipe.',
      extra: {
        type: 'rows',
        rows: [
          { left: '8:30 · Olathe kitchen leak', right: 'Service' },
          { left: '1:00 · Independence water heater look', right: 'No price yet' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional shop, Clearwell Plumbing, so the afternoon has a shape without using a real company’s name.',
  before: [
    '2:40 PM. You are under a sink. The call goes to voicemail.',
    'They have water on the laundry floor in Shawnee. They book the next truck.',
    'Every water-heater price waits on you, because the unit has to be seen.',
    'The rest of the day is a thread of texts.',
    'The review ask happens if you remember in the driveway.',
  ],
  after: [
    'The same call is answered. A service window is held for 4:00 to 6:00.',
    'You get a text: Shawnee, laundry leak, water is shut off, 913 number.',
    'An Independence water heater is a look, not a price invented on the phone.',
    'The stops are readable between houses.',
    'The review text sends when the visit is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Clearwell Plumbing. Quoting is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Clearwell Plumbing',
    short: 'Clearwell',
    initial: 'C',
    site: 'clearwell.example',
    call: {
      time: '2:40 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Clearwell Plumbing. This is Maya. What is going on with the water?' },
        { who: 'Caller', text: 'The kitchen sink in Shawnee is leaking under the cabinet. Can someone come today?' },
        { who: 'AI', text: 'Is the water still running, and can you reach the shutoff? Is it the faucet, the drain, or the supply lines?' },
        { who: 'Caller', text: 'Supply line. I shut it off. The cabinet is wet.' },
        { who: 'AI', text: 'A service call like that is usually quoted between $150 and $275 before parts, once we see it. I will not price a repipe over the phone. I can hold 4:00 to 6:00 today and text the owner.' },
        { who: 'Caller', text: 'Hold it.' },
        { who: 'AI', text: 'You are on the board for 4:00 to 6:00, Shawnee. A text is on the way to you and to the owner.' },
      ],
      headline: 'Answered at 2:40 PM, while you were still under a sink.',
      body: 'The Pro line asks what is leaking and whether the water is off before it uses a service-call band. A water heater or a sewer is a look. It does not promise a truck you do not have.',
      note: 'Sample range only. Your bands, not a published rate. Clearwell Plumbing is fictional.',
    },
    chat: {
      time: '7:10 PM',
      introTitle: 'Leaks, heaters, and the jobs that need a look.',
      intro: 'On Pro and Growth, the site chat and a text to the business number follow the same rule: see the job before a big number.',
      groupLabel: 'Try a plumbing job',
      scenarios: [
        {
          id: 'leak',
          label: 'Leak',
          lines: [
            { who: 'Them', text: 'Kitchen supply line leaking in Shawnee. Water is shut off. Today?' },
            { who: 'AI', text: 'A service call like that is usually $150–$275 before parts. 4:00–6:00 today is open. Hold it?' },
            { who: 'Them', text: 'Yes.' },
            { who: 'AI', text: 'Held. Shawnee, 4:00–6:00. The owner has the text.' },
          ],
        },
        {
          id: 'heater',
          label: 'Water heater',
          lines: [
            { who: 'Them', text: 'No hot water in a Lee’s Summit ranch. The heater is in the garage. What is a replacement?' },
            { who: 'AI', text: 'I will not price a water heater without seeing it. Tank size, gas or electric, and the vent all change it. I can book a look.' },
            { who: 'Them', text: 'Tomorrow morning?' },
            { who: 'AI', text: 'Tomorrow at 9:00 AM is open. A person prices it after seeing the heater. Book the look?' },
          ],
        },
        {
          id: 'drain',
          label: 'Drain',
          lines: [
            { who: 'Them', text: 'Toilet backing up in Olathe. Just the one bathroom. Can you snake it?' },
            { who: 'AI', text: 'A single-fixture clog is usually a service call in the $150–$275 band before extra cable time. If the main line is the problem, we stop and tell you before any bigger number. Thursday at 11:00 is open. Book it?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday 11:00, Olathe. The note says one bathroom, not a known main-line backup.' },
          ],
        },
      ],
      note: 'Sample prices. A water heater, a sewer, or a repipe is a look, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:30 AM', name: 'Olathe kitchen leak', detail: 'Service · water is off' },
        { time: '11:00 AM', name: 'Olathe toilet', detail: 'Single fixture' },
        { time: '1:00 PM', name: 'Independence water heater', detail: 'Look first · no price' },
        { time: '4:00 PM', name: 'Shawnee window', detail: 'Held by the voice line' },
      ],
      flash: 'New · text at 7:11 PM · Lee’s Summit, no hot water, look tomorrow at 9:00.',
      leads: [
        { stage: 'New', detail: 'Lee’s Summit heater · text · look tomorrow' },
        { stage: 'Window', detail: 'Shawnee leak · voice · today 4:00' },
        { stage: 'Booked', detail: 'Olathe toilet · chat · Thursday' },
        { stage: 'Look', detail: 'Independence heater · garage unit' },
      ],
      reviewTitle: 'Queued after the Shawnee visit is marked done',
      reviewBody:
        'Thanks for having Clearwell out today. If the visit earned it, a short Google review helps the next neighbor with water on the floor.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for plumbing trucks',
  jobsTitle: 'The calls you actually run.',
  jobsLede: 'Service work can sit in a band. Anything that needs the unit or the line seen does not get a phone price.',
  jobs: [
    { title: 'Leaks and shutoffs', body: 'What is leaking, whether the water is off, and which room. Quoted only inside the service-call band you set.' },
    { title: 'Drains', body: 'One fixture versus a main line. A simple clog can be a band. A backup that might be the sewer is flagged before anyone promises a price.' },
    { title: 'Water heaters', body: 'Gas or electric, where it sits, and how old if they know. The look is booked. The price waits.' },
    { title: 'Toilets, faucets, disposals', body: 'A straight swap can sit in a small band if that is work you do. A failed shutoff is a stop-and-tell.' },
    { title: 'Sewer and repipes', body: 'No price on the phone. The lead captures the symptom and books the visit with the right person.' },
    { title: 'After-hours windows', body: 'It can hold a window and text you. It does not dispatch a truck you do not have on the road, on either side of the state line.' },
  ],
  will: [
    'I put this together for plumbers around Kansas City. You are under a sink or in a crawlspace when the next customer calls, whether their number is 913 or 816. They do not leave a voicemail. They call the next truck.',
    'The demo is half an hour, on a plumbing company, with your service-call bands and the jobs you will not price until you see them. If it is not a fit, say so. I am in Olathe.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a leak, a drain, and a water heater someone wants priced sight unseen, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'Will it invent a price for a water heater or a sewer?',
        a: 'No. On Pro and Growth it quotes only inside bands you approve, which for most shops means service calls and simple fixtures. Heaters, sewers, and repipes are booked as a look. On Starter it does not quote. It texts you the lead. Nothing goes live until you have heard the test calls.',
      },
      {
        q: 'What about a real emergency?',
        a: 'The line asks whether the water is still running, whether anyone can shut it off, and the address, then texts you. It does not promise a truck that is not available. You decide whether to roll. If you want those calls handed to your phone, we set that rule.',
      },
      areaCodeFaq,
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. When you are between stops and want the phone, you take it. When you are under the sink, it answers.',
      },
    ],
    'trucks',
    'on the call',
  ),
  finalTitle: 'See it on a call you are already on.',
  finalBody:
    'Thirty minutes with Will in Olathe. A plumbing company on the screen, your service calls in the conversation. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
