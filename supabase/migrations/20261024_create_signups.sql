-- Applied to the Review Buddy Supabase project on 2026-10-24.
-- One row per trial request from the website form. Only the server writes to it.
-- Row level security is ON and there is no policy, so the public (anon) key can neither read nor write.

create table if not exists public.signups (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  name text not null,
  business_name text not null,
  mobile text not null,
  email text not null,
  website_or_gbp text not null,
  trade_and_suburb text,
  job_software text,
  plan text not null default 'growth' check (plan in ('starter','growth','unsure')),
  stage text not null default 'new_signup',
  source text not null default 'website_form',
  attribution_src text,
  attribution_post text,
  alert_sent_at timestamptz,
  is_test boolean not null default false
);

comment on table public.signups is 'One row per trial request from the Review Buddy website form. Written server side only. The CRM people table grows from this.';

create index if not exists signups_created_at_idx on public.signups (created_at desc);
create index if not exists signups_email_idx on public.signups (lower(email));
create index if not exists signups_stage_idx on public.signups (stage);

alter table public.signups enable row level security;
revoke all on table public.signups from anon, authenticated;
