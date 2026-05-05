"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createScript } from "@/lib/admin-scripts";
import {
  clearAdminSession,
  createAdminSession,
  requireAdmin,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import type { ScriptStatus } from "@/types/script";

function getField(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

export async function loginAction(formData: FormData) {
  const username = getField(formData, "username");
  const password = getField(formData, "password");
  const adminUser = await verifyAdminCredentials(username, password);

  if (!adminUser) {
    redirect("/admin/login?error=invalid_credentials");
  }

  await createAdminSession(adminUser);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function createScriptAction(formData: FormData) {
  await requireAdmin();

  const title = getField(formData, "title");
  const slug = getField(formData, "slug");
  const game = getField(formData, "game");
  const description = getField(formData, "description");
  const verdict = getField(formData, "verdict");
  const script = getField(formData, "script");
  const status = getField(formData, "status") as ScriptStatus;
  const ratingRaw = Number(getField(formData, "rating"));
  const published = formData.get("published") === "on";

  if (
    !title ||
    !game ||
    !description ||
    !verdict ||
    !script ||
    !["working", "patched", "risk"].includes(status)
  ) {
    redirect("/admin?error=missing_fields");
  }

  await createScript({
    title,
    slug,
    game,
    description,
    verdict,
    script,
    status,
    rating: Number.isFinite(ratingRaw) ? ratingRaw : 0,
    published,
  });

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=script_created");
}
