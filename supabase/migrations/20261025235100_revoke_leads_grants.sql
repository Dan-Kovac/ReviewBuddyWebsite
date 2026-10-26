-- public.leads is written only by the site server, with the service role key.
-- Anon and authenticated get no grants, so they cannot read or write the table
-- even if row level security is later turned off or a policy is added.
-- Apply this in the Supabase project. This file is not run from the site build.

revoke all on table public.leads from public;
revoke all on table public.leads from anon, authenticated;
grant all on table public.leads to service_role;
