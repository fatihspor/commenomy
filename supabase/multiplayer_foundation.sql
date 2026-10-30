-- Commenomy multiplayer foundation. Apply to the dedicated Commenomy Supabase project.
create table if not exists public.players (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null check (char_length(display_name) between 3 and 32),
  created_at timestamptz not null default now()
);
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.players(id),
  name text not null check (char_length(name) between 2 and 80),
  balance numeric(18,2) not null default 0 check (balance >= 0),
  created_at timestamptz not null default now()
);
create table if not exists public.production_sites (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id),
  product text not null,
  units_per_hour numeric(18,3) not null default 0 check (units_per_hour >= 0),
  last_processed_at timestamptz not null default now()
);
alter table public.players enable row level security;
alter table public.companies enable row level security;
alter table public.production_sites enable row level security;
create policy "players read" on public.players for select to authenticated using (true);
create policy "players own insert" on public.players for insert to authenticated with check ((select auth.uid()) = id);
create policy "players own update" on public.players for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);
create policy "companies read" on public.companies for select to authenticated using (true);
create policy "companies own insert" on public.companies for insert to authenticated with check ((select auth.uid()) = owner_id);
create policy "sites read" on public.production_sites for select to authenticated using (true);
-- Balances, inventory and production must be mutated only by authenticated server-side transactions.
