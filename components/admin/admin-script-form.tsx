"use client";

import { useMemo, useState } from "react";
import { ScriptThumbnail } from "@/components/ui/script-thumbnail";
import { buildThumbnailFallback, slugify } from "@/lib/utils";
import type { ScriptRow } from "@/types/script";

type AdminScriptFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  initialScript?: ScriptRow | null;
  mode?: "create" | "edit";
};

export function AdminScriptForm({
  action,
  initialScript,
  mode = "create",
}: AdminScriptFormProps) {
  const [title, setTitle] = useState(initialScript?.title ?? "");
  const [slugInput, setSlugInput] = useState(initialScript?.slug ?? "");
  const [game, setGame] = useState(initialScript?.game ?? "");
  const [thumbnailUrl, setThumbnailUrl] = useState(
    initialScript?.thumbnail_url ?? "",
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(initialScript?.slug));
  const initialStatus = initialScript?.status ?? "working";
  const slug = slugTouched ? slugInput : slugify(title);

  const previewTitle = title.trim() || "Script Preview";
  const previewGame = game.trim() || "game";
  const previewThumbnail = useMemo(() => {
    return thumbnailUrl.trim() || buildThumbnailFallback(previewTitle, previewGame);
  }, [previewGame, previewTitle, thumbnailUrl]);

  return (
    <form action={action} className="mt-6 grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
      {initialScript ? (
        <input name="scriptId" type="hidden" value={initialScript.id} />
      ) : null}
      <div className="grid gap-4 lg:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Title
          </span>
          <input
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            name="title"
            onChange={(event) => setTitle(event.target.value)}
            required
            type="text"
            value={title}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Slug
          </span>
          <input
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            name="slug"
            onChange={(event) => {
              setSlugTouched(true);
              setSlugInput(event.target.value);
            }}
            placeholder="optional-auto-generated"
            type="text"
            value={slug}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Game tag
          </span>
          <input
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            name="game"
            onChange={(event) => setGame(event.target.value)}
            placeholder="bloxfruit"
            required
            type="text"
            value={game}
          />
        </label>
        <label className="block space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Thumbnail URL
          </span>
          <input
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            name="thumbnailUrl"
            onChange={(event) => setThumbnailUrl(event.target.value)}
            placeholder="optional-image-url"
            type="url"
            value={thumbnailUrl}
          />
          <p className="text-xs text-foreground-muted">
            Leave empty to use the automatic fallback thumbnail.
          </p>
        </label>
        <label className="block space-y-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Status
          </span>
          <select
            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            defaultValue={initialStatus}
            name="status"
          >
            <option value="working">working</option>
            <option value="patched">patched</option>
            <option value="risk">risk</option>
          </select>
        </label>
        <label className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm">
          <input
            defaultChecked={initialScript ? Boolean(initialScript.published) : true}
            name="published"
            type="checkbox"
          />
          Publish immediately
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Description
          </span>
          <textarea
            className="min-h-28 w-full rounded-xl border border-border bg-background px-4 py-3 text-sm"
            defaultValue={initialScript?.description ?? ""}
            name="description"
            required
          />
        </label>
        <label className="block space-y-2 lg:col-span-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
            Script code
          </span>
          <textarea
            className="min-h-60 w-full rounded-xl border border-border bg-background px-4 py-3 font-mono text-sm"
            defaultValue={initialScript?.script ?? ""}
            name="script"
            required
          />
        </label>
        <div className="lg:col-span-2">
          <button
            className="rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white"
            type="submit"
          >
            {mode === "edit" ? "Save changes" : "Create script"}
          </button>
        </div>
      </div>

      <div className="surface-border h-fit rounded-[24px] bg-background p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Live preview
        </p>
        <ScriptThumbnail
          className="mt-4 aspect-video w-full"
          script={{
            game: previewGame,
            thumbnailUrl: previewThumbnail,
            title: previewTitle,
          }}
        />
        <div className="mt-4 space-y-2">
          <p className="line-clamp-2 text-base font-semibold">{previewTitle}</p>
          <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
            /scripts/{slug || "auto-generated-slug"}
          </p>
          <p className="text-xs uppercase tracking-[0.22em] text-foreground-muted">
            Game: {previewGame}
          </p>
        </div>
      </div>
    </form>
  );
}
