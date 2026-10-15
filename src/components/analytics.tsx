'use client'

import Script from 'next/script'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { BOOKING_URL } from '@/content/booking'
import {
  classifyAnchor,
  hitsChatWidget,
  isAdminPath,
  linkLocation,
  measurementId,
  pendingScrollMarks,
  SCROLL_MARKS,
} from '@/lib/analytics-events.mjs'

const GA_MEASUREMENT_ID = measurementId(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID)

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: Gtag
    __fdGaConfigured?: string
  }
}

function installGtag(id: string) {
  window.dataLayer = window.dataLayer || []
  if (typeof window.gtag !== 'function') {
    window.gtag = function gtag() {
      window.dataLayer?.push(arguments)
    } as Gtag
  }
  if (window.__fdGaConfigured === id) return
  window.gtag('js', new Date())
  window.gtag('config', id, { send_page_view: false })
  window.__fdGaConfigured = id
}

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (!GA_MEASUREMENT_ID || typeof window === 'undefined') return
  if (isAdminPath(window.location.pathname)) return
  if (typeof window.gtag !== 'function') return
  window.gtag('event', name, params)
}

function anchorFromPath(path: EventTarget[]) {
  for (const node of path) {
    if (node instanceof Element && node.tagName === 'A' && node.hasAttribute('href')) return node
  }
  return null
}

function AnalyticsListeners({ id, pathname }: { id: string; pathname: string }) {
  const scrollSeen = useRef(new Set<number>())
  const chatSeen = useRef(false)

  useEffect(() => {
    installGtag(id)
    const pagePath = () => `${window.location.pathname}${window.location.search}`
    window.gtag?.('event', 'page_view', {
      page_path: pagePath(),
      page_location: window.location.href,
      page_title: document.title,
    })

    scrollSeen.current = new Set()
    chatSeen.current = false
    let frame = 0
    let scrollListening = true

    const reportScroll = () => {
      const marks = pendingScrollMarks(
        scrollSeen.current,
        window.scrollY,
        window.innerHeight,
        document.documentElement.scrollHeight,
      )
      const page_path = pagePath()
      for (const percent of marks) {
        scrollSeen.current.add(percent)
        window.gtag?.('event', 'scroll_depth', { page_path, percent_scrolled: percent })
      }
      if (scrollSeen.current.size >= SCROLL_MARKS.length && scrollListening) {
        window.removeEventListener('scroll', onScroll)
        scrollListening = false
      }
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        reportScroll()
      })
    }

    const onClick = (event: MouseEvent) => {
      const path = typeof event.composedPath === 'function' ? event.composedPath() : []
      const page_path = pagePath()
      if (hitsChatWidget(path)) {
        if (!chatSeen.current) {
          chatSeen.current = true
          window.gtag?.('event', 'chat_widget_open', { page_path })
        }
        return
      }
      const anchor = anchorFromPath(path)
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href) return
      const hit = classifyAnchor({ href, pageUrl: window.location.href, bookingUrl: BOOKING_URL })
      if (!hit) return
      window.gtag?.('event', hit.event, {
        page_path,
        link_url: hit.link_url,
        link_location: linkLocation(anchor),
      })
    }

    const onSubmit = (event: Event) => {
      const form = event.target
      if (!(form instanceof HTMLFormElement)) return
      window.gtag?.('event', 'form_submit', {
        page_path: pagePath(),
        form_id: form.id || form.getAttribute('name') || '',
        form_action: form.getAttribute('action') || '',
      })
    }

    document.addEventListener('click', onClick)
    document.addEventListener('submit', onSubmit, true)
    window.addEventListener('scroll', onScroll, { passive: true })
    reportScroll()

    return () => {
      document.removeEventListener('click', onClick)
      document.removeEventListener('submit', onSubmit, true)
      if (scrollListening) window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [id, pathname])

  return null
}

export function Analytics() {
  const pathname = usePathname()
  if (!GA_MEASUREMENT_ID || !pathname || isAdminPath(pathname)) return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <AnalyticsListeners id={GA_MEASUREMENT_ID} pathname={pathname} />
    </>
  )
}
