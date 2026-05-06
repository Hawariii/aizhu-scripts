create extension if not exists "pgcrypto";

create table if not exists public.scripts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  game text not null,
  description text not null,
  verdict text not null default '',
  thumbnail_url text,
  script text not null,
  status text not null check (status in ('working', 'patched', 'risk')),
  rating double precision not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.scripts
  add column if not exists slug text,
  add column if not exists verdict text not null default '',
  add column if not exists thumbnail_url text,
  add column if not exists published boolean not null default true;

update public.scripts
set slug = regexp_replace(lower(title), '[^a-z0-9]+', '-', 'g')
where slug is null or slug = '';

create unique index if not exists scripts_slug_key on public.scripts (slug);
create index if not exists scripts_published_updated_idx
  on public.scripts (published, updated_at desc);
create index if not exists scripts_game_idx on public.scripts (game);
create index if not exists scripts_status_idx on public.scripts (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists scripts_set_updated_at on public.scripts;

create trigger scripts_set_updated_at
before update on public.scripts
for each row
execute function public.set_updated_at();

drop table if exists public.admin_users cascade;

create table public.admin_users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique,
  password_hash text not null,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin(check_username text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where username = check_username
      and role = 'admin'
  );
$$;

alter table public.scripts enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public read access for scripts" on public.scripts;
drop policy if exists "Admins can manage scripts" on public.scripts;
drop policy if exists "No direct public access to admin users" on public.admin_users;

create policy "Public read access for published scripts"
on public.scripts
for select
to anon
using (published = true);

create policy "No direct public access to admin users"
on public.admin_users
for all
to public
using (false)
with check (false);

insert into public.admin_users (username, password_hash, role)
values (
  'rani1325',
  'scrypt:dbb0d69ae4adc19125c208c9fb23bafd:66fd31d606c55750f35813512c3a2450ac0ef5eaca4c90088310f57a9262259bf666f74feb10b2e6d487f08fc65e4d558f82010765c56f6916cc1c4491717928',
  'admin'
)
on conflict (username) do update
set password_hash = excluded.password_hash,
    role = excluded.role;
