import { unstable_cache } from "next/cache";
import { createSupabaseServerClient, hasSupabaseEnv } from "@/lib/supabase";
import { SUPABASE_CACHE_SECONDS } from "@/lib/constants";
import type { ScriptListItem, ScriptRecord, ScriptRow, ScriptStatus } from "@/types/script";
import { slugify } from "@/lib/utils";

const VALID_STATUSES: ScriptStatus[] = ["working", "patched", "risk"];

const sampleScripts: ScriptRow[] = [
  {
    id: "00000000-0000-0000-0000-000000000001",
    title: "BloxFruit Auto Farm",
    game: "bloxfruit",
    description: "A fast farming helper with boss routing and sea event support.",
    script: "loadstring(game:HttpGet('https://example.com/bloxfruit.lua'))()",
    slug: "bloxfruit-auto-farm",
    status: "working",
    verdict:
      "Working well right now. It looks dependable if you still verify it in-game before repeated use.",
    published: true,
    created_at: "2026-04-18T10:00:00.000Z",
    updated_at: "2026-05-02T08:00:00.000Z",
  },
  {
    id: "00000000-0000-0000-0000-000000000002",
    title: "Fisch Catch Assist",
    game: "fisch",
    description: "Helps with repetitive fishing loops and inventory quality checks.",
    script: "loadstring(game:HttpGet('https://example.com/fisch.lua'))()",
    slug: "fisch-catch-assist",
    status: "risk",
    verdict:
      "Marked as risk because reliability is mixed. Test on a throwaway flow first and avoid assuming long sessions will remain stable without manual checks.",
    published: true,
    created_at: "2026-04-26T10:00:00.000Z",
    updated_at: "2026-05-03T15:45:00.000Z",
  },
  {
    id: "00000000-0000-0000-0000-000000000003",
    title: "TheForge Crafter",
    game: "theforge",
    description: "Craft queue utility with path helpers and compact overlay output.",
    script: "loadstring(game:HttpGet('https://example.com/theforge.lua'))()",
    slug: "theforge-crafter",
    status: "patched",
    verdict:
      "Patched status means this one is likely outdated. Keep it listed for reference, but expect breakage until it is refreshed against the latest theforge changes.",
    published: true,
    created_at: "2026-03-30T10:00:00.000Z",
    updated_at: "2026-04-29T12:30:00.000Z",
  },
];

const getCachedScriptRows = unstable_cache(
  async () => {
    if (!hasSupabaseEnv()) {
      if (process.env.NODE_ENV !== "production") {
        return sampleScripts;
      }

      return [];
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("scripts")
      .select(
        "id,title,slug,game,description,verdict,script,status,published,created_at,updated_at",
      )
      .eq("published", true)
      .order("updated_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return (data ?? []) as ScriptRow[];
  },
  ["scripts-all"],
  {
    revalidate: SUPABASE_CACHE_SECONDS,
    tags: ["scripts"],
  },
);

function normalizeStatus(status: string): ScriptStatus {
  return VALID_STATUSES.includes(status as ScriptStatus)
    ? (status as ScriptStatus)
    : "risk";
}

function buildVerdict(script: ScriptRow) {
  const status = normalizeStatus(script.status);

  if (status === "working") {
    return `Working well right now. ${script.title} looks dependable if you still verify it in-game before repeated use.`;
  }

  if (status === "patched") {
    return `Patched status means this one is likely outdated. Keep it listed for reference, but expect breakage until it is refreshed against the latest ${script.game} changes.`;
  }

  return `Marked as risk because reliability is mixed. Test on a throwaway flow first and avoid assuming long sessions will remain stable without manual checks.`;
}

function formatDateLabel(dateString: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
  }).format(new Date(dateString));
}

function mapRowToRecord(script: ScriptRow): ScriptRecord {
  return {
    id: script.id,
    title: script.title,
    slug: script.slug?.trim() || slugify(script.title) || script.id,
    game: script.game,
    description: script.description,
    script: script.script,
    status: normalizeStatus(script.status),
    published: script.published ?? true,
    createdAt: script.created_at,
    updatedAt: script.updated_at,
    createdLabel: formatDateLabel(script.created_at),
    updatedLabel: formatDateLabel(script.updated_at),
    verdict: script.verdict?.trim() || buildVerdict(script),
  };
}

function mapRecordToListItem(script: ScriptRecord): ScriptListItem {
  return {
    id: script.id,
    title: script.title,
    game: script.game,
    description: script.description,
    slug: script.slug,
    status: script.status,
    updatedAt: script.updatedAt,
    updatedLabel: script.updatedLabel,
  };
}

export async function getScriptsPageData(): Promise<{
  errorMessage?: string;
  games: string[];
  scripts: ScriptListItem[];
}> {
  try {
    const rows = await getCachedScriptRows();
    const scripts = rows.map(mapRowToRecord).map(mapRecordToListItem);
    const games = [...new Set(scripts.map((script) => script.game))].sort();

    return {
      scripts,
      games,
    };
  } catch {
    return {
      scripts: [],
      games: [],
      errorMessage:
        "The Supabase read request failed. Check your public URL, anon key, and RLS policy for read access on the scripts table.",
    };
  }
}

export async function getScriptById(id: string): Promise<ScriptRecord | null> {
  try {
    const rows = await getCachedScriptRows();
    const script = rows.find((entry) => entry.id === id);

    return script ? mapRowToRecord(script) : null;
  } catch {
    return null;
  }
}
