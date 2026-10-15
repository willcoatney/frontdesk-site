import { PaperHeading, PaperPage, RelatedLinks } from '@/components/paper/shell'
import { LeakCalculator } from '@/components/trade/calculator'
import { FaqList } from '@/components/trade/faq'
import { FaqSchema, ServiceAndBusinessSchema } from '@/components/trade/schema'
import styles from '@/components/trade/trade.module.css'
import { missedCallCalculator } from '@/content/missed-call'
import { UNANSWERED_STUDY } from '@/content/trades/shared'
import { pageMeta } from '@/lib/page-meta'

const PATH = '/missed-call-text-back'

const faqs = [
  {
    q: 'What is missed-call text-back?',
    a: 'When a call is not answered, FrontDesk sends the caller a text so they can reply instead of hanging up on voicemail. Starter includes it, along with a voice line that takes a message and texts you the lead. Pro and Growth include it too, and those plans can also quote and book on a live answer.',
  },
  {
    q: 'Do you have a reply rate for the text?',
    a: 'No. We are not publishing a text-back reply rate, a conversion rate, or a claim that a text recovers the same jobs as a live answer. The calculator on this page does not measure that. It is an illustrative model of missed contacts, with a booking assumption you can read in the math.',
  },
  {
    q: 'What does the calculator assume?',
    a: 'It multiplies a week of calls by 4.33 to get a month, applies the missed share you set, then assumes 1 in 3 of those missed contacts would book if they were answered, at the job value you set. That 1-in-3 figure is an assumption, not your close rate and not a study. Repeat work is left out. The presets are example weeks, not a Kansas City average. Every result is labeled illustrative.',
  },
  {
    q: 'Is the 62% figure from my phone?',
    a: `${UNANSWERED_STUDY} Use it as context, then put your own missed share in the calculator.`,
  },
  {
    q: 'Does text-back replace answering the phone?',
    a: 'No. The text is the backup for a call that already went unanswered. Starter still answers live when the line is free to take a message. Pro and Growth can quote and book on that live answer. A text is not a substitute for a price you have not set.',
  },
  {
    q: 'Will the text invent a price?',
    a: 'No. Starter texts you the lead and texts the caller so the conversation can continue. It does not quote. Pro and Growth quote only inside bands you approve, and they hand off anything those bands do not cover.',
  },
]

export const metadata = pageMeta({
  path: PATH,
  title: 'Missed-call text-back for Kansas City service businesses — FrontDesk AI',
  description:
    'When a call goes unanswered, FrontDesk can text the caller back. Starter includes it at $197 a month. The calculator on this page is illustrative. It is not a reply-rate study.',
  ogTitle: 'The call you missed can text back.',
  ogDescription:
    'Missed-call text-back is on every FrontDesk plan, starting at $197 a month. The calculator is illustrative, not a conversion study.',
  ogImage: '/og/missed-call-text-back.png',
  ogAlt: 'FrontDesk AI missed-call text-back: an unanswered call can get a text instead of a dead end.',
})

export default function MissedCallPage() {
  return (
    <PaperPage
      currentHref={PATH}
      kicker="Missed-call text-back"
      title="The call you could not take can still get a text."
      lede="You are on a job, the phone rings, and the caller gets voicemail. Missed-call text-back sends them a text so the lead is not a dead end. It is included on Starter at $197 a month, and on Pro and Growth. We are not claiming a reply rate for that text."
      schema={
        <>
          <FaqSchema path={PATH} faqs={faqs} />
          <ServiceAndBusinessSchema
            path={PATH}
            name="Missed-call text-back"
            serviceType="Missed-call text-back"
            image="/og/missed-call-text-back.png"
          />
        </>
      }
    >
      <section className="border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PaperHeading
            kicker="What it is"
            title="A text after the missed call. Not a magic close rate."
            lede="The voice line still answers when it can. The text is what goes out when it cannot. Starter takes a message and texts you the lead. Pro and Growth can quote and book on the calls they do answer. None of that is a published conversion percentage."
          />
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              {
                stat: '62%',
                label: 'of calls in one small-business study did not reach a live person',
                context: UNANSWERED_STUDY,
              },
              {
                stat: 'Next',
                label: 'listing often gets the job when you do not pick up',
                context:
                  'The often-repeated “85% won’t call back” line has no study we can cite, so it is not a number on this page.',
              },
              {
                stat: '$197',
                label: 'a month is Starter, which includes the text-back',
                context:
                  'Setup is $297, once. Pro is $397 a month. Growth starts at $797. These are the published prices, not a savings claim against another vendor.',
              },
            ].map((item) => (
              <div key={item.stat} className={`${styles.card} p-5`}>
                <dt className={`${styles.display} text-5xl tracking-tight text-[#9C4221]`}>{item.stat}</dt>
                <dd className="mt-3">
                  <p className="font-semibold text-[#1C1915]">{item.label}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#5C564E]">{item.context}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-24 bg-[#EAE3D7]/70 px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <PaperHeading
            kicker="Illustrative calculator"
            title="What a week of missed contacts might be worth."
            lede="This is not a text-back study. It does not count replies to a text. It uses the same model as the trade pages: of the contacts you miss, it assumes 1 in 3 would book if someone answered, at the job value you set. That rate is an assumption. Move the sliders to your week. The presets are examples, not a Kansas City average."
          />
          <div className="mt-6">
            <LeakCalculator config={missedCallCalculator} />
          </div>
          <RelatedLinks omit={PATH} />
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 border-t border-[#E7E0D4] px-4 py-14 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl">
          <PaperHeading kicker="Questions" title="What the text does, and what it does not." />
          <div className="mt-6">
            <FaqList faqs={faqs} />
          </div>
        </div>
      </section>
    </PaperPage>
  )
}
