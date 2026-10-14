import { Calendar, Phone } from 'lucide-react'
import { BOOK_HREF, PHONE, PHONE_HREF } from './constants'

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B4332]'

export function BookDemo({
  className = '',
  children = 'Book a Demo',
  id,
}: {
  className?: string
  children?: React.ReactNode
  id?: string
}) {
  return (
    <a
      id={id}
      href={BOOK_HREF}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#1B4332] px-5 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_28px_-16px_rgba(27,67,50,0.95)] transition-colors hover:bg-[#245C45] ${focus} ${className}`}
    >
      <Calendar className="size-4 shrink-0" aria-hidden />
      {children}
    </a>
  )
}

export function CallWill({
  className = '',
  children,
  compact = false,
}: {
  className?: string
  children?: React.ReactNode
  compact?: boolean
}) {
  return (
    <a
      href={PHONE_HREF}
      aria-label={`Call ${PHONE}`}
      className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#DDD5C8] bg-[#FBF8F3] px-5 text-base font-semibold text-[#1C1915] transition-colors hover:border-[#1B4332] ${focus} ${className}`}
    >
      <Phone className="size-4 shrink-0 text-[#1B4332]" aria-hidden />
      {children ?? (compact ? 'Call' : `Call ${PHONE}`)}
    </a>
  )
}
