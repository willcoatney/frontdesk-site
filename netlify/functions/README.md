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
