# Analytics

Public pages can send GA4 events. `/admin` and `/api/admin` do not load gtag. There is no second tracker and no cookie banner.

## Environment

`NEXT_PUBLIC_GA_MEASUREMENT_ID`

Set this in Netlify **before** the build. The site is a static export, so Next inlines `NEXT_PUBLIC_*` values at build time. A value added only to the function runtime is invisible to the pages. Redeploy after changing it.

The value must look like `G-XXXXXXXX`. If the variable is missing, blank, or not in that shape, the analytics component renders nothing: no gtag script, no network call, and no console error.

## What loads

`Analytics` is mounted once in the root layout. It reads the measurement ID and the pathname.

- On a public page it loads `https://www.googletagmanager.com/gtag/js?id=…` with `next/script` and `strategy="afterInteractive"`.
- gtag is configured with `send_page_view: false`. The component sends one `page_view` when the App Router pathname changes, including the first load. That avoids a second automatic hit for the same page.
- On `/admin`, `/admin/…`, `/api/admin`, and `/api/admin/…` the component returns nothing, so those documents do not include the gtag script.

A client-side navigation onto `/admin` unmounts the listeners. A direct load of `/admin` never inserts the script.

## Events

Event names are fixed so `click_call` and `click_book_demo` can be marked as key events. Listeners are delegated (one click listener, one submit listener, one scroll listener). Scroll marks fire once per page. The chat event fires once per page.

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | First load and each App Router pathname change | `page_path`, `page_location`, `page_title` |
| `click_call` | Click on a `tel:` link | `page_path`, `link_url`, `link_location` |
| `click_book_demo` | Click on a link to `BOOKING_URL` | `page_path`, `link_url`, `link_location` |
| `click_outbound` | Click on an http(s) link to another site, except `BOOKING_URL` | `page_path`, `link_url`, `link_location` |
| `chat_widget_open` | First click in `#elevenlabs-widget` or on an `elevenlabs-convai` element, per page | `page_path` |
| `form_submit` | A form `submit` on a public page | `page_path`, `form_id`, `form_action` |
| `scroll_depth` | Scroll reaches 25, 50, 75, and 90 percent, once each per page | `page_path`, `percent_scrolled` |

`link_location` is the nearest ancestor id (`top-cta`, `final-cta`, `sticky-cta`, …), otherwise `header`, `footer`, or `nav`, otherwise `page`.

`form_id` is the form `id` or `name`. Field values are not sent. The public pages do not have forms today; the listener is there for a form added later. Admin forms are not tracked.

`mailto:` and `sms:` links are not outbound events.

A page that fits in the viewport does not emit `scroll_depth`. Marks are based on how far the user has scrolled through the overflow, not on the page merely existing.

## Chat widget

`src/components/elevenlabs-widget-slot.tsx` renders an empty `#elevenlabs-widget` until the ElevenLabs embed is placed inside it. The listener uses the click’s composed path, so a launcher button in the `elevenlabs-convai` shadow tree counts as `chat_widget_open`.

Clicks inside a cross-origin iframe do not reach the page. If the embed only opens from inside an iframe, call `trackEvent('chat_widget_open', { page_path: location.pathname })` from the embed code. `trackEvent` does nothing when the measurement ID is unset or the current path is `/admin`.

## Mark key events

1. Deploy with `NEXT_PUBLIC_GA_MEASUREMENT_ID` set, then click a call link and a demo link on the live site.
2. In GA4, open **Admin → Data display → Events** (or **Reports → Realtime** while testing).
3. When `click_call` and `click_book_demo` appear, mark each as a **key event**. GA4 still labels these as conversions in some reports.
4. Custom parameters (`link_location`, `percent_scrolled`, and the rest) show in reports after they are registered as custom dimensions if you need them broken out. The event counts do not wait on that.
