-- Run this once in the Supabase SQL editor (same project as the dashboard).
-- Creates the table the /api/waitlist route writes to.

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  name        text,
  source      text,
  ip_address  text,
  created_at  timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

-- RLS on; the API uses the service-role key which bypasses RLS, so no public
-- policies are needed. This keeps the table inaccessible to anon/public clients.
alter table public.waitlist enable row level security;
