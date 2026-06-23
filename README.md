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

All "Sign up" / "Get started" CTAs point to `/waitlist`. The form stores the
signup in Supabase (`waitlist` table) and emails a notification via Resend.

**Setup:**
1. Run [`supabase/waitlist.sql`](supabase/waitlist.sql) once in the Supabase SQL editor.
2. Set these env vars (see `.env.example`):
   - `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — store signups
   - `RESEND_API_KEY`, `WAITLIST_FROM_EMAIL`, `WAITLIST_NOTIFY_EMAIL` — email notification

If Resend isn't configured the signup is still stored (the email is best-effort).

## Dependencies on the dashboard

- **Supabase** — `/blog` reads posts and `/api/feedback` writes feedback. Uses the
  same Supabase project as the dashboard (no schema changes needed).
- Everything else is fully static / self-contained.
