type AdSlotProps = {
  placement: "top" | "in-content" | "bottom";
};

const placementLabel: Record<AdSlotProps["placement"], string> = {
  top: "Top Banner Ad",
  "in-content": "In-Content Ad",
  bottom: "Bottom Banner Ad",
};

export default function AdSlot({ placement }: AdSlotProps) {
  return (
    <aside
      aria-label={`${placementLabel[placement]} placeholder`}
      className="glass-panel surface-border fade-in-up rounded-[26px] px-4 py-5"
    >
      <div className="flex min-h-24 flex-col items-center justify-center rounded-[22px] border border-dashed border-border bg-white/[0.03] text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          AdSense Placeholder
        </p>
        <p className="mt-2 text-sm text-foreground-muted">
          {placementLabel[placement]}
        </p>
      </div>
    </aside>
  );
}
