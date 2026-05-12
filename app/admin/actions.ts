"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { createScript, deleteScript, updateScript } from "@/lib/admin-scripts";
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
  const thumbnailUrl = getField(formData, "thumbnailUrl");
  const description = getField(formData, "description");
  const script = getField(formData, "script");
  const status = getField(formData, "status") as ScriptStatus;
  const published = formData.get("published") === "on";

  if (
    !title ||
    !game ||
    !description ||
    !script ||
    !["working", "patched", "risk"].includes(status)
  ) {
    redirect("/admin?error=missing_fields");
  }

  await createScript({
    title,
    slug,
    game,
    thumbnailUrl,
    description,
    script,
    status,
    published,
  });

  revalidateTag("scripts", "max");
  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin?success=script_created");
}

export async function updateScriptAction(formData: FormData) {
  await requireAdmin();

  const scriptId = getField(formData, "scriptId");
  const title = getField(formData, "title");
  const slug = getField(formData, "slug");
  const game = getField(formData, "game");
  const thumbnailUrl = getField(formData, "thumbnailUrl");
  const description = getField(formData, "description");
  const script = getField(formData, "script");
  const status = getField(formData, "status") as ScriptStatus;
  const published = formData.get("published") === "on";

  if (
    !scriptId ||
    !title ||
    !game ||
    !description ||
    !script ||
    !["working", "patched", "risk"].includes(status)
  ) {
    redirect(`/admin?edit=${scriptId}&error=missing_fields`);
  }

  await updateScript({
    id: scriptId,
    title,
    slug,
    game,
    thumbnailUrl,
    description,
    script,
    status,
    published,
  });

  revalidateTag("scripts", "max");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/scripts/${scriptId}`);
  redirect("/admin?success=script_updated");
}

export async function deleteScriptAction(formData: FormData) {
  await requireAdmin();

  const scriptId = getField(formData, "scriptId");

  if (!scriptId) {
    redirect("/admin?error=missing_fields");
  }

  await deleteScript(scriptId);

  revalidateTag("scripts", "max");
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/scripts/${scriptId}`);
  redirect("/admin?success=script_deleted");
}
