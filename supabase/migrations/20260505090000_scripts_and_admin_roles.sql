create extension if not exists "pgcrypto";

create table if not exists public.scripts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique,
  game text not null,
  description text not null,
  verdict text not null default '',
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

create table if not exists public.admin_users (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_admin(check_user_id uuid default auth.uid())
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where id = check_user_id
      and role = 'admin'
  );
$$;

alter table public.scripts enable row level security;
alter table public.admin_users enable row level security;

drop policy if exists "Public read access for scripts" on public.scripts;
drop policy if exists "Public read access for published scripts" on public.scripts;
drop policy if exists "Admins can manage scripts" on public.scripts;
drop policy if exists "Authenticated users can read own admin role" on public.admin_users;
drop policy if exists "Admins can read admin users" on public.admin_users;

create policy "Public read access for published scripts"
on public.scripts
for select
to anon
using (published = true);

create policy "Admins can manage scripts"
on public.scripts
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "Authenticated users can read own admin role"
on public.admin_users
for select
to authenticated
using (auth.uid() = id);

create policy "Admins can read admin users"
on public.admin_users
for select
to authenticated
using (public.is_admin());

comment on table public.admin_users is
'Maps Supabase Auth users to internal admin/editor roles for the admin panel.';

comment on function public.is_admin(uuid) is
'Returns true when the supplied auth.users id belongs to a user with role=admin.';

-- Example: promote an existing Supabase Auth user to admin
-- insert into public.admin_users (id, username, role)
-- values ('YOUR_AUTH_USER_UUID', 'your-admin-name', 'admin')
-- on conflict (id) do update
-- set username = excluded.username,
--     role = excluded.role;
