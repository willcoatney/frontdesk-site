import { Calendar, Phone } from 'lucide-react'
import { BOOKING_URL } from '@/content/booking'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]'

const CALL_LABEL = 'Or call (913) 349-8507'
const CALL_HREF = 'tel:+19133498507'

export function BookDemo({
  className = '',
  children = 'Book a 15-minute demo',
  id,
  compact = false,
  header = false,
  tone = 'brand',
}: {
  className?: string
  children?: React.ReactNode
  id?: string
  compact?: boolean
  header?: boolean
  tone?: 'brand' | 'inverse'
}) {
  const toneClass =
    tone === 'inverse'
      ? 'bg-[#F6F3EC] text-[#1B4332] shadow-none hover:bg-white'
      : 'bg-[#1B4332] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_-16px_rgba(27,67,50,0.95)] hover:bg-[#245C45]'
  const sizeClass = compact
    ? 'px-2.5 text-sm leading-tight'
    : header
      ? 'px-3 text-sm leading-tight sm:px-5 sm:text-base sm:leading-normal'
      : 'px-5 text-base'

  return (
    <a
      id={id}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl text-center font-semibold whitespace-normal transition-colors ${sizeClass} ${toneClass} ${focus} ${className}`}
    >
      {tone === 'brand' ? <Calendar className="size-4 shrink-0" aria-hidden /> : null}
      {children}
    </a>
  )
}

export function CallWill({
  className = '',
  children = CALL_LABEL,
  compact = false,
  tone = 'brand',
}: {
  className?: string
  children?: React.ReactNode
  compact?: boolean
  tone?: 'brand' | 'inverse'
}) {
  const toneClass =
    tone === 'inverse'
      ? 'border-white/30 bg-transparent text-white hover:bg-white/10'
      : 'border-[#DDD5C8] bg-[#FBF8F3] text-[#1C1915] hover:border-[#1B4332]'
  const sizeClass = compact ? 'px-2.5 text-sm leading-tight' : 'px-5 text-base'

  return (
    <a
      href={CALL_HREF}
      aria-label={CALL_LABEL}
      className={`inline-flex min-h-12 min-w-0 items-center justify-center gap-2 rounded-xl border text-center font-semibold whitespace-normal transition-colors ${sizeClass} ${toneClass} ${focus} ${className}`}
    >
      {tone === 'brand' && !compact ? <Phone className="size-4 shrink-0 text-[#1B4332]" aria-hidden /> : null}
      {children}
    </a>
  )
}
