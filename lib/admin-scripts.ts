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

type UpdateScriptInput = CreateScriptInput & {
  id: string;
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
  const insertPayload: Record<string, string | boolean | null> = {
    title: input.title.trim(),
    slug: normalizeSlug(input.title, input.slug),
    game: input.game.trim(),
    description: input.description.trim(),
    script: input.script.trim(),
    status: input.status,
    published: input.published,
  };

  if (input.thumbnailUrl?.trim()) {
    insertPayload.thumbnail_url = input.thumbnailUrl.trim();
  }

  const { data, error } = await supabase
    .from("scripts")
    .insert(insertPayload)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ScriptRow;
}

export async function updateScript(input: UpdateScriptInput) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const supabase = createSupabaseAdminClient();
  const updatePayload: Record<string, string | boolean | null> = {
    title: input.title.trim(),
    slug: normalizeSlug(input.title, input.slug),
    game: input.game.trim(),
    description: input.description.trim(),
    script: input.script.trim(),
    status: input.status,
    published: input.published,
    thumbnail_url: input.thumbnailUrl?.trim() || null,
  };

  const { data, error } = await supabase
    .from("scripts")
    .update(updatePayload)
    .eq("id", input.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as ScriptRow;
}

export async function deleteScript(id: string) {
  if (!hasSupabaseAdminEnv()) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.",
    );
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("scripts").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
}

export async function getAdminScripts() {
  if (!hasSupabaseAdminEnv()) {
    return [];
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(20);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as ScriptRow[];
}

export async function getAdminScriptById(id: string) {
  if (!hasSupabaseAdminEnv()) {
    return null;
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return (data as ScriptRow | null) ?? null;
}

export async function getAdminDashboardStats() {
  if (!hasSupabaseAdminEnv()) {
    return {
      draftCount: 0,
      publishedCount: 0,
      statusCounts: {
        patched: 0,
        risk: 0,
        working: 0,
      },
      totalScripts: 0,
      uploadsByDay: [] as Array<{ count: number; label: string }>,
    };
  }

  const supabase = createSupabaseAdminClient();
  const { data, error } = await supabase
    .from("scripts")
    .select("status,published,created_at");

  if (error) {
    throw new Error(error.message);
  }

  const rows = (data ?? []) as Array<{
    created_at: string;
    published?: boolean;
    status: string;
  }>;

  const statusCounts = {
    patched: 0,
    risk: 0,
    working: 0,
  };

  let publishedCount = 0;
  let draftCount = 0;

  for (const row of rows) {
    if (row.status === "working" || row.status === "patched" || row.status === "risk") {
      statusCounts[row.status] += 1;
    }

    if (row.published) {
      publishedCount += 1;
    } else {
      draftCount += 1;
    }
  }

  const uploadsByDay = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - index));
    const key = date.toISOString().slice(0, 10);
    const label = date.toLocaleDateString("en-US", { weekday: "short" });
    const count = rows.filter((row) => row.created_at.slice(0, 10) === key).length;

    return { label, count };
  });

  return {
    draftCount,
    publishedCount,
    statusCounts,
    totalScripts: rows.length,
    uploadsByDay,
  };
}
