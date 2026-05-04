"use client";

import { useEffect, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { addToast } from "@/lib/toast-store";

type CopyScriptPanelProps = {
  scriptId: string;
  scriptText: string;
};

const COOLDOWN_SECONDS = 12;

export function CopyScriptPanel({
  scriptId,
  scriptText,
}: CopyScriptPanelProps) {
  const [cooldown, setCooldown] = useState(0);
  const [isCopying, setIsCopying] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCooldown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [cooldown]);

  const isLocked = cooldown > 0 || isCopying;

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
    <div className="surface-border rounded-[20px] bg-panel p-4">
      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
        Copy script
      </p>
      <button
        className="mt-3 flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
        disabled={isLocked}
        onClick={handleCopy}
        type="button"
      >
        {cooldown > 0
          ? `Cooldown ${cooldown}s`
          : isCopying
            ? "Copying..."
            : "Copy Script"}
      </button>
      <p className="mt-3 text-sm leading-6 text-foreground-muted">
        The reveal gate is complete. Copy is now available, with a cooldown of{" "}
        {COOLDOWN_SECONDS} seconds after each click.
      </p>
    </div>
  );
}
