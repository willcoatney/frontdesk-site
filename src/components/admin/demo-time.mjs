const ZONE = 'America/Chicago'

export function formatDemoCentral(iso) {
  const time = Date.parse(iso || '')
  if (!Number.isFinite(time)) return ''
  const date = new Date(time)
  const part = (options) => new Intl.DateTimeFormat('en-US', { timeZone: ZONE, ...options }).format(date)
  const clock = part({ hour: 'numeric', minute: '2-digit', hour12: true }).replace(/[\u202f\u00a0]/g, ' ')
  return `Demo: ${part({ weekday: 'short' })} ${part({ month: 'short' })} ${part({ day: 'numeric' })}, ${clock} CT`
}

export function compareDemoBooked(a, b) {
  const time = (prospect) => {
    const value = Date.parse(prospect?.demoAt || '')
    return Number.isFinite(value) ? value : Number.POSITIVE_INFINITY
  }
  return time(a) - time(b)
}
