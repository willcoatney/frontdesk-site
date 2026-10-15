'use client'

import { useEffect, useState } from 'react'
import { BookDemo, CallWill } from './links'

export function StickyCta() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const top = document.getElementById('top-cta')
    const end = document.getElementById('final-cta')
    if (!top || !end) return

    let topVisible = true
    let endVisible = false
    const update = () => setShow(!topVisible && !endVisible)
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === top) topVisible = entry.isIntersecting
          if (entry.target === end) endVisible = entry.isIntersecting
        }
        update()
      },
      { threshold: 0.25 },
    )
    observer.observe(top)
    observer.observe(end)
    return () => observer.disconnect()
  }, [])

  if (!show) return null

  return (
    <div
      id="sticky-cta"
      role="region"
      aria-label="Book a demo or call"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-[#DDD5C8] bg-[#F3EFE7]/95 px-3 pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] shadow-[0_-10px_30px_-24px_rgba(28,25,21,0.45)] backdrop-blur-md md:hidden"
    >
      <div className="grid grid-cols-2 gap-2">
        <BookDemo compact className="w-full" />
        <CallWill compact className="w-full" />
      </div>
    </div>
  )
}
