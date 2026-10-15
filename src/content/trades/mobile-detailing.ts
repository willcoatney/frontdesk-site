import { BOOK_RATE, BOOK_RATE_LABEL, missedRange, tradeStats, withSharedFaqs } from './shared'
import type { TradeConfig } from './types'

const trade: TradeConfig = {
  slug: 'mobile-detailing',
  navLabel: 'Mobile detailing',
  vehicle: 'van',
  keepDoing: 'on driveways',
  metadata: {
    title: 'AI Receptionist for Mobile Detailing in KC | FrontDesk AI',
    description:
      'AI receptionist for Kansas City mobile detailers. Answers while you are buffing a car. Maintenance details can sit in a band. Paint correction is a look.',
    ogTitle: 'AI Receptionist for Mobile Detailing in KC | FrontDesk AI',
    ogDescription:
      'AI receptionist for Kansas City mobile detailers. Answers while you are buffing a car. Maintenance details can sit in a band. Paint correction is a look.',
    ogImage: '/og/mobile-detailing.png',
    ogAlt: 'FrontDesk AI for Kansas City mobile detailers: the phone is answered while you are on a driveway.',
  },
  hero: {
    kicker: 'For Kansas City mobile detailers',
    title: 'The phone gets answered while you are on a driveway.',
    lede: 'The buffer is in your hand, the music is on, and the next customer is calling from their own driveway. Will builds the front office from Olathe. Starter takes the message and texts you the lead. Pro asks the vehicle, quotes a maintenance detail inside your bands, and books the arrival window. Growth adds the dashboard and is where a membership book starts to be visible.',
  },
  heroAside: {
    kicker: 'While the paint is wet',
    lines: [
      'Buffing a three-row SUV in an Overland Park driveway. The phone is in the van.',
      'Extracting a back seat in Shawnee. You will not hear a ring over the machine.',
      'A Saturday that was full by Thursday, with new texts still coming in.',
    ],
    footnote: 'Curb & Chrome Mobile Detail is fictional. Dollar figures on this page are sample bands, not a rate card.',
  },
  leakTitle: 'The next driveway books whoever answers.',
  leakLede:
    'Detailing is scheduled to the hour. A missed call on Saturday morning is a car you do not see, and often a membership you never get to offer.',
  calculatorIntro:
    'Calls, the share you miss, a typical detail, and what a membership is worth if you sell one. The result is illustrative. Move the membership number to zero if you do not sell them.',
  stats: tradeStats({
    stat: '$220',
    label: 'illustrative value of one missed full detail',
    context:
      'Illustrative, not a study and not your menu. A full interior and exterior on a normal vehicle often lands in this neighborhood. Correction and ceramic are priced after you see the paint.',
  }),
  calculator: {
    presets: [
      { id: 'solo', label: 'Solo', callsPerWeek: 12, missedPercent: 40, averageJob: 180, repeatMonthly: 89 },
      { id: 'booked', label: 'Booked out', callsPerWeek: 22, missedPercent: 30, averageJob: 240, repeatMonthly: 99 },
      { id: 'fleet', label: 'Driveways and a fleet', callsPerWeek: 35, missedPercent: 25, averageJob: 200, repeatMonthly: 120 },
    ],
    defaultPresetId: 'booked',
    calls: { min: 4, max: 70, step: 1, hint: 'Booking calls and texts, including the ones that arrive while you are on a driveway.' },
    missed: missedRange(),
    job: {
      min: 60,
      max: 900,
      step: 5,
      label: 'Average detail',
      hint: 'A typical maintenance detail, not a correction or a ceramic coating.',
    },
    repeat: {
      min: 0,
      max: 200,
      step: 5,
      label: 'Membership, per month',
      hint: 'What one membership is worth each month. Set this to zero if you do not sell them.',
      share: 1 / 5,
      shareLabel: '1 in 5',
      noun: 'new memberships',
    },
    bookRate: BOOK_RATE,
    bookRateLabel: BOOK_RATE_LABEL,
  },
  howLede: 'The call comes in while you are on a car. The plan decides whether you get a text or a driveway already on the board.',
  steps: [
    {
      title: 'They reach the number on the van',
      body: 'A Saturday detail. A filthy three-row after a road trip. A dealer who wants five cars before noon. You are not wiping your hands to answer.',
      extra: { type: 'pills', label: 'Ways people reach you', items: ['Call', 'Website chat', 'Text'] },
    },
    {
      title: 'It asks the vehicle, not just “a detail”',
      body: 'Starter texts you the vehicle, the city, and the day they want. Pro and Growth ask sedan or three-row, interior only or full, and whether the paint is neglected. A maintenance detail can sit in a band. Correction and ceramic are booked as a look at the paint.',
      extra: { type: 'note', text: 'Pro sample only · three-row full detail · $220–$310 · Saturday 9:00–11:30' },
    },
    {
      title: 'The driveways are in order',
      body: 'On Pro the booking sits in the GoHighLevel pipeline, with a review request after the car is done. On Growth the dashboard shows the day’s driveways and who is on a membership.',
      extra: {
        type: 'rows',
        rows: [
          { left: '8:00 · Leawood sedan', right: 'Maintenance' },
          { left: '11:00 · OP three-row', right: 'Full detail' },
        ],
      },
    },
  ],
  beforeAfterLede: 'A fictional van, Curb & Chrome Mobile Detail, so the Saturday has a shape without using a real company’s name.',
  before: [
    '9:20 AM. You are buffing. The call goes to voicemail over the machine.',
    'They wanted Saturday. By the time you call back, the driveway is taken.',
    'Every price is a callback, because the menu is in your head.',
    'The afternoon stops are a notes app.',
    'The review ask happens if you remember before you pull away.',
  ],
  after: [
    'The same call is answered. Saturday 9:00 to 11:30 is held for the three-row.',
    'You get a text: Overland Park, three-row, full interior and exterior, pet hair.',
    'A ceramic question becomes a look at the paint, not a coating price from a sentence.',
    'The driveways are in drive order.',
    'The review text sends when the detail is marked done.',
  ],
  demosLede:
    'A sample call, a website chat, and the dashboard for a fictional company, Curb & Chrome. Quoting is the Pro sample. The dashboard is the Growth sample.',
  demos: {
    company: 'Curb & Chrome Mobile Detail',
    short: 'Curb & Chrome',
    initial: 'C',
    site: 'curb-and-chrome.example',
    call: {
      time: '9:20 AM',
      lines: [
        { who: 'AI', text: 'Thanks for calling Curb & Chrome. This is Maya. What are we detailing?' },
        { who: 'Caller', text: 'Full interior and exterior on a three-row SUV in Overland Park. Saturday morning?' },
        { who: 'AI', text: 'Any pet hair, and is the paint in normal shape or does it need more than a maintenance detail?' },
        { who: 'Caller', text: 'Dog hair in the back. Paint is fine. We just want it clean.' },
        { who: 'AI', text: 'A full detail on a three-row like that usually lands between $220 and $310. Saturday from 9:00 to 11:30 is open. I will need a driveway and a water spigot. Book it?' },
        { who: 'Caller', text: 'Book it.' },
        { who: 'AI', text: 'Booked. Saturday 9:00 to 11:30, Overland Park. The note says dog hair and a normal wash, not a correction.' },
      ],
      headline: 'Answered at 9:20 AM, while you were still on a car.',
      body: 'The Pro line asks the vehicle, the hair, and whether they are asking for a wash or for paint work. It quotes only the maintenance band you set. Correction is a different conversation.',
      note: 'Sample range only. Your menu, not a published rate. Curb & Chrome is fictional.',
    },
    chat: {
      time: '6:45 PM',
      introTitle: 'Driveways, not a shop bay.',
      intro: 'On Pro and Growth, the site chat and a text to the business number ask for the vehicle and the driveway, not just a price.',
      groupLabel: 'Try a detail',
      scenarios: [
        {
          id: 'suv',
          label: 'Three-row',
          lines: [
            { who: 'Them', text: 'Full interior and exterior, three-row, Overland Park. Saturday morning?' },
            { who: 'AI', text: 'Pet hair? And is the paint a normal wash, or are you asking for correction?' },
            { who: 'Them', text: 'Dog hair. Paint is fine.' },
            { who: 'AI', text: 'That is usually $220–$310. Saturday 9:00–11:30 is open if there is a driveway and a spigot. Book it?' },
            { who: 'Them', text: 'Yes. Spigot is on the side of the garage.' },
            { who: 'AI', text: 'Booked. Saturday 9:00, Overland Park. The note has the spigot.' },
          ],
        },
        {
          id: 'ceramic',
          label: 'Ceramic',
          lines: [
            { who: 'Them', text: 'How much to ceramic a black sedan in Leawood?' },
            { who: 'AI', text: 'I will not price a coating without seeing the paint. Swirls and water spots change the prep. I can book a look.' },
            { who: 'Them', text: 'Tuesday evening?' },
            { who: 'AI', text: 'Tuesday at 5:30 PM is open. A person prices the coating after seeing the car. Book the look?' },
          ],
        },
        {
          id: 'fleet',
          label: 'Fleet',
          lines: [
            { who: 'Them', text: 'We have four work trucks in Lenexa that need a maintenance wash every other Friday. Do you do that?' },
            { who: 'AI', text: 'Yes. I will not guess a fleet price on a text. I can book a walkthrough of the lot and the trucks. Friday at 7:30 AM is open.' },
            { who: 'Them', text: 'Book it.' },
            { who: 'AI', text: 'Booked. Friday 7:30 AM, Lenexa. The note says four work trucks.' },
          ],
        },
      ],
      note: 'Sample prices. Ceramic, correction, and a fleet are a look, not a number invented on the thread.',
    },
    dashboard: {
      schedule: [
        { time: '8:00 AM', name: 'Leawood sedan', detail: 'Maintenance · membership' },
        { time: '11:00 AM', name: 'Overland Park three-row', detail: 'Full · dog hair' },
        { time: '2:00 PM', name: 'Shawnee interior', detail: 'Seats only' },
        { time: '5:30 PM', name: 'Leawood ceramic look', detail: 'No price yet' },
      ],
      flash: 'New · chat at 6:46 PM · Lenexa, four work trucks, lot walk Friday at 7:30 AM.',
      leads: [
        { stage: 'New', detail: 'Lenexa fleet · text · walk Friday' },
        { stage: 'Booked', detail: 'OP three-row · voice · Saturday 9:00' },
        { stage: 'Look', detail: 'Leawood ceramic · chat · Tuesday 5:30' },
        { stage: 'Member', detail: 'Leawood sedan · every other week' },
      ],
      reviewTitle: 'Queued after the Overland Park detail is marked done',
      reviewBody:
        'Thanks for having Curb & Chrome in the driveway. If the car earned it, a short Google review helps the next neighbor find a mobile detail.',
      reviewNote:
        'You approve the wording once. Sample message for a fictional company. Review requests are on Pro and Growth.',
    },
  },
  jobsKicker: 'Built for mobile detailers',
  jobsTitle: 'The cars you actually book.',
  jobsLede: 'Maintenance work can sit on a menu. Paint correction, ceramic, and fleets get eyes on them first.',
  jobs: [
    { title: 'Maintenance details', body: 'Vehicle size, interior, exterior, pet hair. Quoted inside the bands on your menu.' },
    { title: 'Interiors', body: 'Seats, carpets, and how bad the hair or the spills are. A light interior is a band. An extraction story is flagged.' },
    { title: 'Paint correction', body: 'No price from a photo description alone, unless you have said otherwise. The look is booked.' },
    { title: 'Ceramic', body: 'Prep depends on the paint. The line books the inspection and does not invent a coating package.' },
    { title: 'Memberships', body: 'If you sell a cadence, Pro can describe it in your words and offer it after a first detail. It does not discount a price you did not approve.' },
    { title: 'Fleet mornings', body: 'Count of vehicles and where they park. A walkthrough, then your number.' },
  ],
  will: [
    'I put this together for mobile detailers around Kansas City. You are on a driveway with a buffer in your hand when the next customer calls. They book the van that answers.',
    'The demo is half an hour, on a detailing company, with your menu and the jobs you will not price until you see the paint. If it is not a fit, say so.',
  ],
  faqs: withSharedFaqs(
    [
      {
        q: 'Does it sound robotic?',
        a: 'You hear it before a customer does. During setup we run test calls on a maintenance detail, a pet-hair interior, and a ceramic question, and you say what sounds off. It is still a voice on a phone. The demo is how you decide if you would put it on the van.',
      },
      {
        q: 'Will it quote correction from a sentence?',
        a: 'No. On Pro and Growth, maintenance details use the bands you approve. Correction and ceramic are booked as a look at the paint. On Starter it does not quote. It texts you the vehicle, the city, and the day they want. Nothing goes live until you have heard the test calls.',
      },
      {
        q: 'What if I am already booked that Saturday?',
        a: 'The line only offers windows you have opened. If the day is full, it offers the next open driveway or takes the message, in the words you set. It does not double-book you.',
      },
      {
        q: 'Can I take over a call?',
        a: 'Yes. It is your number. Between driveways, you can pick up. While the machine is running, it answers.',
      },
    ],
    'van',
    'on driveways',
  ),
  finalTitle: 'See it on a Saturday you are already booked.',
  finalBody:
    'Thirty minutes with Will. A detailing menu on the screen, your driveway rules in the conversation. If it is not a fit, you still leave knowing what the missed bookings are worth.',
}

export default trade
