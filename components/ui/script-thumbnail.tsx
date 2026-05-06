import type { ScriptRecord } from "@/types/script";

type ScriptThumbnailProps = {
  className?: string;
  priority?: boolean;
  script: Pick<ScriptRecord, "game" | "thumbnailUrl" | "title">;
};

export function ScriptThumbnail({
  className,
  priority,
  script,
}: ScriptThumbnailProps) {
  return (
    <div
      className={`overflow-hidden rounded-[22px] border border-border bg-background-muted ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        alt={script.title}
        className="h-full w-full object-cover"
        loading={priority ? "eager" : "lazy"}
        src={script.thumbnailUrl}
      />
    </div>
  );
}
