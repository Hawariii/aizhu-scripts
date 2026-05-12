import type { Metadata } from "next";
import {
  createScriptAction,
  deleteScriptAction,
  logoutAction,
  updateScriptAction,
} from "@/app/admin/actions";
import { AdminOverview } from "@/components/admin/admin-overview";
import { AdminScriptForm } from "@/components/admin/admin-script-form";
import { PageContainer } from "@/components/layout/page-container";
import { ScriptThumbnail } from "@/components/ui/script-thumbnail";
import { requireAdmin } from "@/lib/admin-auth";
import {
  getAdminDashboardStats,
  getAdminScriptById,
  getAdminScripts,
} from "@/lib/admin-scripts";
import { getScriptPath } from "@/lib/scripts";
import { hasSupabaseAdminEnv } from "@/lib/supabase";
import { buildThumbnailFallback } from "@/lib/utils";

type AdminPageProps = {
  searchParams: Promise<{ edit?: string; error?: string; success?: string }>;
};

export const metadata: Metadata = {
  title: "Admin",
  description: "Internal panel for uploading and publishing scripts.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  await requireAdmin();

  const [{ edit, error, success }, recentScripts, stats] = await Promise.all([
    searchParams,
    getAdminScripts(),
    getAdminDashboardStats(),
  ]);
  const editingScript = edit ? await getAdminScriptById(edit) : null;

  return (
    <PageContainer className="gap-6 pb-16 pt-6 sm:pt-8">
      <AdminOverview stats={stats} />

      <section className="surface-border rounded-[24px] bg-panel p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Admin Dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight">
              {editingScript ? "Edit script" : "Upload and publish scripts"}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground-muted">
              {editingScript
                ? "Update title, thumbnail, code, status, and publish state, then save the changes."
                : "Create new script entries with title, thumbnail, code, status, and publish control. Inserts run on the server using the service role key only."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {editingScript ? (
              <a
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold"
                href="/admin"
              >
                Cancel edit
              </a>
            ) : null}
            <form action={logoutAction}>
              <button
                className="rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold"
                type="submit"
              >
                Logout
              </button>
            </form>
          </div>
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
        {success === "script_updated" ? (
          <div className="mt-6 rounded-[16px] border border-success/30 bg-success/10 p-4 text-sm text-foreground">
            Script updated successfully.
          </div>
        ) : null}
        {success === "script_deleted" ? (
          <div className="mt-6 rounded-[16px] border border-success/30 bg-success/10 p-4 text-sm text-foreground">
            Script deleted successfully.
          </div>
        ) : null}

        <AdminScriptForm
          action={editingScript ? updateScriptAction : createScriptAction}
          initialScript={editingScript}
          mode={editingScript ? "edit" : "create"}
        />
      </section>

      <section className="surface-border rounded-[24px] bg-panel p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
              Recent scripts
            </p>
            <p className="mt-2 text-sm text-foreground-muted">
              Latest {recentScripts.length} entries from the database.
            </p>
          </div>
        </div>
        {recentScripts.length === 0 ? (
          <p className="mt-4 text-sm text-foreground-muted">
            No scripts found yet, or admin database env is not configured.
          </p>
        ) : (
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {recentScripts.map((script) => {
              const thumbnailUrl =
                script.thumbnail_url?.trim() ||
                buildThumbnailFallback(script.title, script.game);

              return (
                <article
                  className="overflow-hidden rounded-[22px] border border-border bg-background"
                  key={script.id}
                >
                  <ScriptThumbnail
                    className="aspect-video w-full rounded-none border-0"
                    script={{
                      game: script.game,
                      thumbnailUrl,
                      title: script.title,
                    }}
                  />
                  <div className="space-y-3 p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="line-clamp-2 font-semibold">{script.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.22em] text-foreground-muted">
                          {script.game}
                        </p>
                      </div>
                      <span className="rounded-full border border-border px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-foreground-muted">
                        {script.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3 text-xs text-foreground-muted">
                      <span>{script.published ? "Published" : "Draft"}</span>
                      <div className="flex items-center gap-3">
                        <a
                          className="font-medium text-accent"
                          href={getScriptPath({
                            slug: script.slug || script.id,
                          })}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Open page
                        </a>
                        <a className="font-medium text-accent" href={`/admin?edit=${script.id}`}>
                          Edit
                        </a>
                        <form action={deleteScriptAction}>
                          <input name="scriptId" type="hidden" value={script.id} />
                          <button className="font-medium text-danger" type="submit">
                            Delete
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
