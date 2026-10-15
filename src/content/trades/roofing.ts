import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'roofing',
  navLabel: 'Roofing',
  vehicle: 'trucks',
  keepDoing: 'on the roof',
  metadata: {
    title: 'AI Receptionist for Roofing Companies in KC | FrontDesk AI',
    description:
      'AI receptionist for Kansas City roofing companies. After hail, the line takes the address and the leak. No invented replacement price or insurance number.',
    ogTitle: 'AI Receptionist for Roofing Companies in KC | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City roofing companies. After hail, the line takes the address and the leak. No invented replacement price or insurance number.',
    ogImage: '/og/roofing.png',
    ogAlt: 'FrontDesk AI for Kansas City roofers: the phone is answered while you are on the roof, including after hail.',
  },
  hero: {
    kicker: 'For Kansas City roofers',
    title: 'The phone gets answered while you are on the roof.',
    lede: 'You are on a slope, or the hail just came through Overland Park and Lee’s Summit and the phone will not stop. Will builds the front office from Olathe, for 913 and 816 numbers. Starter takes the message and texts you the lead. Pro books the inspection. Neither one invents a replacement price, an insurance payout, or a “free roof.”',
  },
  heroAside: {
    kicker: 'Hail season, and the ordinary Tuesdays',
    lines: [
      'On a roof in Olathe. The phone is in the truck at the curb.',
      'The afternoon a storm crosses the state line. 816 and 913 both start ringing.',
      'A homeowner in Independence who wants a number before anyone has been on the roof.',
    ],
    footnote:
      'Bluffline Roofing is fictional. This page does not cite a count of Kansas City hail days. Dollar figures are sample notes, not a rate card, and a roof is not priced on the phone.',
  },
  leakTitle: 'After hail, the first company that answers gets the inspection.',
  leakLede:
    'You already know the week after a storm. The phone spikes, you are on someone else’s roof, and the next caller books whoever picks up. We are not putting a storm-count or a close-rate on that. The calculator uses your numbers, and those stay labeled illustrative.',
  calculatorIntro:
    'Calls, the share you miss, and a typical job you would have booked from that call. The result is illustrative. A storm week is not a normal week, so there is a preset for it. Replacements vary too widely to treat the result as a forecast.',
  stats: tradeStats({
    stat: '$0',
    label: 'is the price the line should give for a roof it has not seen',
    context:
      'A repair you have already priced can sit in a band. A replacement, an insurance claim, and anything after hail is an inspection. We are not publishing a Kansas City hail statistic on this page.',
  }),
  calculator: {
    presets: [
      { id: 'steady', label: 'Ordinary week', callsPerWeek: 8, missedPercent: 40, averageJob: 750, repeatMonthly: 0 },
      { id: 'leaks', label: 'Leak week', callsPerWeek: 14, missedPercent: 45, averageJob: 900, repeatMonthly: 0 },
      { id: 'hail', label: 'After a storm', callsPerWeek: 30, missedPercent: 55, averageJob: 1200, repeatMonthly: 0 },
    ],
    defaultPresetId: 'leaks',
    calls: {
      min: 2,
      max: 80,
      step: 1,
      hint: 'Inspection requests and leak calls, including the spike after a storm. The “after a storm” preset is an example week, not a measured Kansas City average.',
    },
    missed: missedRange(),
    job: {
      min: 200,
      max: 15000,
      step: 50,
      label: 'Average booked job',
      hint: 'Use a repair if that is what the missed calls are. Use a replacement only if that is truly the job you lose. The number stays illustrative.',
    },
    repeat: null,
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are on a roof. The plan decides whether you get a text or an inspection already on the board. The price of the roof still waits.',
  steps: [
    {
      title: 'They reach the number on the truck',
      body: 'A leak over a bedroom in Shawnee. A hail claim in Lee’s Summit. A 913 neighbor who saw your truck. You are tied off. You are not taking the call.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It books the inspection, not the roof',
      body: 'Starter texts you the address, when the storm was, and whether water is coming in now. Pro and Growth ask the same things and put an inspection on the calendar. A small repair you have already priced can sit in a band. A replacement is never priced from the year of the roof or the size of the hail.',
      extra: { type: 'note', text: 'Pro sample · inspection booked · Thursday 3:00 · no roof price on the call' },
    },
    {
      title: 'The storm leads are in one place',
      body: 'On Pro each inspection sits in the GoHighLevel pipeline with the city and whether water is active. On Growth the dashboard shows the day’s roofs and the looks that still need a person on the slope.',
      extra: {
        type: 'rows',
        rows: [
          { left: '9:00 · Olathe repair', right: 'Priced on site' },
          { left: '3:00 · Lee’s Summit inspection', right: 'After the storm' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional company, Bluffline Roofing, so a storm day has a shape without using a real roofer’s name.',
  before: [
    '4:10 PM. You are on a roof in Olathe. The call goes to voicemail.',
    'They had hail in Lee’s Summit yesterday. They book the company that answered.',
    'Someone on your crew quotes a roof from the curb because the office line is jammed.',
    'Insurance questions get answered differently by every person who calls back.',
    'The inspection list is a group text.',
  ],
  after: [
    'The same call is answered. An inspection is on Thursday at 3:00.',
    'You get a text: Lee’s Summit, hail yesterday, water stained the bedroom ceiling, 816 number.',
    'The line refuses a replacement price and refuses an insurance number.',
    'Active leaks are marked so you can choose which roof to see first.',
    'The review text waits until the job is actually done, not until the inspection is booked.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Bluffline Roofing. Booking the inspection is the Pro sample. The dashboard is the Growth sample. No roof price is invented in the demo.',
  demos: {
    company: 'Bluffline Roofing',
    short: 'Bluffline',
    initial: 'B',
    site: 'bluffline.example',
    call: {
      time: '4:10 PM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Bluffline Roofing. This is Maya. Is water coming in, or are you calling about storm damage?' },
        { who: 'Caller', text: 'Hail yesterday in Lee’s Summit. I want to know what a new roof costs. Insurance might be involved.' },
        { who: 'AI', text: 'I will not price a roof, and I will not guess what insurance will pay. Is water coming in right now, and about when did the hail hit?' },
        { who: 'Caller', text: 'A stain on the bedroom ceiling. Hail was late yesterday afternoon.' },
        { who: 'AI', text: 'I can book an inspection Thursday at 3:00 PM. A person looks at the roof and talks through the next step after that. I can also text the owner now because water has already shown up inside.' },
        { who: 'Caller', text: 'Thursday works.' },
        { who: 'AI', text: 'Booked. Thursday at 3:00, Lee’s Summit. The note says hail late yesterday, ceiling stain, no price given.' },
      ],
      headline: 'Answered at 4:10 PM. Inspection booked. No roof price.',
      body: 'The Pro line asks whether water is coming in and when the storm was. It books the inspection. It does not quote a square, a deductible, or a “free roof.”',
      note: 'Bluffline Roofing is fictional. There is no sample roof price on purpose.',
    },
    chat: {
      time: '6:40 PM',
      introTitle: 'Inspections, leaks, and the questions that are not a bid.',
      intro: 'On Pro and Growth, the site chat and a text to the business number follow the same rule: get on the roof before a number.',
      groupLabel: 'Try a roofing call',
      scenarios: [
        {
          id: 'hail',
          label: 'Hail',
          lines: [
            { who: 'Them', text: 'Hail in Lee’s Summit yesterday. What is a new roof?' },
            { who: 'AI', text: 'I will not price a roof from a text, and I will not guess an insurance payment. Is water coming inside?' },
            { who: 'Them', text: 'Stain on the bedroom ceiling.' },
            { who: 'AI', text: 'Thursday at 3:00 PM is open for an inspection. A person looks first. Book that?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Thursday 3:00, Lee’s Summit. No price was given.' },
          ],
        },
        {
          id: 'leak',
          label: 'Active leak',
          lines: [
            { who: 'Them', text: 'Water is dripping into the kitchen in Shawnee right now. Can someone come?' },
            { who: 'AI', text: 'I am texting the owner with the address. I will not promise a tarp or a truck that is not free. If a same-day look is open, I can hold it. 6:30 tonight is the next window I have. Hold it?' },
            { who: 'Them', text: 'Hold it. We put a bucket down.' },
            { who: 'AI', text: 'Held. Shawnee, 6:30, active drip, bucket is down. The owner has the text.' },
          ],
        },
        {
          id: 'repair',
          label: 'Small repair',
          lines: [
            { who: 'Them', text: 'A few shingles blew off a ranch in Olathe. No leak yet. Can you nail them down?' },
            { who: 'AI', text: 'If it is only a small patch of shingles and you can see the deck is fine, a repair visit is often booked first and priced on the roof. I will not give a number from here. Friday at 9:00 is open for the look. Book it?' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Friday 9:00, Olathe. The note says blown shingles, no active leak, price on site.' },
          ],
        },
      ],
      note: 'No sample roof price. An inspection is the booking. Insurance numbers are not guessed.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Olathe repair look', detail: 'Blown shingles · price on site' },
        { time: '11:00 AM', name: 'Overland Park inspection', detail: 'After Saturday’s storm' },
        { time: '3:00 PM', name: 'Lee’s Summit inspection', detail: 'Ceiling stain · no price' },
        { time: '6:30 PM', name: 'Shawnee active leak', detail: 'Bucket down · owner texted' },
      ],
      flash: 'New · call at 4:11 PM · Lee’s Summit, hail late yesterday, bedroom ceiling stain, Thursday 3:00.',
      leads: [
        { stage: 'Active', detail: 'Shawnee drip · voice · tonight 6:30' },
        { stage: 'Inspection', detail: 'Lee’s Summit hail · Thu 3:00' },
        { stage: 'Inspection', detail: 'Overland Park · Saturday storm' },
        { stage: 'Repair', detail: 'Olathe shingles · Friday · price on site' },
      ],
      reviewTitle: 'Queued only after the Olathe repair is marked done',
      reviewBody:
        'Thanks for having Bluffline on the roof. If the work earned it, a short Google review helps the next neighbor after a storm.',
      reviewNote:
        'You approve the wording once. The ask goes out when the job is done, not when the inspection is booked. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for roofers',
  jobsTitle: 'The calls that show up after weather, and the ones that do not.',
  jobsLede: 'Hail season in this metro is when the phone changes. The line’s job is to capture the house and book the inspection. The bid is still yours.',
  jobs: [
    { title: 'After hail', body: 'Address, when it hit, and whether water is inside. An inspection goes on the calendar. No roof price and no insurance figure.' },
    { title: 'Active leaks', body: 'It texts you immediately and can hold the next window you have opened. It does not promise a tarp or a crew you do not have.' },
    { title: 'Repairs', body: 'A small, described repair can be booked as a look, and priced on the roof. A band is used only if you have already approved one.' },
    { title: 'Replacements', body: 'Age, layers, and pitch are questions for the inspection, not a formula on the phone.' },
    { title: 'Insurance questions', body: 'The line says a person will talk through it after the inspection. It does not tell a homeowner what a carrier will pay.' },
    { title: '913 and 816', body: 'Olathe, Overland Park, Shawnee, and Lenexa on one side. Kansas City, Independence, and Lee’s Summit on the other. The lead keeps the city.' },
  ],
  will: [
    'I put this together for roofers around Kansas City. You are on a roof when the next homeowner calls, and after hail you are on a roof while a lot of them call. They book the company that answers. I am in Olathe, and the work is for both 913 and 816.',
    'The demo is half an hour, on a roofing company, with the rule that a roof is priced after someone sees it. If it is not a fit, say so. I would rather you hear the line refuse a bad price than sit through a pitch.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a homeowner does. During setup we run test calls on hail, an active leak, a small repair, and someone demanding a roof price. You say what sounds off. The demo is how you decide if you would put it on the truck.',
      },
      {
        q: 'Will it quote a roof, or tell someone insurance will pay?',
        a: 'No. Inspections are booked. Repairs are priced on the roof unless you have approved a narrow band for a specific small repair. Insurance payments, deductibles, and “free roofs” are not things the line says. On Starter it does not quote at all. It texts you the lead.',
      },
      {
        q: 'What happens the week after a storm?',
        a: 'The line keeps answering when your crew is on a roof. It asks if water is coming in, takes the address and the timing, books an inspection in a window you have opened, and texts you the active leaks. It does not invent extra capacity. If the board is full, it says so.',
      },
      {
        q: 'Do you cover 816 and 913?',
        a: 'Yes. We are in Olathe. We forward the number already on the truck, whether callers know it as 913 or 816. Storms do not stop at the state line, and the lead keeps the city so Lee’s Summit is not mixed up with Olathe.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. When you are on the ground and want the conversation, you take it. When you are tied off, it answers.',
      },
    ],
    'trucks',
    'on the roof',
  ),
  finalTitle: 'See it before the next storm week.',
  finalBody:
    'Thirty minutes with Will in Olathe. A roofing company on the screen, and the rule that the roof is priced after someone sees it. If it is not a fit, you still leave knowing what the missed inspections are worth.',
}

export default trade
