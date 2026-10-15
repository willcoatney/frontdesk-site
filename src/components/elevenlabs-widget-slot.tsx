/**
 * Mount point for the ElevenLabs chat / voice widget.
 *
 * Leave this empty until the agent is ready. Then render the official embed
 * inside `ElevenLabsWidgetSlot`, for example the convai script and the
 * `<elevenlabs-convai agent-id="...">` element.
 *
 * Do not put a fake chat or a fake voice button here.
 *
 * Analytics sends `chat_widget_open` on the first click inside `#elevenlabs-widget`
 * or on an `elevenlabs-convai` element (including its shadow tree). Clicks that
 * stay inside a cross-origin iframe do not reach the page; call `trackEvent`
 * from the embed in that case. See docs/analytics.md.
 */
export function ElevenLabsWidgetSlot() {
  return (
    <div
      id="elevenlabs-widget"
      data-elevenlabs-widget="placeholder"
      data-status="awaiting-embed"
      hidden
    />
  )
}
