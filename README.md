# CruxLogic Marketing Site

The public, front-facing website — extracted from the dashboard so it can be
deployed independently to **Vercel** while the authenticated app stays on Fly.io.

## What's here

Public pages: home (`/`), `pricing`, `compare` (+ `[slug]`), `blog` (+ `[slug]`),
`contact-us`, `support`, `privacy-policy`, `terms-of-service`, `security`, and the
`tools/*` generators.

App-only routes (`/login`, `/sign-up`, `/logout`, `/dashboard`) are **redirected**
to the dashboard via `next.config.mjs` → `NEXT_PUBLIC_DASHBOARD_URL`.

## Local dev

```bash
npm install
cp .env.example .env.local   # fill in the Supabase keys
npm run dev                  # http://localhost:3000
```

## Deploy to Vercel

1. Import this directory as a Vercel project (set the **Root Directory** to
   `marketing-site` if the repo root is the monorepo).
2. Framework preset: **Next.js** (auto-detected).
3. Add the environment variables from `.env.example` in the Vercel dashboard.
4. Point your apex domain (e.g. `cruxlogic.ai`) at this project, and host the
   dashboard on a subdomain (e.g. `app.cruxlogic.ai`).

## Waitlist

All "Sign up" / "Get started" CTAs point to `/waitlist`. The form emails you a
notification via Resend (no database — signups arrive in your inbox).

**Setup:** set these env vars (see `.env.example`):
- `RESEND_API_KEY` — your Resend API key
- `WAITLIST_FROM_EMAIL` — sender, on a domain verified in Resend
- `WAITLIST_NOTIFICATION_EMAIL` — where signup notifications are sent

## Dependencies on the dashboard

- **Supabase** — `/blog` reads posts and `/api/feedback` writes feedback. Uses the
  same Supabase project as the dashboard (no schema changes needed).
- Everything else is fully static / self-contained.
