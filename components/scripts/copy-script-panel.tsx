"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { addToast } from "@/lib/toast-store";

type CopyScriptPanelProps = {
  scriptId: string;
  scriptText: string;
};

const UNLOCK_DELAY_SECONDS = 7;
const COOLDOWN_SECONDS = 12;

export default function CopyScriptPanel({
  scriptId,
  scriptText,
}: CopyScriptPanelProps) {
  const [unlockCountdown, setUnlockCountdown] = useState(UNLOCK_DELAY_SECONDS);
  const [cooldown, setCooldown] = useState(0);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (unlockCountdown <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setUnlockCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [unlockCountdown]);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCooldown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [cooldown]);

  const isLocked = unlockCountdown > 0 || cooldown > 0 || isCopying;

  async function handleCopy() {
    if (isLocked) {
      return;
    }

    setIsCopying(true);

    try {
      await navigator.clipboard.writeText(scriptText);
      setCooldown(COOLDOWN_SECONDS);
      addToast({
        title: "Copied to clipboard!",
        description: "Your script is ready to paste.",
      });
      trackEvent("copy_script", {
        scriptId,
      });
    } catch {
      addToast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access. Try again.",
      });
    } finally {
      setIsCopying(false);
    }
  }

  return (
    <div className="glass-panel surface-border sticky bottom-3 rounded-[28px] p-4 sm:bottom-6">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground-muted">
        Guarded copy
      </p>
      <button
        className="mt-3 flex w-full items-center justify-center rounded-2xl bg-accent px-4 py-4 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:bg-white/12 disabled:text-foreground-muted"
        disabled={isLocked}
        onClick={handleCopy}
        type="button"
      >
        {unlockCountdown > 0
          ? `Unlock in ${unlockCountdown}s`
          : cooldown > 0
            ? `Cooldown ${cooldown}s`
            : isCopying
              ? "Copying..."
              : "Copy Script"}
      </button>
      <p className="mt-3 text-sm leading-6 text-foreground-muted">
        A short unlock timer helps reduce scraping, and the cooldown blocks spam
        clicks for {COOLDOWN_SECONDS} seconds after each copy.
      </p>
    </div>
  );
}
