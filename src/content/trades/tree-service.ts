import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'tree-service',
  navLabel: 'Tree service',
  vehicle: 'trucks',
  keepDoing: 'climbing',
  metadata: {
    title: 'Answered while you are in the tree — FrontDesk AI for tree service',
    description:
      'A front office for Kansas City tree companies. The line answers while you are in a bucket or running a saw. Removals are booked as a look. Built and run from Olathe.',
    ogTitle: 'Answered while you are in the tree',
    ogDescription:
      'FrontDesk AI for Kansas City tree service. The phone is covered while you are aloft. Plans from $197 a month. Book a demo with Will in Olathe.',
    ogImage: '/og/tree-service.png',
    ogAlt: 'FrontDesk AI for Kansas City tree service: the phone is answered while you are in the tree.',
  },
  hero: {
    kicker: 'For Kansas City tree companies',
    title: 'The phone gets answered while you are in the tree.',
    lede: 'You are in a bucket, or the saw is running, and a homeowner with a limb on the garage is not leaving a voicemail. Will builds the front office from Olathe. Starter takes the message and texts you the lead. Pro books the climb assessment and quotes only the small jobs you have priced in advance. Growth adds the dashboard.',
  },
  heroAside: {
    kicker: 'While you are aloft',
    lines: [
      'In a bucket over a Brookside garage. The phone is in the truck.',
      'Running a saw on a takedown in Shawnee. You will not hear it ring.',
      'A storm afternoon, with three voicemails already waiting and a fourth call coming in.',
    ],
    footnote: 'Riverbend Tree Co. is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'A limb on the roof does not wait.',
  leakLede:
    'You cannot take a call from the tree. The person on the other end calls the next company that picks up.',
  calculatorIntro:
    'Calls, the share you miss, and a typical job you would have booked. The result is illustrative. Crane days and storm weeks swing hard, which is why you should move the numbers.',
  stats: tradeStats({
    stat: '$1,200',
    label: 'illustrative value of one missed prune or small removal',
    context:
      'Illustrative, not a study and not your rate card. A straightforward prune often lands in this neighborhood. Large removals, cranes, and storm work are priced after someone sees the tree.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo climber', callsPerWeek: 6, missedPercent: 60, averageJob: 900, repeatMonthly: 0 },
      { id: 'busy', label: 'Busy crew', callsPerWeek: 12, missedPercent: 50, averageJob: 1400, repeatMonthly: 0 },
      { id: 'storm', label: 'Storm week', callsPerWeek: 25, missedPercent: 40, averageJob: 1100, repeatMonthly: 0 },
    ],
    defaultPresetId: 'busy',
    calls: { min: 2, max: 40, step: 1, hint: 'Estimate requests, storm calls, and the texts from neighbors who saw the truck.' },
    missed: missedRange(),
    job: {
      min: 250,
      max: 8000,
      step: 50,
      label: 'Average job value',
      hint: 'A typical prune or removal you would have booked from that call. Leave the crane jobs out if they are not the calls you miss.',
    },
    repeat: null,
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are in the tree. The plan decides whether you get a text, or a visit already on the board.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'A maple over the garage. A stump they have been staring at. A neighbor after a storm. You are not in a position to answer.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It captures the tree, not a fantasy bid',
      body: 'Starter texts you the address, the species if they know it, and what is in the way. Pro and Growth ask about wires, access, and whether anything is on the structure. A removal is booked as a climb assessment. A small ornamental prune can sit inside a band you set. A crane is never priced on the phone.',
      extra: { type: 'note', text: 'Pro sample only · small ornamental prune · $350–$650 · climb assessment Thursday 4:00' },
    },
    {
      title: 'The board has the climb',
      body: 'On Pro the lead sits in the GoHighLevel pipeline with the photos they described. On Growth the dashboard shows assessments, pruning, and the jobs that still need a climber’s eyes.',
      extra: {
        type: 'rows',
        rows: [
          { left: '8:30 · Waldo prune', right: 'Crew 1' },
          { left: '1:00 · Brookside assessment', right: 'Climb first' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional shop, Riverbend Tree Co., so the day has a shape without using a real company’s name.',
  before: [
    '2:15 PM. You are in the tree. The call goes to the truck and then to voicemail.',
    'They have a limb on the garage. They hire whoever answers.',
    'Every removal price waits on you, because the tree has to be seen.',
    'The week’s climbs live in a group text.',
    'After the chipper is loaded, nobody asks for the review.',
  ],
  after: [
    'The same call is answered. A climb assessment is on Thursday at 4:00.',
    'You get a text: Brookside, silver maple, wires on the south side, limb already on the roof.',
    'The crane job is a look, not a number someone invented.',
    'Crew 1 can see the prunes and the assessments.',
    'The review text sends when the job is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Riverbend Tree Co. Quoting a small prune is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Riverbend Tree Co.',
    short: 'Riverbend',
    initial: 'R',
    site: 'riverbend-tree.example',
    call: {
      time: '2:15 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Riverbend Tree Co. This is Maya. What is going on with the tree?' },
        { who: 'Caller', text: 'A silver maple over the garage in Brookside is dropping limbs. What would removal cost?' },
        { who: 'AI', text: 'I will not price a removal without someone seeing it. Are there power lines, and is anything already on the roof?' },
        { who: 'Caller', text: 'Lines on the south side. One limb is on the garage. Nobody is hurt.' },
        { who: 'AI', text: 'I can book a climb assessment Thursday at 4:00 PM. A person prices the removal after that. A small ornamental prune is a different job, usually $350 to $650, and this does not sound like that.' },
        { who: 'Caller', text: 'Thursday works.' },
        { who: 'AI', text: 'Booked. Thursday at 4:00, Brookside. The owner has a text with the wires and the limb on the roof.' },
      ],
      headline: 'Answered at 2:15 PM, while you were still in the tree.',
      body: 'The Pro line refuses a removal price. It asks about wires, the structure, and whether anyone is hurt, then books the assessment. A small prune can be discussed only inside a band you approved.',
      note: 'Sample range only. Your bands, not a published rate. Riverbend Tree Co. is fictional.',
    },
    chat: {
      time: '6:05 PM',
      introTitle: 'Removals, prunes, and stumps.',
      intro: 'On Pro and Growth, the site chat and a text to the business number follow the same rule: see the tree before a big number.',
      groupLabel: 'Try a tree job',
      scenarios: [
        {
          id: 'removal',
          label: 'Removal',
          lines: [
            { who: 'Them', text: 'Silver maple over the garage in Brookside. What is removal?' },
            { who: 'AI', text: 'I will not guess a removal. Are there power lines, and is the tree touching the house or the garage?' },
            { who: 'Them', text: 'Lines on one side. A limb is already on the garage.' },
            { who: 'AI', text: 'Thursday at 4:00 PM is open for a climb assessment. The price comes after someone sees it. Book that?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday 4:00, Brookside. The crew has the note about the wires.' },
          ],
        },
        {
          id: 'prune',
          label: 'Prune',
          lines: [
            { who: 'Them', text: 'Ornamental in the front yard, Olathe. It is maybe 15 feet. Just needs a prune.' },
            { who: 'AI', text: 'A small ornamental like that is usually $350–$650 if we can reach it from the ground or a short climb. Any wires?' },
            { who: 'Them', text: 'No wires.' },
            { who: 'AI', text: 'Wednesday at 10:00 AM is open. Book the prune?' },
            { who: 'Them', text: 'Yes.' },
            { who: 'AI', text: 'Booked. Wednesday 10:00, Olathe. If it is bigger than you described, the climber will stop and reprice before cutting.' },
          ],
        },
        {
          id: 'stump',
          label: 'Stump',
          lines: [
            { who: 'Them', text: 'Stump in the backyard in Lenexa. Maybe 20 inches. Can you grind it Saturday?' },
            { who: 'AI', text: 'A stump that size, with access for the grinder, is usually $180–$280. Fences or a locked gate change it. Saturday at 11:00 is open. Book it?' },
            { who: 'Them', text: 'Gate is open. Book it.' },
            { who: 'AI', text: 'Booked. Saturday 11:00, Lenexa. The note says the gate is open.' },
          ],
        },
      ],
      note: 'Sample prices. A removal or a crane is an assessment, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:30 AM', name: 'Waldo ornamental prune', detail: 'Crew 1 · small tree' },
        { time: '11:00 AM', name: 'Lenexa stump', detail: 'Grinder · gate open' },
        { time: '1:00 PM', name: 'Shawnee takedown', detail: 'Climber already on site' },
        { time: '4:00 PM', name: 'Brookside assessment', detail: 'Booked by the voice line' },
      ],
      flash: 'New · call at 2:16 PM · Brookside silver maple, wires on the south side, limb on the garage.',
      leads: [
        { stage: 'New', detail: 'Storm call · Lee’s Summit · not yet assessed' },
        { stage: 'Assessment', detail: 'Brookside maple · voice · Thu 4:00' },
        { stage: 'Booked', detail: 'Olathe prune · chat · Wednesday' },
        { stage: 'On site', detail: 'Shawnee takedown · Crew 1' },
      ],
      reviewTitle: 'Queued after the Waldo prune is marked done',
      reviewBody:
        'Thanks for having Riverbend out today. If the work earned it, a short Google review helps the next neighbor with a tree over the garage.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for tree crews',
  jobsTitle: 'The work you actually climb.',
  jobsLede: 'Small, visible jobs can sit in a band. Removals, cranes, and anything near a service drop get eyes on them first.',
  jobs: [
    { title: 'Removals', body: 'Species, target, wires, and access. The assessment is booked. The price waits until a climber sees the tree.' },
    { title: 'Pruning', body: 'A small ornamental can be quoted inside a band. A big canopy is a look, so “just a prune” does not become a bad number.' },
    { title: 'Stump grinding', body: 'Diameter and access. A straightforward stump can sit in a band. A backyard with no gate is flagged.' },
    { title: 'Storm cleanup', body: 'It asks if anyone is hurt, what is on the structure, and whether the road is blocked, then texts you. It does not promise a crew you do not have.' },
    { title: 'Crane and technical', body: 'No price on the phone. The lead captures the site and books the visit with the right person.' },
    { title: 'Plant health care', body: 'If you sell a seasonal program, Pro can describe it in your words and book the first visit. It does not invent a treatment.' },
  ],
  will: [
    'I put this together for tree companies around Kansas City. You are in a bucket or the saw is running when the next customer calls. They do not wait. They call the next truck that answers.',
    'The demo is half an hour, on a tree company, with the jobs you will price on the phone and the jobs you will not. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a removal, a small prune, a stump, and a storm call, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if it belongs on the truck.',
      },
      {
        q: 'Will it quote a removal it has not seen?',
        a: 'No. Removals, cranes, and trees on a structure are booked as an assessment. On Pro and Growth, only the small jobs you have already priced — a modest prune, a straightforward stump — can be quoted, and only inside your bands. On Starter it does not quote. It texts you the lead.',
      },
      {
        q: 'What about storm calls?',
        a: 'The line asks whether anyone is hurt, what is on the house, and whether a road or a driveway is blocked, then texts you. It does not promise an arrival time you have not authorized. You decide which of those calls to roll.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. When you are on the ground and want the phone, you take it. When you are in the tree, it answers.',
      },
    ],
    'trucks',
    'climbing',
  ),
  finalTitle: 'See it on a day you are already in the air.',
  finalBody:
    'Thirty minutes with Will. A tree company on the screen, your climb rules in the conversation. If it is not a fit, you still leave knowing what the missed calls are worth.',
}

export default trade
