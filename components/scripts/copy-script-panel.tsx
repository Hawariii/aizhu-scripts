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
    <div className="rounded-[18px] bg-panel px-3.5 py-3 sm:rounded-[20px] sm:px-4 sm:py-4">
      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
        Copy script
      </p>
      <button
        className="mt-2.5 flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
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
      <p className="mt-2 text-xs leading-5 text-foreground-muted sm:text-sm sm:leading-6">
        Copy is ready, with a cooldown of{" "}
        {COOLDOWN_SECONDS} seconds after each click.
      </p>
    </div>
  );
}
