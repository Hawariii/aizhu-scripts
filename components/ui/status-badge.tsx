import type { ScriptStatus } from "@/types/script";
import { cn } from "@/lib/utils";

type StatusBadgeProps = {
  status: ScriptStatus;
};

const STATUS_STYLES: Record<ScriptStatus, string> = {
  working: "border-success/30 bg-success/12 text-success",
  patched: "border-danger/30 bg-danger/12 text-danger",
  risk: "border-warning/30 bg-warning/12 text-warning",
};

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
        STATUS_STYLES[status],
      )}
    >
      {status}
    </span>
  );
}
