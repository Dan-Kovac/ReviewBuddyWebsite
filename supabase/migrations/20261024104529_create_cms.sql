-- Review Buddy simple CMS: blog posts and how-to docs.
-- Additive only. Does not touch public.signups or any auth data.
-- Already applied to Supabase project yoobqwfrbnpiinbovvta as migration create_cms.

create extension if not exists pgcrypto;

-- Categories ---------------------------------------------------------------
create table if not exists public.content_categories (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('blog', 'doc')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  name text not null,
  sort_order integer not null default 0,
  unique (kind, slug)
);

-- Posts --------------------------------------------------------------------
create table if not exists public.content_posts (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('blog', 'doc')),
  slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  title text not null,
  excerpt text,
  body_markdown text not null default '',
  meta_title text,
  meta_description text,
  target_keyword text,
  category_id uuid references public.content_categories (id) on delete set null,
  author text,
  hero_image_url text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  is_seed boolean not null default false,
  unique (kind, slug)
);

create index if not exists content_posts_kind_status_published_idx
  on public.content_posts (kind, status, published_at desc);
create index if not exists content_posts_category_idx
  on public.content_posts (category_id);

-- Triggers -----------------------------------------------------------------
-- Keeps updated_at current, and stamps published_at the first time a post is
-- set to published without a date.
create or replace function public.content_posts_before_write()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at := now();
  if new.status = 'published' and new.published_at is null then
    new.published_at := now();
  end if;
  return new;
end;
$$;

drop trigger if exists content_posts_before_write on public.content_posts;
create trigger content_posts_before_write
  before insert or update on public.content_posts
  for each row execute function public.content_posts_before_write();

-- Row level security -------------------------------------------------------
alter table public.content_categories enable row level security;
alter table public.content_posts enable row level security;

-- Public read only. No insert, update or delete policy exists for anon or
-- authenticated users, so those writes are refused. The server (service role)
-- key and the Supabase table editor bypass RLS and can write.
drop policy if exists "Public can read categories" on public.content_categories;
create policy "Public can read categories"
  on public.content_categories
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Public can read published posts" on public.content_posts;
create policy "Public can read published posts"
  on public.content_posts
  for select
  to anon, authenticated
  using (status = 'published' and published_at is not null and published_at <= now());

-- Privileges: read only for the public roles.
revoke all on public.content_categories from anon, authenticated;
revoke all on public.content_posts from anon, authenticated;
grant select on public.content_categories to anon, authenticated;
grant select on public.content_posts to anon, authenticated;
