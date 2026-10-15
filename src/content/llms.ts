import { PHONE, SITE } from '@/components/trade/constants'
import { siteNav } from '@/content/site-nav'
import { tradeNav } from '@/content/trades/nav'

const siteLines = {
  '/pricing': 'Published Starter, Pro, and Growth plans. One-time setup. Month-to-month after launch. Built in Olathe for 913 and 816.',
  '/missed-call-text-back':
    'When a call goes unanswered, FrontDesk can text the caller back. The calculator on the page is illustrative. It is not a reply-rate study.',
  '/ai-receptionist-vs-answering-service':
    'How an AI receptionist compares with an answering service: who answers, whether a website is included, and the plans FrontDesk publishes. No competitor names.',
  '/websites':
    'Kansas City web design sold with an AI receptionist, built in Olathe for Overland Park and the rest of the metro.',
} as const satisfies Record<(typeof siteNav)[number]['href'], string>

const tradeLines = {
  cleaning: 'Front office for Kansas City cleaning companies. The line answers while the crew is in a house. Starter takes the message. Pro quotes and books.',
  electricians:
    'Front office for Kansas City electricians. The line answers while you are on a ladder or in a panel. Starter texts the lead. Pro quotes service work and books the visit.',
  'tree-service':
    'Front office for Kansas City tree companies. The line answers while you are in a bucket or running a saw. Removals are booked as a look.',
  painters:
    'Front office for Kansas City painters. The line answers while you are on a ladder or cutting in. Straightforward rooms can sit in a band. Bad walls get a walk.',
  handyman:
    'Front office for Kansas City handymen. The line answers while you are under a sink or on a drywall patch. Small jobs can sit in a band.',
  'mobile-detailing':
    'Front office for Kansas City mobile detailers. The line answers while you are on a driveway. Maintenance details can sit in a band. Paint correction is a look.',
  'lawn-care':
    'Front office for Kansas City lawn companies. The line answers while you are on a mower. Mow routes can sit in a band. Landscape installs are a walk.',
  'pest-control':
    'Front office for Kansas City pest control companies. The line answers while you are in a crawlspace. General pest can sit in a band. Termites are an inspection.',
  plumbers:
    'Front office for Kansas City plumbers, for 913 and 816. The line answers while you are under a sink or in a crawlspace. Starter texts the lead. Pro books the window.',
  hvac: 'Front office for Kansas City heating and air companies, for 913 and 816. The line answers while you are on a roof or in an attic. Maintenance can sit in a band. A replacement is a look.',
  roofing:
    'Front office for Kansas City roofers, for 913 and 816. After hail the line takes the address and the leak. It does not invent a replacement price or an insurance number.',
} as const satisfies Record<(typeof tradeNav)[number]['slug'], string>

function pageLine(href: string, label: string, line: string) {
  const path = href === '/' ? '/' : href
  return `- [${label}](${SITE}${path}): ${line}`
}

export function llmsTxt(): string {
  const pages = [
    pageLine(
      '/',
      'Home',
      'Website, phone answering, and follow-up for Kansas City service businesses, for one monthly price. Built in Olathe by Will Coatney.',
    ),
    ...siteNav.map((page) => pageLine(page.href, page.label, siteLines[page.href])),
    ...tradeNav.map((trade) => pageLine(`/${trade.slug}`, trade.label, tradeLines[trade.slug])),
  ]

  return `# FrontDesk AI

> Website, phone answering, and follow-up for Kansas City service businesses, for one monthly price. Built in Olathe by Will Coatney.

FrontDesk KC (${SITE}) is a website and an AI voice receptionist sold together for Kansas City service businesses, residential or commercial. The voice line uses the number the business already publishes. Starter takes a message and texts the owner the lead. Pro and Growth can quote inside bands the owner sets and book a window. Month-to-month after launch. Run by Will Coatney from Olathe.

Phone: ${PHONE}

## Service area

Kansas City metro, both sides of the state line (913 and 816). Built and run from Olathe, Kansas. Cities named on the site: Overland Park, Olathe, Shawnee, Lenexa, Leawood, Prairie Village, Lee's Summit, Independence, Liberty, and Blue Springs.

## Services

- Website on every plan. One page on Starter. A multi-page site on Pro and Growth.
- Business email on the company domain, set up so the address matches the company on the truck and the Google listing.
- AI voice receptionist on the number already on the truck, the site, and the Google listing. Starter takes a message and texts the owner. Pro and Growth quote inside bands the owner approves and can book.
- Missed-call text-back on every plan. Chat and two-way text are on Pro and Growth.
- GoHighLevel CRM with pipeline and review requests on Pro and Growth.
- Custom dashboard on Growth, fed by the voice line and the CRM.

Plans: ${SITE}/pricing

## Pages

${pages.join('\n')}
`
}
