import type { Metadata } from "next";
import { createScriptAction, logoutAction } from "@/app/admin/actions";
import { PageContainer } from "@/components/layout/page-container";
import { requireAdmin } from "@/lib/admin-auth";
import { getAdminScripts } from "@/lib/admin-scripts";
import { hasSupabaseAdminEnv } from "@/lib/supabase";

type AdminPageProps = {
  searchParams: Promise<{ error?: string; success?: string }>;
};

export const metadata: Metadata = {
  title: "Admin",
  description: "Internal panel for uploading and publishing scripts.",
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  const [{ error, success }, recentScripts] = await Promise.all([
    searchParams,
    getAdminScripts(),
  ]);

  return (
    <PageContainer className="gap-6 pb-16 pt-6 sm:pt-8">
      <section className="surface-border rounded-[24px] bg-panel p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              Upload and publish scripts
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-muted">
              Create new script entries with title, verdict, code, status, and
              publish control. Inserts run on the server using the service role
              key only.
            </p>
          </div>
          <form action={logoutAction}>
            <button
              className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold"
              type="submit"
            >
              Logout
            </button>
          </form>
        </div>

        {!hasSupabaseAdminEnv() ? (
          <div className="mt-6 rounded-[16px] border border-warning/30 bg-warning/10 p-4 text-sm leading-6 text-foreground">
            Fill `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in
            `.env.local` before using the admin panel.
          </div>
        ) : null}
        {error === "missing_fields" ? (
          <div className="mt-6 rounded-[16px] border border-danger/30 bg-danger/10 p-4 text-sm text-foreground">
            Please fill all required fields before submitting.
          </div>
        ) : null}
        {success === "script_created" ? (
          <div className="mt-6 rounded-[16px] border border-success/30 bg-success/10 p-4 text-sm text-foreground">
            Script created successfully.
          </div>
        ) : null}

        <form action={createScriptAction} className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Title
            </span>
            <input className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" name="title" required type="text" />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Slug
            </span>
            <input className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" name="slug" placeholder="optional-auto-generated" type="text" />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Game tag
            </span>
            <input className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" name="game" placeholder="bloxfruit" required type="text" />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Rating
            </span>
            <input className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" defaultValue="0" max="5" min="0" name="rating" step="0.1" type="number" />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Status
            </span>
            <select className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" defaultValue="working" name="status">
              <option value="working">working</option>
              <option value="patched">patched</option>
              <option value="risk">risk</option>
            </select>
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm">
            <input defaultChecked name="published" type="checkbox" />
            Publish immediately
          </label>
          <label className="block space-y-2 lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Description
            </span>
            <textarea className="min-h-28 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" name="description" required />
          </label>
          <label className="block space-y-2 lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Aizhu verdict
            </span>
            <textarea className="min-h-28 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" name="verdict" required />
          </label>
          <label className="block space-y-2 lg:col-span-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Script code
            </span>
            <textarea className="min-h-60 w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm" name="script" required />
          </label>
          <div className="lg:col-span-2">
            <button className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white" type="submit">
              Create script
            </button>
          </div>
        </form>
      </section>

      <section className="surface-border rounded-[24px] bg-panel p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Recent scripts
        </p>
        {recentScripts.length === 0 ? (
          <p className="mt-4 text-sm text-foreground-muted">
            No scripts found yet, or admin database env is not configured.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
                <tr>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Game</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Published</th>
                </tr>
              </thead>
              <tbody>
                {recentScripts.map((script) => (
                  <tr className="border-t border-border" key={script.id}>
                    <td className="px-3 py-3">{script.title}</td>
                    <td className="px-3 py-3 capitalize">{script.game}</td>
                    <td className="px-3 py-3">{script.status}</td>
                    <td className="px-3 py-3">{script.published ? "yes" : "no"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </PageContainer>
  );
}
