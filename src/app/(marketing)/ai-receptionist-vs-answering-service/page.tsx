import { FaqList } from '@/components/trade/faq'
import { FaqSchema, ServiceAndBusinessSchema } from '@/components/trade/schema'
import { PaperHeading, PaperPage, RelatedLinks } from '@/components/paper/shell'
import { RECEPTIONIST_COMPARE } from '@/content/pricing'
import { pageMeta } from '@/lib/page-meta'

const PATH = '/ai-receptionist-vs-answering-service'

const rows: { topic: string; front: string; service: string }[] = [
  {
    topic: 'Who picks up',
    front: 'An AI voice on the number you already use. You hear test calls before a customer does.',
    service: 'A person. Often off-site, working from a script you give them.',
  },
  {
    topic: 'Website',
    front: 'Included. Starter is a one-page site. Pro and Growth are a full multi-page site.',
    service: 'Their offer, not ours to describe. Some include a site and some do not. We are not stating a rule for the category.',
  },
  {
    topic: 'What the line will do',
    front:
      'Starter takes a message, texts you the lead, and sends a missed-call text. Pro and Growth can quote and book inside rules you set, and they add chat and text. Growth adds a custom dashboard.',
    service:
      'A person can take a message. Some services will book if you give them a calendar and a script. What they will quote is their policy. We are not summarizing a vendor we have not named.',
  },
  {
    topic: 'Price',
    front:
      'Published. Starter $197 a month, setup $297. Pro $397 a month, setup $497. Growth from $797 a month, setup $997, quoted up. No per-minute fee on these plans. Month-to-month after launch.',
    service:
      'Usually a monthly fee, a per-minute fee, or both. We do not list their rates. We also do not claim FrontDesk is always the cheaper option. Compare the invoice you were quoted with the prices on this page.',
  },
  {
    topic: 'A person on staff',
    front: RECEPTIONIST_COMPARE,
    service:
      'An answering service is not the same thing as hiring a receptionist. A receptionist is an employee on your hours. An answering service is a vendor. This row is about the employee, because that is the comparison we can put a range on.',
  },
  {
    topic: 'When a person is the better fit',
    front:
      'A call that needs judgment you have not written down. Insurance numbers, medical advice, a price you have not set, anything the line should hand to you instead of inventing.',
    service:
      'If you want a person on every call and you are willing to pay for that coverage, an answering service is built for it. FrontDesk is not a claim that software is always the right desk.',
  },
]

const faqs = [
  {
    q: 'Is FrontDesk cheaper than an answering service?',
    a: 'We do not know, because we are not publishing their rates. Answering services are often priced as a monthly fee, a per-minute fee, or both, and those numbers vary. FrontDesk Starter is $197 a month with a $297 setup. Pro is $397 a month with a $497 setup. Growth starts at $797 a month with a $997 setup. There is no per-minute fee on these plans. Put their quote next to these prices. Do not take this page as a claim that we always win that comparison.',
  },
  {
    q: 'Do you name competitors?',
    a: 'No. This page compares a category, an answering service, with what FrontDesk actually sells. It does not review a named company, and it does not invent their features or their prices.',
  },
  {
    q: 'Does an answering service include a website?',
    a: 'Ask them. FrontDesk includes a website on every plan: one page on Starter, a multi-page site on Pro and Growth. Whether another company includes one is their offer.',
  },
  {
    q: 'Can the AI do everything a person can?',
    a: 'No. Starter takes messages and texts. Pro and Growth quote and book inside bands and rules you approve. A call that needs judgment outside those rules should come to you. A person at an answering service can also miss that line if the script is thin. Neither option is a substitute for a decision you have not made.',
  },
  {
    q: 'How is this different from hiring a receptionist?',
    a: RECEPTIONIST_COMPARE,
  },
  {
    q: 'Where is this run from?',
    a: 'Olathe, Kansas, for the Kansas City metro, including 913 and 816 numbers. You keep the number already on the truck and the Google listing, or we can add a local one.',
  },
]

export const metadata = pageMeta({
  path: PATH,
  title: 'AI receptionist vs answering service — an honest comparison | FrontDesk KC',
  description:
    'How FrontDesk AI compares with an answering service: who answers, whether a website is included, and the prices we publish. No competitor names and no invented rates.',
  ogTitle: 'An AI receptionist and an answering service.',
  ogDescription:
    'An honest comparison. FrontDesk prices are published. Answering-service rates are not listed here, and we do not claim we are always cheaper.',
  ogImage: '/og/ai-receptionist-vs-answering-service.png',
  ogAlt: 'FrontDesk AI compared with an answering service, without competitor prices.',
})

export default function ComparisonPage() {
  return (
    <PaperPage
      currentHref={PATH}
      kicker="Compare"
      title="An AI receptionist and an answering service are not the same product."
      lede="One is software on your number, with a website included, at a published monthly price. The other is a person, usually priced by the month, the minute, or both. This page says what FrontDesk sells. It does not invent the other side’s rates, and it does not claim we are always cheaper."
      schema={
        <>
          <FaqSchema path={PATH} faqs={faqs} />
          <ServiceAndBusinessSchema
            path={PATH}
            name="FrontDesk AI"
            serviceType="AI receptionist"
            image="/og/ai-receptionist-vs-answering-service.png"
          />
        </>
      }
    >
      <section className="border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PaperHeading
            kicker="Side by side"
            title="What we will say, and what we will not."
            lede="The FrontDesk column is our offer. The answering-service column is the shape of the category. Where we do not know a vendor’s price or feature, the cell says so."
          />
          <div className="mt-8 overflow-x-auto rounded-2xl border border-[#DDD5C8] bg-[#FBF8F3]">
            <table className="w-full min-w-[40rem] text-left text-sm">
              <caption className="sr-only">FrontDesk AI compared with a typical answering service</caption>
              <thead>
                <tr className="border-b border-[#E7E0D4] text-[#5C564E]">
                  <th scope="col" className="px-4 py-3 font-semibold">Topic</th>
                  <th scope="col" className="px-4 py-3 font-semibold text-[#1B4332]">FrontDesk AI</th>
                  <th scope="col" className="px-4 py-3 font-semibold">An answering service</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.topic} className="border-b border-[#E7E0D4] align-top last:border-0">
                    <th scope="row" className="px-4 py-4 font-semibold text-[#1C1915]">{row.topic}</th>
                    <td className="px-4 py-4 leading-relaxed text-[#3C3832]">{row.front}</td>
                    <td className="px-4 py-4 leading-relaxed text-[#3C3832]">{row.service}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#5C564E]">
            No company is named in that table on purpose. If you have a quote in hand, use these published prices next to it. Starter $197, Pro $397, Growth from $797, plus the one-time setup on that plan.
          </p>
          <RelatedLinks omit={PATH} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <PaperHeading kicker="Questions" title="The comparison, without a winner declared." />
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
    </PaperPage>
  )
}
