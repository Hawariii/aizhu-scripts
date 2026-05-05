"use client";

import { useEffect, useMemo, useRef } from "react";

type AdSlotProps = {
  placement: "top" | "in-content" | "bottom" | "sidebar";
};

const placementLabel: Record<AdSlotProps["placement"], string> = {
  top: "Top Banner Ad",
  "in-content": "In-Content Ad",
  bottom: "Bottom Banner Ad",
  sidebar: "Sidebar Ad",
};

const placementSlotMap: Record<AdSlotProps["placement"], string | undefined> = {
  top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP,
  "in-content": process.env.NEXT_PUBLIC_ADSENSE_SLOT_IN_CONTENT,
  bottom: process.env.NEXT_PUBLIC_ADSENSE_SLOT_BOTTOM,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdSlot({ placement }: AdSlotProps) {
  const initializedRef = useRef(false);
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slot = placementSlotMap[placement];
  const shouldRenderAds = Boolean(client && slot);
  const minHeightClass = useMemo(() => {
    if (placement === "in-content") {
      return "min-h-40";
    }

    if (placement === "sidebar") {
      return "min-h-64";
    }

    return "min-h-28";
  }, [placement]);

  useEffect(() => {
    if (!shouldRenderAds || initializedRef.current) {
      return;
    }

    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({});
      initializedRef.current = true;
    } catch {
      initializedRef.current = false;
    }
  }, [shouldRenderAds]);

  return (
    <aside
      aria-label={`${placementLabel[placement]} area`}
      className="surface-border fade-in-up rounded-[24px] bg-panel px-4 py-4 sm:px-5"
    >
      {shouldRenderAds ? (
        <ins
          className={`adsbygoogle block w-full overflow-hidden rounded-xl ${minHeightClass}`}
          data-ad-client={client}
          data-ad-format="auto"
          data-ad-slot={slot}
          data-full-width-responsive="true"
          style={{ display: "block" }}
        />
      ) : (
        <div
          className={`flex ${minHeightClass} flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background-muted text-center`}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground-muted">
            Google AdSense
          </p>
          <p className="mt-2 text-sm text-foreground-muted">
            {placementLabel[placement]}
          </p>
        </div>
      )}
    </aside>
  );
}
