import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAction } from "@/app/admin/actions";
import { hasAdminSessionEnv, isAdminAuthenticated } from "@/lib/admin-auth";
import { hasSupabaseAdminEnv } from "@/lib/supabase";
import { PageContainer } from "@/components/layout/page-container";

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Sign in to the Aizhu Scripts admin panel.",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const { error } = await searchParams;

  return (
    <PageContainer className="items-center justify-center py-12">
      <section className="surface-border w-full max-w-md rounded-[24px] bg-panel p-6 sm:p-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
          Admin Access
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">
          Sign in to manage scripts
        </h1>
        <p className="mt-3 text-sm leading-6 text-foreground-muted">
          Use your private admin credentials to open the internal upload panel.
        </p>
        {!hasAdminSessionEnv() || !hasSupabaseAdminEnv() ? (
          <div className="mt-5 rounded-[16px] border border-warning/30 bg-warning/10 p-4 text-sm leading-6 text-foreground">
            Fill `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_SUPABASE_URL`, and
            `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`, then run the admin
            migration so login can verify credentials from the database.
          </div>
        ) : null}
        {error === "invalid_credentials" ? (
          <div className="mt-5 rounded-[16px] border border-danger/30 bg-danger/10 p-4 text-sm text-foreground">
            Username or password is invalid.
          </div>
        ) : null}
        {error === "too_many_attempts" ? (
          <div className="mt-5 rounded-[16px] border border-warning/30 bg-warning/10 p-4 text-sm text-foreground">
            Too many login attempts. Please wait a while before trying again.
          </div>
        ) : null}
        <form action={loginAction} className="mt-6 space-y-4">
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Username
            </span>
            <input
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              name="username"
              required
              type="text"
            />
          </label>
          <label className="block space-y-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
              Password
            </span>
            <input
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
              name="password"
              required
              type="password"
            />
          </label>
          <button
            className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white"
            type="submit"
          >
            Sign in
          </button>
        </form>
      </section>
    </PageContainer>
  );
}
