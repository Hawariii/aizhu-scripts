# Aizhu Scripts

A fast, mobile-first script directory built with Next.js App Router, Tailwind CSS, and Supabase.  
The public site is read-only, while the admin panel lets you create, edit, publish, and delete scripts.

## Stack

- Next.js 16 App Router
- Tailwind CSS 4
- Supabase PostgreSQL
- Vercel-ready deployment

## Features

- Public homepage with search, status filter, and game filter
- Script detail pages using slug routes: `/scripts/[slug]`
- Hidden script reveal flow with support actions before unlock
- Copy button with cooldown
- SEO-ready metadata, `sitemap.xml`, `robots.txt`, and structured data
- Admin login with secure cookie session
- Admin dashboard with upload form, live thumbnail preview, edit/delete flow, and lightweight charts

## Environment Variables

Copy `.env.example` to `.env.local` and fill the required values:

```env
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=
ADMIN_SESSION_SECRET=
NEXT_PUBLIC_ADSENSE_CLIENT=
```

Notes:

- Use either `NEXT_PUBLIC_SUPABASE_ANON_KEY` or `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- Never expose `SUPABASE_SERVICE_ROLE_KEY` to the client
- `ADMIN_SESSION_SECRET` is required for admin login cookies

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

Admin panel:

- `http://localhost:3000/admin/login`

## Database

Main schema:

- `supabase/schema.sql`

Migrations:

- `supabase/migrations/20260505090000_scripts_and_admin_roles.sql`
- `supabase/migrations/20260506110000_add_script_thumbnail.sql`

You can apply them either from the Supabase SQL Editor or with the Supabase CLI.

## SEO

The project now includes:

- `app/sitemap.ts`
- `app/robots.ts`
- canonical URLs
- Open Graph and Twitter metadata
- JSON-LD structured data for the homepage and script detail pages

Submit this in Google Search Console:

- `/sitemap.xml`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
