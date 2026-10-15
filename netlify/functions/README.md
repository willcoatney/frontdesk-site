# Netlify functions

## elevenlabs-call-alert.mjs

`elevenlabs-call-alert.mjs` verifies the ElevenLabs HMAC signature (`ELEVENLABS_WEBHOOK_SECRET`) and forwards lead alerts with a Bearer header (`FRONTDESK_ALERT_WEBHOOK_AUTH`).
Webhook URL: /.netlify/functions/elevenlabs-call-alert

After a verified `post_call_transcription`, it also upserts a prospect in the internal pipeline (stage `new`, source `inbound call`) and dedupes by phone. A save failure is logged and does not change the alert response.

## admin.mjs

Password-gated pipeline API used by `/admin`. Every response sends `X-Robots-Tag: noindex`.

Set these in the Netlify UI (never commit them):

- `ADMIN_PASSWORD` — password for `/admin`
- `ADMIN_SESSION_SECRET` — long random string that signs the `fd_admin` session cookie

Prospects are stored in Netlify Blobs (site store `frontdesk-pipeline`, key `prospects`). No extra database or env vars. Seed data is imported from the `/admin` screen after login, not from the repo.

## admin-booking.mjs

`POST /.netlify/functions/admin-booking` upserts a prospect when a demo is booked. Other methods return 405.

Auth is `Authorization: Bearer <token>`, compared in constant time with `FRONTDESK_BOOKING_SYNC_TOKEN`. A missing or wrong token is 401. If that env var is unset, the function returns 503.

```json
{
  "name": "Summit Plumbing",
  "email": "owner@summit.example",
  "phone": "913-555-0101",
  "start": "2026-10-16T19:30:00Z",
  "eventId": "evt_123",
  "notes": "Optional note"
}
```

`name`, `email`, `start`, and `eventId` are required. `phone` and `notes` are optional. `start` is an ISO 8601 instant with `Z` or a numeric offset. The function stores that instant as `demoAt` and the id as `demoEventId`.

It finds an existing prospect by `eventId`, then email, then a unique normalized phone, then business name. A new prospect is stage `demo booked` and source `booking`. An existing prospect in `new`, `contacted`, `replied`, or `demo booked` moves to `demo booked`. `won` and `lost` stay where they are so a booking does not reopen a closed prospect; the demo time and note are still saved. Sending the same `eventId` again updates that prospect. A changed `start` updates `demoAt`. An identical replay returns `action: "unchanged"`.

```bash
curl -X POST https://frontdeskkc.com/.netlify/functions/admin-booking \
  -H "Authorization: Bearer $FRONTDESK_BOOKING_SYNC_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Summit Plumbing","email":"owner@summit.example","phone":"913-555-0101","start":"2026-10-16T19:30:00Z","eventId":"evt_123","notes":"Optional note"}'
```

Set `FRONTDESK_BOOKING_SYNC_TOKEN` in the Netlify UI. Do not commit it.
