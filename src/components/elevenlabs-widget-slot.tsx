/**
 * Mount point for the ElevenLabs chat / voice widget.
 *
 * Leave this empty until the agent is ready. Then render the official embed
 * inside `ElevenLabsWidgetSlot`, for example the convai script and the
 * `<elevenlabs-convai agent-id="...">` element.
 *
 * Do not put a fake chat or a fake voice button here.
 *
 * Analytics listens for a click on #elevenlabs-widget or an elevenlabs-convai
 * element and sends chat_widget_open. The hook stays generic so a later embed
 * in this mount is picked up without a change here. See docs/analytics.md.
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
