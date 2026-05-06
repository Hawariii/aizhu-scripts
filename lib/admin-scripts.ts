import { createSupabaseAdminClient, hasSupabaseAdminEnv } from "@/lib/supabase";
import { slugify } from "@/lib/utils";
import type { ScriptRow, ScriptStatus } from "@/types/script";

type CreateScriptInput = {
  description: string;
  game: string;
  published: boolean;
  script: string;
  slug?: string;
  status: ScriptStatus;
  thumbnailUrl?: string;
  title: string;
};

function normalizeSlug(title: string, slug?: string) {
  return slugify(slug?.trim() || title) || `script-${Date.now()}`;
}

export async function createScript(input: CreateScriptInput) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("scripts")
    .insert({
      title: input.title.trim(),
      slug: normalizeSlug(input.title, input.slug),
      game: input.game.trim(),
      description: input.description.trim(),
      script: input.script.trim(),
      status: input.status,
      thumbnail_url: input.thumbnailUrl?.trim() || null,
      published: input.published,
    })
    .select(
      "id,title,slug,game,description,script,status,thumbnail_url,published,created_at,updated_at",
    )
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ScriptRow;
}

export async function getAdminScripts() {
  if (!hasSupabaseAdminEnv()) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("scripts")
    .select(
      "id,title,slug,game,description,script,status,thumbnail_url,published,created_at,updated_at",
    )
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ScriptRow[];
}
