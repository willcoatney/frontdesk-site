'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { isAdminPath } from '@/lib/analytics-events.mjs'

const AGENT_ID = 'agent_9401m50cjw2kfh2b4bskwbjds260'
const FIRST_MESSAGE =
  "Hi, this is FrontDesk AI's receptionist. Want a quick look at how we can help your business?"
/** Tells the agent this session is the site widget, not a phone call. */
const DYNAMIC_VARIABLES = '{"channel":"web"}'
const WIDGET_SCRIPT = 'https://unpkg.com/@elevenlabs/convai-widget-embed'

/** Space between the launcher and the top of the mobile call/book bar. */
const STICKY_GAP_PX = 12

/**
 * Site-wide ElevenLabs chat and voice widget.
 *
 * The root layout mounts this once. `/admin` does not render it.
 * Analytics sends `chat_widget_open` on the first click inside
 * `#elevenlabs-widget` or on `elevenlabs-convai` (including its shadow tree).
 * See docs/analytics.md.
 */
export function ElevenLabsWidgetSlot() {
  const pathname = usePathname()
  const hidden = Boolean(pathname && isAdminPath(pathname))

  useEffect(() => {
    if (hidden) return

    const mobile = window.matchMedia('(max-width: 767px)')
    let frame = 0

    const apply = () => {
      const host = document.querySelector('elevenlabs-convai')
      if (!(host instanceof HTMLElement)) return
      const bar = document.getElementById('sticky-cta')
      const lift = mobile.matches && bar ? `${Math.ceil(bar.getBoundingClientRect().height) + STICKY_GAP_PX}px` : ''
      if (host.style.getPropertyValue('--fd-widget-lift') === lift) return
      if (lift) {
        host.dataset.lift = 'sticky'
        host.style.setProperty('--fd-widget-lift', lift)
      } else {
        delete host.dataset.lift
        host.style.removeProperty('--fd-widget-lift')
      }
    }

    const schedule = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        apply()
      })
    }

    schedule()
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { childList: true, subtree: true })
    mobile.addEventListener('change', schedule)
    window.addEventListener('resize', schedule)

    return () => {
      observer.disconnect()
      mobile.removeEventListener('change', schedule)
      window.removeEventListener('resize', schedule)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [hidden])

  if (hidden) return null

  return (
    <div id="elevenlabs-widget">
      <elevenlabs-convai
        agent-id={AGENT_ID}
        override-first-message={FIRST_MESSAGE}
        dynamic-variables={DYNAMIC_VARIABLES}
        markdown-link-allowed-hosts="calendar.app.google"
      />
      <Script src={WIDGET_SCRIPT} strategy="afterInteractive" async type="text/javascript" />
    </div>
  )
}
