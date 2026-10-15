# Netlify functions

## elevenlabs-call-alert.mjs

`elevenlabs-call-alert.mjs` verifies the ElevenLabs HMAC signature (`ELEVENLABS_WEBHOOK_SECRET`) and forwards lead alerts with a Bearer header (`FRONTDESK_ALERT_WEBHOOK_AUTH`).
