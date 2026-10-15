import { costFaq, editsFaq } from '@/content/pricing'
import { missedCallCalculator } from '@/content/missed-call'
import { tradeStats } from '@/content/trades/shared'
import { tradeNav } from '@/content/trades/nav'
import type { DemoConfig } from '@/content/trades/types'

export const HOME_PATH = '/'

export const HOME_TITLE = 'AI Receptionist for Kansas City Businesses | FrontDesk AI'

export const HOME_DESCRIPTION =
  'AI receptionist for Kansas City businesses. An AI answering service for small business: the website, phone answering, and follow-up for one monthly price.'

export const HOME_OG_TITLE = HOME_TITLE

export const HOME_OG_DESCRIPTION = HOME_DESCRIPTION

export const HOME_OG_IMAGE = '/og/home.png'

export const HOME_OG_ALT =
  'FrontDesk AI: your front desk, working 24/7 for Kansas City service businesses.'

const tradeLines = {
  cleaning: 'Recurring cleans and move-outs, booked while the crew is in a house.',
  electricians: 'The line answers while you are on a ladder.',
  'tree-service': 'Removals and storm calls, without a price invented from the ground.',
  painters: 'The estimate is captured while the brush is in your hand.',
  handyman: 'Punch lists sorted while you are mid-repair.',
  'mobile-detailing': 'Driveway jobs booked while you are on a vehicle.',
  'lawn-care': 'Route calls answered while you are on the mower.',
  'pest-control': 'The pest is named before a price is.',
  plumbers: 'Answered while you are under the sink.',
  hvac: 'A no-cool call is a diagnostic, not a system price.',
  roofing: 'Storm calls book an inspection, not a roof price.',
} as const satisfies Record<(typeof tradeNav)[number]['slug'], string>

export const tradePicks = tradeNav.map((trade) => ({
  slug: trade.slug,
  label: trade.label,
  line: tradeLines[trade.slug],
}))

export const homeStats = tradeStats({
  stat: '$200+',
  label: 'illustrative value people use for one missed call',
  context:
    'Illustrative, not a measured average and not a FrontDesk result. What a missed call is worth depends on the job. The calculator on this page uses your numbers instead of this one.',
})

export const homeCalculator = missedCallCalculator

export const howSteps = [
  {
    title: 'A 15-minute demo',
    body: 'Your services, the hours you actually work, and what the phone is allowed to say. In the metro, Will can meet you. On the call, bring a real week if you have one. You leave knowing which plan fits, or that it does not.',
  },
  {
    title: 'We build it around the company',
    body: 'The site goes up, your existing number is forwarded, and the rules are loaded. You hear test calls before a customer does. Starter texts you the lead. Pro and Growth can quote inside bands you set and book the window.',
  },
  {
    title: 'About a week to go live',
    body: 'Plan on about a week from the demo, once we have the services, the hours, and the rules. Missed calls get a text back. The lead has a place to land. You go back to the job.',
  },
] as const

export const included = [
  {
    title: 'Website',
    plan: 'Every plan',
    body: 'One page on Starter. A multi-page site on Pro and Growth, written around the work you do here. This is not a design-only studio.',
  },
  {
    title: 'Business email',
    plan: 'Setup',
    body: 'Will sets up mail on your domain so the address matches the company on the truck and the Google listing.',
  },
  {
    title: 'AI voice receptionist',
    plan: 'Every plan',
    body: 'It answers the number already on the truck, the site, and the Google listing. Starter takes a message and texts you. Pro and Growth quote inside bands you approve and book.',
  },
  {
    title: 'Follow-up',
    plan: 'Every plan',
    body: 'Missed-call text-back is on every plan. Chat and two-way text are on Pro and Growth, so an after-hours message does not sit until morning.',
  },
  {
    title: 'GoHighLevel CRM',
    plan: 'Pro and Growth',
    body: 'Pipeline and review requests. A lead is a stage you can see, not a text you meant to answer between jobs.',
  },
  {
    title: 'Dashboard',
    plan: 'Growth',
    body: 'A custom view fed by the voice line and the CRM. The day, the leads, and the review ask. It is not included on Starter or Pro.',
  },
  {
    title: 'Someone who shows up',
    plan: 'Every plan',
    body: 'Will Coatney sets it up from Olathe. You hear the test calls with him. After launch it is month-to-month, and you can call the same person.',
  },
] as const

export const before = [
  'You are on a job. The call goes to voicemail.',
  'The person who needed an answer today calls the next company.',
  'The website is a page you meant to update last winter.',
  'Follow-up is a text you send at night, if you remember.',
  'You cannot see which leads died.',
]

export const after = [
  'The same call is answered on the number you already publish.',
  'Starter texts you the lead. Pro and Growth can hold a window inside rules you set.',
  'The site and the phone are one offer, for one monthly price.',
  'A missed call gets a text back. The lead is not left on a voicemail.',
  'On Pro the lead sits in GoHighLevel. On Growth it is on the dashboard too.',
]

export const homeDemos: DemoConfig = {
  company: 'Hearthline Services',
  short: 'Hearthline',
  initial: 'H',
  site: 'hearthline.example',
  call: {
    time: '10:18 AM',
    lines: [
      { who: 'AI', text: 'Thanks for calling Hearthline Services. This is Nora. What do you need done?' },
      { who: 'Caller', text: 'I am in Shawnee. I called earlier and got voicemail. Can someone come Thursday?' },
      {
        who: 'AI',
        text: 'I can take that. What is the work, and is someone home after 3? I will not name a price until it matches a band the owner set.',
      },
      { who: 'Caller', text: 'A short list of repairs. After 3 on Thursday works.' },
      {
        who: 'AI',
        text: 'Thursday 3:30 to 5:30 is open. I will hold it and text the owner the city and the list. If it sits outside what he prices on the phone, he confirms before anyone is locked in.',
      },
      { who: 'Caller', text: 'Hold it.' },
      {
        who: 'AI',
        text: 'You are on the board for Thursday, Shawnee, 3:30 to 5:30. A text is going to you and to the owner.',
      },
    ],
    headline: 'Answered at 10:18, while the owner was still on a job.',
    body: 'This sample is the Pro line: it can hold a window inside rules the owner already set. Starter would take the message and text the owner, and stop there. It does not invent a price.',
    note: 'Hearthline Services is fictional. Not a client, and not a result.',
  },
  chat: {
    time: '7:05 PM',
    introTitle: 'After hours, the thread still has a place to go.',
    intro: 'On Pro and Growth, the site chat follows the same rule as the phone. Starter does not include chat.',
    groupLabel: 'Try a sample thread',
    scenarios: [
      {
        id: 'visit',
        label: 'A visit',
        lines: [
          { who: 'Them', text: 'Shawnee. A short repair list. Thursday after 3?' },
          { who: 'AI', text: 'Thursday 3:30 to 5:30 is open. I will not quote until the list matches a band the owner set. Hold the window?' },
          { who: 'Them', text: 'Yes.' },
          { who: 'AI', text: 'Held. Shawnee, Thursday 3:30 to 5:30. The owner has the text.' },
        ],
      },
      {
        id: 'price',
        label: 'A price',
        lines: [
          { who: 'Them', text: 'How much for the whole house?' },
          { who: 'AI', text: 'I will not price a whole-house job from a sentence. I can book a look, or text the owner if you want a person on it.' },
          { who: 'Them', text: 'Book the look.' },
          { who: 'AI', text: 'The look is on the board. A person prices it after seeing the house.' },
        ],
      },
      {
        id: 'missed',
        label: 'A missed call',
        lines: [
          { who: 'Them', text: 'I just called and nobody picked up.' },
          { who: 'AI', text: 'Sorry about that. What do you need, and which city is the job in? I will text the owner either way.' },
          { who: 'Them', text: 'Olathe. A callback tomorrow morning is fine.' },
          { who: 'AI', text: 'Noted. Olathe, callback tomorrow morning. The owner has it.' },
        ],
      },
    ],
    note: 'Sample only. Hearthline Services is fictional. Your bands, not a rate card.',
  },
  dashboard: {
    schedule: [
      { time: '8:30 AM', name: 'Olathe', detail: 'On the job · phone covered' },
      { time: '11:00 AM', name: 'Lenexa look', detail: 'Booked from chat · no price yet' },
      { time: '1:30 PM', name: 'Overland Park', detail: 'Message texted to the owner' },
      { time: '3:30 PM', name: 'Shawnee window', detail: 'Held by the voice line' },
    ],
    flash: 'New · text at 7:06 PM · Olathe, callback tomorrow morning.',
    leads: [
      { stage: 'New', detail: 'Olathe callback · missed call · text' },
      { stage: 'Window', detail: 'Shawnee · voice · Thursday 3:30' },
      { stage: 'Look', detail: 'Lenexa · chat · price after the visit' },
      { stage: 'Message', detail: 'Overland Park · owner has the text' },
    ],
    reviewTitle: 'Queued after the Shawnee visit is marked done',
    reviewBody:
      'Thanks for having Hearthline out today. If the visit earned it, a short Google review helps the next neighbor who needs the same work.',
    reviewNote: 'You approve the wording once. Sample for a fictional company. Review requests are on Pro and Growth.',
  },
}

export const homeFaqs = [
  {
    q: 'What do I get for the monthly price?',
    a: 'A website, an AI voice receptionist on the number you already use, and follow-up when a call is missed. Starter is $197 a month with a $297 setup: a one-page site, voice that takes a message and texts you the lead, missed-call text-back, and up to 2 site edits a month. Pro is $397 a month with a $497 setup: a multi-page site, voice that quotes and books, chat and text, GoHighLevel with pipeline and review requests, and up to 5 site edits a month. Growth starts at $797 a month with a $997 setup and is quoted up from there. It adds a custom dashboard, a monthly strategy call, and priority turnaround.',
  },
  {
    q: 'Which plan actually quotes and books?',
    a: 'Pro and Growth. Starter takes the message and texts you the lead. It does not quote a job or hold a calendar slot. The custom dashboard is on Growth only. If the company sits outside the three plans, the price is a custom quote after the demo.',
  },
  {
    q: 'Do I have to change my phone number?',
    a: 'No. We forward the number already on the truck, the site, and the Google listing, whether it is 913 or 816. Customers keep dialing it. If you would rather keep that line for yourself, we can add a local Kansas City number instead.',
  },
  {
    q: 'How long until it is live?',
    a: 'Plan on about a week from the 15-minute demo, once we have your services, hours, and the rules for how calls should be handled. That week covers the site, the number forwarding, and test calls you hear before a customer does. You keep working while that happens.',
  },
  {
    q: 'Is there a long contract?',
    a: 'No. Month-to-month after launch. Cancel anytime. Setup is a one-time fee on the plan you pick. There is no per-minute charge on these three plans.',
  },
  editsFaq(),
  costFaq(),
  {
    q: 'What if it does not know the answer?',
    a: 'It takes a message and texts you. It does not guess a price, a diagnosis, or a promise you did not write down. You can still pick up the phone yourself.',
  },
  {
    q: 'Is this only for one trade, or only residential?',
    a: 'No. It is for Kansas City service businesses, residential or commercial. The trade pages are the same offer written around that work. If your trade is not listed, book the demo and we will say whether it fits.',
  },
  {
    q: 'Do you cover both sides of the state line?',
    a: 'Yes. FrontDesk is run from Olathe for the Kansas City metro, including Overland Park, Shawnee, Lenexa, Leawood, Prairie Village, Lee’s Summit, Independence, Liberty, and Blue Springs. Will is local. You can call him, and he can meet you.',
  },
  {
    q: 'What is the founding-client rate?',
    a: 'The first five clients can ask about a founding-client rate on the demo. We do not publish that price. It is an offer, not a fourth plan, and it is not a discount we have invented a number for on this page.',
  },
]
