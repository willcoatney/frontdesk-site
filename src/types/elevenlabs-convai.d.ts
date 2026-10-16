import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/**
 * Official ConvAI embed. Attributes match the unpkg widget script.
 * React 19 forwards these strings onto the custom element.
 */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'elevenlabs-convai': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'agent-id'?: string
        'override-first-message'?: string
        'markdown-link-allowed-hosts'?: string
      }
    }
  }
}
