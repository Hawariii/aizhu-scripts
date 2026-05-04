create extension if not exists "pgcrypto";

create table if not exists public.scripts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  game text not null,
  description text not null,
  script text not null,
  status text not null check (status in ('working', 'patched', 'risk')),
  rating double precision not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.scripts enable row level security;

create policy "Public read access for scripts"
on public.scripts
for select
to anon
using (true);
