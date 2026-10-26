-- Free review breakdown requests. The site inserts with the service role.
-- It does not render this table, and the form falls back to email when
-- SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  business_name text not null,
  email text not null,
  mobile text,
  source text,
  source_post text,
  created_at timestamptz not null default now()
);

alter table public.leads enable row level security;
