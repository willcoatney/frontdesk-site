'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PLANS, PRICING_NOTE } from '@/content/pricing'
import { siteNav } from '@/content/site-nav'
import { tradeNav } from '@/content/trades/nav'
import {
  Phone,
  MessageSquare,
  Calendar,
  Users,
  TrendingUp,
  CheckCircle,
  X,
  Clock,
  MapPin,
  Zap,
  Shield,
  Play,
  ChevronDown,
  ArrowRight,
  Bot,
  PhoneCall,
  Star,
  BarChart3,
  Inbox,
} from 'lucide-react'

// ─── Sub-components ──────────────────────────────────────────────────────────

function VideoPlaceholder({
  id,
  title,
  description,
}: {
  id: string
  title: string
  description: string
}) {
  return (
    <div className="relative rounded-2xl overflow-hidden border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-purple-950/60 aspect-video flex flex-col items-center justify-center group cursor-pointer">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08)_0%,transparent_70%)]" />
      <div className="relative z-10 text-center px-8">
        <span className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest text-indigo-400 border border-indigo-500/40 bg-indigo-950/60">
          📹 Video Placeholder · {id}
        </span>
        <div className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
          <Play className="w-6 h-6 text-white ml-1" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
        <p className="text-white/50 text-sm max-w-md mx-auto">{description}</p>
        <p className="mt-4 text-indigo-400/70 text-xs">
          Record with NotebookLM · Replace src with your video URL
        </p>
      </div>
    </div>
  )
}

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-5 flex items-start justify-between text-left gap-4 group"
      >
        <span className="text-white font-medium text-lg group-hover:text-indigo-300 transition-colors">
          {q}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-indigo-400 shrink-0 mt-0.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && (
        <p className="pb-6 text-white/60 leading-relaxed">{a}</p>
      )}
    </div>
  )
}

function CheckRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
      <span className="text-white/80">{children}</span>
    </li>
  )
}

function XRow({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
      <span className="text-white/50">{children}</span>
    </li>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function FrontDeskAIPage() {
  const PHONE = '(913) 717-7841'
  const PHONE_HREF = 'tel:+19137177841'
  const BOOK_HREF = 'https://cal.com/willcoatney/frontdesk-ai-demo'

  const faqs = [
    {
      q: 'Does this replace my current phone number?',
      a: "No. We forward your existing business number — or set up a new local KC number — to FrontDesk AI. Callers dial the same number they always have. The AI answers, handles the conversation, books the appointment, and logs everything. You keep full control and can pick up any call at any time.",
    },
    {
      q: 'How does the AI know what to say about my business?',
      a: "During onboarding we spend time with you learning your services, pricing, hours, frequently asked questions, and anything else your front desk would normally know. We feed all of that into the AI's knowledge base. The result sounds like someone who actually works at your practice — not a generic robot reading a script.",
    },
    {
      q: "What happens when the AI can't answer something?",
      a: "If a caller asks something the AI genuinely doesn't know, it offers to take a message and have you call back — just like a good receptionist would. It never guesses. You're also notified immediately via text so you can follow up fast.",
    },
    {
      q: 'Is patient and client data secure?',
      a: "Yes. All data is encrypted in transit and at rest. We use enterprise-grade infrastructure (Supabase and Twilio) that supports HIPAA Business Associate Agreements for healthcare clients. We take data privacy seriously — your clients' information never leaves your private account.",
    },
    {
      q: 'How long does it take to get set up?',
      a: "Most clients are live within 5–7 business days. Onboarding involves a 60-minute discovery call, a knowledge-base review, and a test period where you listen in on AI calls before going fully live. We don't flip a switch and disappear — we stay with you through the first two weeks.",
    },
    {
      q: 'What if I already use scheduling software (Jane, ChiroTouch, etc.)?',
      a: "We integrate with most major scheduling platforms. If yours isn't supported out of the box, we can often build a custom connection. Either way, appointments booked by the AI appear in your existing system — no double data entry.",
    },
    {
      q: 'Do you serve all Kansas City metro areas?',
      a: "Yes — both sides of the state line. Overland Park, Olathe, Shawnee, Lenexa, Leawood, Prairie Village, Lee's Summit, Blue Springs, Liberty, Independence, Raytown, and more. We're local, and we understand the KC market.",
    },
    {
      q: 'Is there a long-term contract?',
      a: "No. Month-to-month after the initial onboarding period. We'd rather earn your business every month than lock you in. That said, most clients stay because it works — not because they're contractually obligated to.",
    },
  ]

  const verticals = [
    { icon: '🦷', label: 'Dental Offices' },
    { icon: '🏥', label: 'Chiropractic' },
    { icon: '💆', label: 'Med Spas & Salons' },
    { icon: '🔧', label: 'HVAC & Plumbing' },
    { icon: '🌿', label: 'Landscaping' },
    { icon: '⚖️', label: 'Law Offices' },
    { icon: '🦴', label: 'Physical Therapy' },
    { icon: '🚗', label: 'Auto Repair' },
    { icon: '🏡', label: 'Home Services' },
    { icon: '👁️', label: 'Optometry' },
    { icon: '🐾', label: 'Veterinary' },
    { icon: '💪', label: 'Fitness Studios' },
  ]

  return (
    <div className="min-h-screen bg-[#080D1A] text-white font-sans">

      {/* ── NAV ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#080D1A]/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-bold tracking-tight">FrontDesk AI</span>
              <span className="block text-[11px] leading-tight text-white/45">FrontDesk KC</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-white/60">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#who-its-for" className="hover:text-white transition-colors">Who It's For</a>
            <Link href="/cleaning" className="hover:text-white transition-colors">Cleaning</Link>
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <a
            href={BOOK_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-semibold px-5 py-2.5 rounded-lg"
          >
            Book a Demo
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-40 pb-28 px-6 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(99,102,241,0.25),transparent)]" />
        <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/40 bg-indigo-950/60 text-indigo-300 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Now serving Kansas City service businesses
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
            Your Front Desk.{' '}
            <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Working 24/7.
            </span>{' '}
            Powered by AI.
          </h1>

          <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            FrontDesk AI answers every call, books every appointment, follows up with every lead, and gives you a full dashboard to see it all — so you stop losing business to voicemail.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={BOOK_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold px-8 py-4 rounded-xl text-lg shadow-lg shadow-indigo-900/40 hover:shadow-indigo-600/30 hover:-translate-y-0.5"
            >
              <Calendar className="w-5 h-5" />
              Book a Free Demo
            </a>
            <a
              href={PHONE_HREF}
              className="flex items-center gap-2 border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all text-white font-semibold px-8 py-4 rounded-xl text-lg"
            >
              <PhoneCall className="w-5 h-5 text-indigo-400" />
              Call {PHONE}
            </a>
          </div>

          <p className="mt-6 text-white/30 text-sm">
            No obligation. 30-minute call. We'll show you exactly how it works for your type of business.
          </p>
        </div>

        {/* Fake UI preview */}
        <div className="max-w-5xl mx-auto mt-20 relative z-10">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/60">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
              <div className="w-3 h-3 rounded-full bg-red-500/60" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/60" />
              <span className="ml-3 text-white/30 text-sm font-mono">FrontDesk AI — Command Center</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-white/10 text-sm">
              {/* Sidebar */}
              <div className="p-4 space-y-3 col-span-1 bg-black/20">
                <p className="text-white/30 text-xs uppercase tracking-widest font-semibold mb-2">Today</p>
                {[
                  { name: 'Sarah M.', action: 'Booked 2pm', status: 'emerald' },
                  { name: 'Incoming call', action: 'AI answered', status: 'indigo' },
                  { name: 'John D.', action: 'Confirmed via SMS', status: 'emerald' },
                  { name: 'Missed → Follow-up', action: 'Text sent', status: 'violet' },
                  { name: 'Mike R.', action: 'New inquiry', status: 'yellow' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                    <span className={`w-2 h-2 rounded-full shrink-0 bg-${item.status}-400`} />
                    <div className="min-w-0">
                      <p className="text-white/90 font-medium truncate">{item.name}</p>
                      <p className="text-white/40 text-xs">{item.action}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Main area */}
              <div className="col-span-2 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold">Today's Appointments</h3>
                  <span className="text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-950/40 px-2 py-0.5 rounded-full">AI Active</span>
                </div>
                <div className="space-y-2">
                  {[
                    { time: '9:00 AM', name: 'Karen T.', type: 'New Patient Consultation', confirmed: true },
                    { time: '10:30 AM', name: 'David L.', type: 'Follow-up Adjustment', confirmed: true },
                    { time: '2:00 PM', name: 'Sarah M.', type: 'Initial Exam — booked via AI', confirmed: true },
                    { time: '3:30 PM', name: 'Open Slot', type: '', confirmed: false },
                  ].map((appt, i) => (
                    <div key={i} className={`flex items-center gap-4 p-3 rounded-lg ${appt.confirmed ? 'bg-white/5' : 'bg-indigo-950/30 border border-dashed border-indigo-500/20'}`}>
                      <span className="text-white/40 font-mono text-sm w-20 shrink-0">{appt.time}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium">{appt.name}</p>
                        {appt.type && <p className="text-white/40 text-xs">{appt.type}</p>}
                      </div>
                      {appt.confirmed && (
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VERTICALS BAR ── */}
      <section className="border-y border-white/10 py-5 px-6 bg-white/[0.02] overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/40 text-sm">
            <span className="text-white/25 font-medium text-xs uppercase tracking-widest">Built for</span>
            {['Chiropractic', 'Dental', 'HVAC & Plumbing', 'Landscaping', 'Med Spas', 'Law Offices', 'Physical Therapy', 'Auto Repair', 'Salons', 'Veterinary'].map((v) => (
              <span key={v} className="hover:text-white/70 transition-colors cursor-default">{v}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE PROBLEM ── */}
      <section className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">The Problem</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
              Every missed call is a{' '}
              <span className="text-red-400">missed patient.</span>
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              You're busy doing the work. Your front desk is overwhelmed, on hold, or clocked out. And your phone keeps ringing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                stat: '62%',
                label: 'of calls in a 2016 study of 85 small businesses did not reach a live person',
                context:
                  '411 Locals monitored those businesses for 30 days: about 38% were answered live, about 38% went to voicemail, and about 24% got no response. One vendor study, not a current census.',
                icon: '📞',
              },
              {
                stat: 'Next',
                label: 'company often gets the caller when nobody picks up',
                context:
                  'People who need an answer today call someone else. The often-repeated “85% won’t call back” line has no study we can cite, so it is not a number on this site.',
                icon: '👋',
              },
              {
                stat: '$200+',
                label: 'illustrative value people use for one missed call',
                context:
                  'Illustrative, not a measured average. What a missed call is worth depends on the work. A busy week of unanswered calls adds up faster than one visit.',
                icon: '💸',
              },
            ].map((item) => (
              <div key={item.stat} className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-5xl font-black text-red-400 mb-2">{item.stat}</div>
                <p className="text-white font-semibold mb-3">{item.label}</p>
                <p className="text-white/50 text-sm leading-relaxed">{item.context}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-5">The situation most KC business owners are in right now:</h3>
                <ul className="space-y-3">
                  <XRow>Front desk staff is handling in-office clients while the phone rings</XRow>
                  <XRow>After-hours callers get voicemail and never leave a message</XRow>
                  <XRow>Follow-up texts to missed callers happen inconsistently, if at all</XRow>
                  <XRow>Appointment reminders go out manually (or don't go out at all)</XRow>
                  <XRow>You have no idea how many leads you're actually losing</XRow>
                  <XRow>A receptionist hire costs $2,500–$4,000/month before benefits</XRow>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-5 text-emerald-400">What it looks like with FrontDesk AI:</h3>
                <ul className="space-y-3">
                  <CheckRow>Every call answered in under 2 rings, 24 hours a day</CheckRow>
                  <CheckRow>Appointments booked directly into your calendar by the AI</CheckRow>
                  <CheckRow>Missed callers automatically texted within 60 seconds</CheckRow>
                  <CheckRow>Reminders sent automatically 24h and 2h before every appointment</CheckRow>
                  <CheckRow>Full dashboard showing every lead, every conversation, every booking</CheckRow>
                  <CheckRow>From $197 a month, against $2,500–$4,000 for a receptionist before benefits</CheckRow>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VIDEO 1 ── */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <VideoPlaceholder
            id="V1"
            title="Hear FrontDesk AI Answer a Real Call"
            description="A 90-second listen to how the AI handles a new patient inquiry — from greeting to appointment booked."
          />
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">The Platform</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
              One command center. Everything included.
            </h2>
            <p className="text-white/60 text-xl max-w-2xl mx-auto">
              FrontDesk AI isn't just a phone bot. It's a full operations layer for your business — built to work together, not bolted together.
            </p>
          </div>

          <div className="space-y-6">

            {/* Feature 1 - AI Voice Receptionist */}
            <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 to-indigo-950/10 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div>
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center">
                      <Phone className="w-5 h-5 text-indigo-400" />
                    </div>
                    <span className="text-indigo-300 font-semibold text-sm uppercase tracking-wider">Module 1</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI Voice Receptionist</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    A natural-sounding AI answers your calls 24/7, handles the conversation intelligently, and books appointments in real time. Not a phone tree. Not a robot. An actual conversation.
                  </p>
                  <ul className="space-y-2.5">
                    <CheckRow>Answers in under 2 rings, any hour, any day</CheckRow>
                    <CheckRow>Trained on your specific services, pricing, and FAQs</CheckRow>
                    <CheckRow>Books into your live calendar — no double booking</CheckRow>
                    <CheckRow>Handles common questions without you lifting a finger</CheckRow>
                    <CheckRow>Transfers to you or takes a message when needed</CheckRow>
                  </ul>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-6 font-mono text-sm">
                  <p className="text-white/30 text-xs mb-4 uppercase tracking-widest">Sample call — Chiropractic office</p>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-indigo-400 shrink-0">AI:</span>
                      <span className="text-white/80">"Thank you for calling Olathe Family Chiropractic. This is Sarah. How can I help you today?"</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-white/40 shrink-0">Caller:</span>
                      <span className="text-white/60">"I've been having lower back pain and wanted to see about getting an appointment."</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400 shrink-0">AI:</span>
                      <span className="text-white/80">"Absolutely, I can help with that. Are you a new patient with us, or have you been seen before?"</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-white/40 shrink-0">Caller:</span>
                      <span className="text-white/60">"New patient."</span>
                    </div>
                    <div className="flex gap-3">
                      <span className="text-indigo-400 shrink-0">AI:</span>
                      <span className="text-white/80">"Perfect. We have a new patient consultation available this Thursday at 2pm or Friday at 10am. Which works better for you?"</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-white/10 text-emerald-400 text-xs">
                      ✓ Appointment booked · Calendar updated · Confirmation text sent
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature 2 - SMS Follow-Up */}
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-950/40 to-violet-950/10 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-10 items-center">
                <div className="order-2 md:order-1 rounded-xl border border-white/10 bg-black/30 p-5 space-y-3">
                  <p className="text-white/30 text-xs uppercase tracking-widest font-mono mb-4">SMS Thread — Missed call follow-up</p>
                  {[
                    { from: 'AI', text: "Hi, this is FrontDesk AI from Olathe Family Chiropractic — we just missed your call. Can we help you get an appointment scheduled? Reply here anytime.", time: '2:14 PM', align: 'left' },
                    { from: 'Client', text: "Yes! I was calling about back pain. Do you have anything this week?", time: '2:22 PM', align: 'right' },
                    { from: 'AI', text: "We do! Thursday at 2pm or Friday at 10am. Which works for you?", time: '2:22 PM', align: 'left' },
                    { from: 'Client', text: "Thursday works", time: '2:23 PM', align: 'right' },
                    { from: 'AI', text: "Perfect — you're booked for Thursday, June 12th at 2:00 PM. We'll send a reminder the day before. See you then! 😊", time: '2:23 PM', align: 'left' },
                  ].map((msg, i) => (
                    <div key={i} className={`flex ${msg.align === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${msg.align === 'right' ? 'bg-indigo-600/40 text-white' : 'bg-white/10 text-white/80'}`}>
                        <p>{msg.text}</p>
                        <p className="text-white/30 text-xs mt-1">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="order-1 md:order-2">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-violet-600/30 border border-violet-500/40 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-violet-400" />
                    </div>
                    <span className="text-violet-300 font-semibold text-sm uppercase tracking-wider">Module 2</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-4">AI Text Follow-Up</h3>
                  <p className="text-white/60 text-lg leading-relaxed mb-6">
                    Missed a call? The AI texts that person back within 60 seconds and picks up the conversation in SMS. Most businesses never do this. You'll do it automatically, every time.
                  </p>
                  <ul className="space-y-2.5">
                    <CheckRow>Missed call → automatic text within 60 seconds</CheckRow>
                    <CheckRow>Two-way SMS conversation handled by AI</CheckRow>
                    <CheckRow>Books appointments directly over text</CheckRow>
                    <CheckRow>Appointment reminders 24h and 2h before</CheckRow>
                    <CheckRow>Re-engagement texts for no-shows and lapsed clients</CheckRow>
                  </ul>
                </div>
              </div>
            </div>

            {/* Features 3-5 Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  icon: Calendar,
                  color: 'emerald',
                  module: 'Module 3',
                  title: 'Smart Calendar',
                  desc: 'Your availability, always up to date. The AI books directly into your calendar in real time — no back-and-forth, no double bookings, no manual entry. Block time off, set buffer windows, and manage recurring schedules with ease.',
                  bullets: ['Real-time booking — no lag', 'Buffer times between appointments', 'Block off unavailable times', 'Multi-provider support', 'Google Calendar sync'],
                },
                {
                  icon: Inbox,
                  color: 'cyan',
                  module: 'Module 4',
                  title: 'Unified Conversations',
                  desc: 'Every text, email, and call log in one threaded view. Stop switching between your phone, your email, and your CRM. See every interaction with every client in one clean inbox — and respond from one place.',
                  bullets: ['SMS + email in one inbox', 'Full conversation history per contact', 'AI-handled threads flagged for review', 'Internal notes per client', 'Filter by status or date'],
                },
                {
                  icon: TrendingUp,
                  color: 'orange',
                  module: 'Module 5',
                  title: 'Opportunities Pipeline',
                  desc: 'Every inquiry tracked from first contact to active client. See exactly where every lead stands — no guessing, no spreadsheets. Drag and drop through stages and know your close rate at a glance.',
                  bullets: ['Kanban pipeline view', 'Stages: New → Booked → Attended → Active', 'Revenue tracking per stage', 'Conversion rate reporting', 'Follow-up task reminders'],
                },
              ].map((feat) => {
                const Icon = feat.icon
                return (
                  <div key={feat.title} className={`rounded-2xl border border-${feat.color}-500/25 bg-gradient-to-br from-${feat.color}-950/30 to-transparent p-7`}>
                    <div className="flex items-center gap-3 mb-5">
                      <div className={`w-10 h-10 rounded-xl bg-${feat.color}-600/20 border border-${feat.color}-500/30 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 text-${feat.color}-400`} />
                      </div>
                      <span className={`text-${feat.color}-300 font-semibold text-xs uppercase tracking-wider`}>{feat.module}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-5">{feat.desc}</p>
                    <ul className="space-y-2">
                      {feat.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm">
                          <CheckCircle className={`w-4 h-4 text-${feat.color}-400 shrink-0 mt-0.5`} />
                          <span className="text-white/70">{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      {/* ── VIDEO 2 ── */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <VideoPlaceholder
            id="V2"
            title="Dashboard Walkthrough — 5 Minutes"
            description="A quick tour of the command center: calendar view, conversations inbox, contacts, and your opportunity pipeline."
          />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">The Process</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
              Up and running in one week.
            </h2>
            <p className="text-white/60 text-xl max-w-xl mx-auto">
              We handle the setup. You handle the appointments that start rolling in.
            </p>
          </div>

          <div className="space-y-6">
            {[
              {
                step: '01',
                title: 'Discovery Call (60 minutes)',
                desc: "We sit down — virtually or in person — and learn your business inside and out. Your services, your pricing, your hours, your common questions, your scheduling rules. Anything a good receptionist would know, we capture.",
                detail: "By the end of this call, we have everything we need to train your AI. Most clients are surprised how much of this knowledge is already in their heads — we just extract it.",
              },
              {
                step: '02',
                title: 'Build & Test (3–5 days)',
                desc: "We configure your AI, integrate it with your calendar, set up your command center dashboard, and run test calls. You listen in and approve before we go live. Nothing launches until you're satisfied.",
                detail: "During this phase we also port or forward your existing business number, set up your SMS follow-up sequences, and configure your opportunity pipeline stages to match how your business actually works.",
              },
              {
                step: '03',
                title: 'Go Live & Stay Sharp',
                desc: "Your AI receptionist goes live. Calls get answered. Appointments get booked. You check the dashboard when you want to. We monitor the system and refine the AI based on real calls in the first two weeks.",
                detail: "After launch we stay hands-on for 30 days — listening to call recordings, improving AI responses, and making sure everything runs exactly as you expected. Then we're available monthly for tune-ups as your business evolves.",
              },
            ].map((s, i) => (
              <div key={i} className="flex gap-8 items-start rounded-2xl border border-white/10 bg-white/[0.03] p-8">
                <div className="text-5xl font-black text-indigo-600/40 leading-none shrink-0 select-none">
                  {s.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">{s.title}</h3>
                  <p className="text-white/70 text-lg leading-relaxed mb-3">{s.desc}</p>
                  <p className="text-white/45 leading-relaxed text-sm">{s.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ── */}
      <section id="who-its-for" className="py-28 px-6 border-y border-white/10 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">Who It's For</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
              Built for the businesses that run on appointments.
            </h2>
            <p className="text-white/60 text-xl max-w-xl mx-auto">
              If you serve customers who call to book, FrontDesk AI was made for you.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {verticals.map((v) => (
              <div key={v.label} className="flex flex-col items-center text-center gap-3 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-indigo-500/30 transition-all p-6 cursor-default">
                <span className="text-3xl">{v.icon}</span>
                <span className="text-white/80 font-medium text-sm">{v.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-white/40 mt-8 text-sm">
            Don't see your industry? <a href={PHONE_HREF} className="text-indigo-400 hover:underline">Call us</a> — if you take appointments, we can likely help.
          </p>
        </div>
      </section>

      {/* ── LOCAL ADVANTAGE ── */}
      <section className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-indigo-500/25 bg-gradient-to-br from-indigo-950/40 to-purple-950/20 p-10 md:p-16">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">The Local Advantage</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Not a faceless SaaS.<br />
                  Built right here in{' '}
                  <span className="text-indigo-400">Kansas City.</span>
                </h2>
                <div className="space-y-5 text-white/65 leading-relaxed">
                  <p>
                    Most AI tools for small businesses are built by venture-backed startups in San Francisco who've never met a chiropractor, a plumber, or a salon owner. They build for everyone, which means they work well for no one.
                  </p>
                  <p>
                    FrontDesk AI is different. It's built and operated by someone in Olathe, Kansas who works with local businesses every day. When you call, you get me — not a support ticket queue in another timezone.
                  </p>
                  <p>
                    I understand that your clients expect a personal touch. That the KC market has its own rhythms. That local credibility matters when you're trusting someone with how your phone gets answered. I'm your neighbor, not your vendor.
                  </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <a
                    href={BOOK_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-colors text-white font-bold px-6 py-3 rounded-xl"
                  >
                    <Calendar className="w-4 h-4" />
                    Book a Demo
                  </a>
                  <a
                    href={PHONE_HREF}
                    className="flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 transition-colors text-white font-semibold px-6 py-3 rounded-xl"
                  >
                    <Phone className="w-4 h-4 text-indigo-400" />
                    {PHONE}
                  </a>
                </div>
              </div>
              <div className="flex flex-col gap-5">
                {/* Founder card placeholder */}
                <div className="rounded-2xl border border-white/15 bg-white/5 p-7">
                  <div className="flex items-center gap-4 mb-4">
                    {/* TODO: Replace with your actual photo */}
                    <div className="w-14 h-14 rounded-full bg-indigo-600/30 border-2 border-indigo-500/40 flex items-center justify-center text-2xl">
                      👋
                    </div>
                    <div>
                      <p className="text-white font-bold">Will Coatney</p>
                      <p className="text-white/50 text-sm">Olathe, KS · Founder</p>
                    </div>
                  </div>
                  <p className="text-white/60 text-sm leading-relaxed">
                    "I built FrontDesk AI because I watched too many great local businesses lose customers to voicemail. You're working hard inside — I wanted to make sure the phone is working just as hard outside."
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🏡', label: 'Locally owned', sub: 'Olathe, KS' },
                    { icon: '📞', label: 'Direct support', sub: 'Real person, fast response' },
                    { icon: '🔧', label: 'Custom setup', sub: 'No cookie-cutter config' },
                    { icon: '🤝', label: 'Month-to-month', sub: 'No long-term contracts' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <div className="text-2xl mb-2">{item.icon}</div>
                      <p className="text-white font-semibold text-sm">{item.label}</p>
                      <p className="text-white/45 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">How We Stack Up</span>
            <h2 className="text-4xl font-bold mt-3 mb-5">The honest comparison.</h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto">
              You have options. Here's what each one actually costs you.
            </p>
          </div>
          <div className="overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left p-5 text-white/40 font-medium">Feature</th>
                  {[
                    { label: 'FrontDesk AI', highlight: true },
                    { label: 'Human Receptionist', highlight: false },
                    { label: 'Generic SaaS (GHL)', highlight: false },
                    { label: 'Nothing', highlight: false },
                  ].map((col) => (
                    <th
                      key={col.label}
                      className={`p-5 text-center font-bold ${col.highlight ? 'text-indigo-300 bg-indigo-950/40' : 'text-white/60'}`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ['Available 24/7', '✅', '❌', '⚠️ Partial', '❌'],
                  ['Answers in <2 rings', '✅', '❌ Hold times', '❌', '❌'],
                  ['Quotes and books', 'Pro & Growth', '✅', '⚠️ Complex setup', '❌'],
                  ['Automatic SMS follow-up', '✅', '❌', '✅', '❌'],
                  ['Custom dashboard', 'Growth', '❌', '⚠️ DIY', '❌'],
                  ['CRM pipeline and reviews', 'Pro & Growth', '❌', '⚠️ DIY', '❌'],
                  ['Local KC support', '✅', 'Varies', '❌', 'N/A'],
                  ['Setup time', '~1 week', '2–4 weeks', 'Months of DIY', 'N/A'],
                  ['Monthly cost', '$197–$797+', '$2,500–4,000', '$297+ (self-managed)', '$0 + lost leads'],
                ].map(([feature, ...vals]) => (
                  <tr key={feature} className="border-b border-white/5 hover:bg-white/[0.02]">
                    <td className="p-5 text-white/70 font-medium">{feature}</td>
                    {vals.map((val, i) => (
                      <td
                        key={i}
                        className={`p-5 text-center ${i === 0 ? 'bg-indigo-950/20 text-emerald-400 font-semibold' : 'text-white/40'}`}
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── VIDEO 3 ── */}
      <section className="py-10 px-6">
        <div className="max-w-4xl mx-auto">
          <VideoPlaceholder
            id="V3"
            title="Onboarding: What the First Week Looks Like"
            description="Walk through the onboarding process from discovery call to go-live — so you know exactly what to expect."
          />
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-28 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">Pricing</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">Simple. Transparent. Local.</h2>
          <p className="text-white/60 text-xl max-w-xl mx-auto mb-14">
            No per-user fees. No per-minute charges. Three plans. Setup is a one-time fee on the plan you pick.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl border p-8 text-left flex flex-col ${plan.highlight ? 'border-indigo-500/50 bg-gradient-to-br from-indigo-950/60 to-indigo-950/20' : 'border-white/10 bg-white/5'}`}
              >
                {plan.badge ? (
                  <div className="mb-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-indigo-600/20 border border-indigo-500/30 px-3 py-1 rounded-full">
                      {plan.badge}
                    </span>
                  </div>
                ) : (
                  <div className="mb-4 h-[26px]" aria-hidden />
                )}
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-4xl font-black">{plan.priceLabel}</span>
                  <span className="text-white/40">{plan.period}</span>
                </div>
                <p className="text-white/45 text-sm mb-3">One-time setup {plan.setupLabel}</p>
                <p className="text-white/55 text-sm mb-6">{plan.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {plan.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm">
                      <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlight ? 'text-indigo-400' : 'text-emerald-400'}`} />
                      <span className="text-white/75">{b}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={BOOK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-auto block text-center font-bold py-3.5 rounded-xl transition-colors ${plan.highlight ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'border border-white/20 hover:bg-white/10 text-white'}`}
                >
                  Book a Demo
                </a>
              </div>
            ))}
          </div>
          <p className="mt-8 text-white/35 text-sm">
            {PRICING_NOTE}
          </p>
          <p className="mt-4 text-sm text-white/45">
            <Link href="/pricing" className="text-indigo-300 hover:text-white">Full pricing and FAQ</Link>
            <span aria-hidden> · </span>
            <Link href="/missed-call-text-back" className="text-indigo-300 hover:text-white">Missed-call text-back</Link>
            <span aria-hidden> · </span>
            <Link href="/ai-receptionist-vs-answering-service" className="text-indigo-300 hover:text-white">Vs an answering service</Link>
            <span aria-hidden> · </span>
            <Link href="/websites" className="text-indigo-300 hover:text-white">Kansas City web design</Link>
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="py-16 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-indigo-400 font-semibold text-sm uppercase tracking-widest">FAQ</span>
            <h2 className="text-4xl font-bold mt-3">Common questions.</h2>
          </div>
          <div>
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <p className="mt-10 text-center text-white/40">
            More questions?{' '}
            <a href={PHONE_HREF} className="text-indigo-400 hover:underline">
              Call {PHONE}
            </a>{' '}
            — you'll get a real person.
          </p>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/60 to-purple-950/40 p-12 md:p-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(99,102,241,0.2),transparent)]" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black mb-5">
                Ready to stop losing business<br />to voicemail?
              </h2>
              <p className="text-white/60 text-xl mb-10 max-w-xl mx-auto">
                Book a 30-minute demo. We'll show you exactly how FrontDesk AI works for your type of business — no slides, no sales pitch. Just a live demo.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href={BOOK_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-bold px-10 py-4 rounded-xl text-lg shadow-lg shadow-indigo-900/50 hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5" />
                  Book a Free Demo
                </a>
                <a
                  href={PHONE_HREF}
                  className="flex items-center gap-2 border border-white/20 hover:bg-white/10 transition-colors text-white font-semibold px-10 py-4 rounded-xl text-lg"
                >
                  <Phone className="w-5 h-5 text-indigo-400" />
                  Call {PHONE}
                </a>
              </div>
              <p className="mt-6 text-white/30 text-sm">
                Serving Overland Park · Olathe · Shawnee · Lenexa · Lee&apos;s Summit · and all KC metro
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/10 py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold">FrontDesk AI</span>
              <span className="text-white/30 text-sm">· FrontDesk KC · Olathe, KS</span>
            </div>
            <p className="text-white/30 text-sm">
              © {new Date().getFullYear()} FrontDesk KC. All rights reserved.
            </p>
          </div>
          <nav aria-label="Pages" className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-white/50">
            {siteNav.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white/80 transition-colors">
                {item.label}
              </Link>
            ))}
          </nav>
          <nav aria-label="Trades" className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-sm text-white/40">
            {tradeNav.map((trade) => (
              <Link key={trade.slug} href={`/${trade.slug}`} className="hover:text-white/70 transition-colors">
                {trade.label}
              </Link>
            ))}
            <a href={PHONE_HREF} className="hover:text-white/70 transition-colors flex items-center gap-1.5">
              <Phone className="w-4 h-4" />
              {PHONE}
            </a>
          </nav>
        </div>
      </footer>

    </div>
  )
}
