import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'handyman',
  navLabel: 'Handyman',
  vehicle: 'truck',
  keepDoing: 'on the tools',
  metadata: {
    title: 'AI Receptionist for Handymen in Kansas City | FrontDesk AI',
    description:
      'AI receptionist for Kansas City handymen. The line answers while you are under a sink or on a drywall patch. Small jobs can sit in a band. Built in Olathe.',
    ogTitle: 'AI Receptionist for Handymen in Kansas City | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City handymen. The line answers while you are under a sink or on a drywall patch. Small jobs can sit in a band. Built in Olathe.',
    ogImage: '/og/handyman.png',
    ogAlt: 'FrontDesk AI for Kansas City handymen: the phone is answered while you are mid-repair.',
  },
  hero: {
    kicker: 'For Kansas City handymen',
    title: 'The punch list can wait. The phone should not.',
    lede: 'You are under a sink, holding a fixture, or halfway through a drywall patch. There is no office. Will builds the front office from Olathe. Starter takes the message and texts you the lead. Pro quotes the small jobs inside your bands and books the visit. Growth adds a dashboard for the lists that turn into the next call.',
  },
  heroAside: {
    kicker: 'One person, both hands full',
    lines: [
      'Under a kitchen sink in Waldo, with the water still off.',
      'Holding a TV mount against the wall, waiting on a second pair of hands you do not have.',
      'Patching a hole in Shawnee. The phone is in the other room.',
    ],
    footnote: 'Saturday List Handyman is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'A one-person shop cannot be in two rooms.',
  leakLede:
    'The customer with a list will call the next handyman who answers. You are already inside someone else’s house.',
  calculatorIntro:
    'Calls, the share you miss, a typical visit, and — if it is real for you — what a homeowner who keeps handing you the list is worth. The result is illustrative.',
  stats: tradeStats({
    stat: '$250',
    label: 'illustrative value of one missed punch-list visit',
    context:
      'Illustrative, not a study and not your rate card. A short list — a mount, a patch, a faucet — often lands in this neighborhood. Bigger carpentry is priced after you see it.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo', callsPerWeek: 10, missedPercent: 50, averageJob: 220, repeatMonthly: 180 },
      { id: 'steady', label: 'Steady', callsPerWeek: 18, missedPercent: 40, averageJob: 275, repeatMonthly: 220 },
      { id: 'lists', label: 'Punch-list weeks', callsPerWeek: 30, missedPercent: 35, averageJob: 340, repeatMonthly: 260 },
    ],
    defaultPresetId: 'steady',
    calls: { min: 4, max: 60, step: 1, hint: 'Calls and texts about the next list, including the ones that arrive while you are already in a house.' },
    missed: missedRange(),
    job: {
      min: 80,
      max: 1500,
      step: 5,
      label: 'Average visit',
      hint: 'A typical first list, not a kitchen remodel.',
    },
    repeat: {
      min: 50,
      max: 800,
      step: 10,
      label: 'Repeat homeowner, per month',
      hint: 'What one homeowner who keeps handing you the next list is worth in a month. Leave it low if your work is one-and-done.',
      share: 1 / 7,
      shareLabel: '1 in 7',
      noun: 'homeowners who book the next list',
    },
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while your hands are full. The plan decides whether you get a text or a visit already booked.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'A TV mount and two holes. A disposal that died. A door that will not latch. You are already on someone else’s list.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It sorts a list from a project',
      body: 'Starter texts you the list and the city. Pro and Growth ask how many items, whether parts are on site, and if anything involves plumbing or electrical you do not do. A short list can sit in a band. A “while you are here, the deck too” becomes a look.',
      extra: { type: 'note', text: 'Pro sample only · TV mount and two patches · $180–$320 · Wednesday 10:00' },
    },
    {
      title: 'The day is a list you can read',
      body: 'On Pro the lead sits in the GoHighLevel pipeline. On Growth the dashboard shows the stops, so the drive between Waldo and Shawnee is not a guess in a text thread.',
      extra: {
        type: 'rows',
        rows: [
          { left: '9:00 · Waldo TV and patches', right: 'Booked' },
          { left: '12:30 · Shawnee door', right: 'Parts unknown' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional one-person shop, Saturday List Handyman, so the day has a shape without using a real name.',
  before: [
    '10:05 AM. You are under a sink. The call goes to voicemail.',
    'They had a short list for this week. They book someone who answered.',
    'Every price is a callback, because the list lives in the conversation.',
    'The afternoon stops are in your head.',
    'Nobody asks for a review. You are already late to the next house.',
  ],
  after: [
    'The same call is answered. Wednesday at 10:00 is held for the mount and the patches.',
    'You get a text with the list, the city, and whether they already bought the mount.',
    'A deck rebuild is a look, not a number from a text.',
    'The stops are in order.',
    'The review text sends when the visit is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Saturday List Handyman. Quoting is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Saturday List Handyman',
    short: 'Saturday List',
    initial: 'S',
    site: 'saturday-list.example',
    call: {
      time: '10:05 AM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Saturday List Handyman. This is Maya. What is on the list?' },
        { who: 'Caller', text: 'Can you mount a TV and patch two holes in Waldo this week?' },
        { who: 'AI', text: 'Yes. Did you already buy the mount, and are the holes smaller than a fist?' },
        { who: 'Caller', text: 'Mount is here. Holes are from old anchors. Nothing huge.' },
        { who: 'AI', text: 'A visit like that usually lands between $180 and $320 if the mount is on site and the patches are small. Wednesday at 10:00 AM is open. Book it?' },
        { who: 'Caller', text: 'Book it.' },
        { who: 'AI', text: 'Booked. Wednesday at 10:00, Waldo. The note says the mount is already there.' },
      ],
      headline: 'Answered at 10:05 AM, while you were under a sink.',
      body: 'The Pro line turns a vague “honey-do” into a list: what, how big, and whether the parts are on site. It quotes only inside the band you set for that kind of visit.',
      note: 'Sample range only. Your bands, not a published rate. Saturday List Handyman is fictional.',
    },
    chat: {
      time: '8:15 PM',
      introTitle: 'Lists, not remodels.',
      intro: 'On Pro and Growth, the site chat and a text to the business number ask the same questions you would ask in the driveway.',
      groupLabel: 'Try a handyman job',
      scenarios: [
        {
          id: 'list',
          label: 'Punch list',
          lines: [
            { who: 'Them', text: 'TV mount and two small holes in Waldo. This week?' },
            { who: 'AI', text: 'The mount is already there? And the holes are small, not a missing piece of drywall?' },
            { who: 'Them', text: 'Mount is here. Small holes.' },
            { who: 'AI', text: 'That is usually $180–$320. Wednesday at 10:00 AM is open. Book it?' },
            { who: 'Them', text: 'Yes.' },
            { who: 'AI', text: 'Booked. Wednesday 10:00, Waldo.' },
          ],
        },
        {
          id: 'faucet',
          label: 'Faucet',
          lines: [
            { who: 'Them', text: 'Kitchen faucet in Overland Park is leaking. I bought a new one. Can you swap it?' },
            { who: 'AI', text: 'A straightforward faucet swap is usually $150–$240 if the shutoffs work and there is no rotten cabinet. Thursday at 1:00 PM is open. Book it?' },
            { who: 'Them', text: 'Shutoffs work. Book it.' },
            { who: 'AI', text: 'Booked. Thursday 1:00. If the shutoffs fail, the visit stops and we tell you before any extra work.' },
          ],
        },
        {
          id: 'deck',
          label: 'Deck',
          lines: [
            { who: 'Them', text: 'The deck in Lee’s Summit needs boards and the rail is loose. What would that be?' },
            { who: 'AI', text: 'I will not price a deck from a text. I can book a look and you will get a number after someone sees the boards.' },
            { who: 'Them', text: 'Friday after 3?' },
            { who: 'AI', text: 'Friday at 3:30 PM is open for the look. Book it?' },
          ],
        },
      ],
      note: 'Sample prices. A deck, a remodel, or a surprise behind the wall is a look, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '9:00 AM', name: 'Waldo TV and patches', detail: 'Mount on site' },
        { time: '11:30 AM', name: 'Overland Park faucet', detail: 'Homeowner bought the faucet' },
        { time: '2:00 PM', name: 'Shawnee door latch', detail: 'Parts unknown' },
        { time: '3:30 PM', name: 'Lee’s Summit deck look', detail: 'No price yet' },
      ],
      flash: 'New · chat at 8:16 PM · Waldo mount and two patches, Wednesday at 10:00.',
      leads: [
        { stage: 'New', detail: 'Lee’s Summit deck · text · look Friday' },
        { stage: 'Booked', detail: 'Waldo list · voice · Wednesday 10:00' },
        { stage: 'Booked', detail: 'Overland Park faucet · chat · Thursday' },
        { stage: 'Repeat', detail: 'Shawnee · third list this year' },
      ],
      reviewTitle: 'Queued after the Waldo visit is marked done',
      reviewBody:
        'Thanks for having Saturday List over. If the list got finished, a short Google review helps the next neighbor with a mount and a hole in the wall.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for a one-person shop',
  jobsTitle: 'The lists you actually run.',
  jobsLede: 'Short, described work can sit in a band. Hidden damage and real carpentry get a look.',
  jobs: [
    { title: 'Punch lists', body: 'Mounts, patches, shelves, and the “while you are here.” It counts the items before it uses a band.' },
    { title: 'Faucets and disposals', body: 'Only if you do them. A straight swap can be quoted. A failed shutoff or a rotten cabinet is a stop-and-tell.' },
    { title: 'Doors and locks', body: 'Latch, sweep, or a lock they already bought. It asks the symptom so you do not roll for the wrong part.' },
    { title: 'Drywall', body: 'Small holes versus a missing sheet. The first can be a band. The second is a look.' },
    { title: 'Assembly', body: 'Furniture and fixtures, with a note about whether the box is already open and missing hardware.' },
    { title: 'The job you do not do', body: 'If it is a panel, a roof, or a permit, the line says so in your words and does not book it as a handyman visit.' },
  ],
  will: [
    'I put this together for handymen around Kansas City. You are under a sink or on a patch when the next list calls. There is no one in an office. They call the next person who answers.',
    'The demo is half an hour, on a handyman company, with the visits you will price from a list and the ones you will only price in the driveway. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a punch list, a faucet, and a job you do not take, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'What if the list grows once I am there?',
        a: 'The line books the list it was told. On Pro and Growth it can say, in your words, that extra items are priced on site. It does not promise a deck, a remodel, or a surprise behind the wall for the small-visit band. On Starter it does not quote. It texts you the list.',
      },
      {
        q: 'I do not do plumbing or electrical. Will it book those?',
        a: 'Only if you say it should. During setup we list the work you refuse. Those calls get a polite no, or a note to call the trade you name. You hear that on the test calls.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. When you are between houses and want the phone, you take it. When your hands are full, it answers.',
      },
    ],
    'truck',
    'on the tools',
  ),
  finalTitle: 'See it on a list you are already in the middle of.',
  finalBody:
    'Thirty minutes with Will. A handyman company on the screen, your bands and the jobs you do not take. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
