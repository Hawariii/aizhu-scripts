"use client";

import { useEffect, useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { addToast } from "@/lib/toast-store";

type ScriptAccessPanelProps = {
  isRevealed: boolean;
  onReveal: () => void;
  scriptId: string;
};

function getGateDuration() {
  return Math.floor(Math.random() * 16) + 15;
}

export function ScriptAccessPanel({
  isRevealed,
  onReveal,
  scriptId,
}: ScriptAccessPanelProps) {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const canReveal = countdown === 0;
  const sponsorLabel = useMemo(
    () => (isRevealed ? "Script unlocked" : "Sponsor preview"),
    [isRevealed],
  );

  useEffect(() => {
    if (!isGateOpen || countdown <= 0) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setCountdown((current) => current - 1);
    }, 1000);

    return () => window.clearTimeout(timeoutId);
  }, [countdown, isGateOpen]);

  function handleShowScript() {
    if (isRevealed) {
      return;
    }

    setCountdown(getGateDuration());
    setIsGateOpen(true);
    trackEvent("show_script_gate_open", {
      scriptId,
    });
  }

  function handleReveal() {
    setIsGateOpen(false);
    onReveal();
    addToast({
      title: "Berhasil unlock",
      description: "Script sekarang sudah terbuka dan siap dicopy.",
    });
    trackEvent("show_script_gate_complete", {
      scriptId,
    });
  }

  return (
    <>
      <div className="surface-border rounded-[20px] bg-panel p-4 sm:p-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
          Script access
        </p>
        <button
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
          onClick={handleShowScript}
          type="button"
        >
          {isRevealed ? "Script Unlocked" : "Show Script"}
        </button>
        <p className="mt-3 text-sm leading-7 text-foreground-muted">
          The script stays hidden by default. Open the sponsor gate first, then
          the code and copy action become available.
        </p>
      </div>

      {isGateOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className="surface-border w-full max-w-lg rounded-[24px] bg-panel p-5 shadow-xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
              {sponsorLabel}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">Please wait a moment</h2>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">
              This is a safe internal gate for sponsor space, house ads, or
              notices. Once the timer finishes, you can reveal the script.
            </p>
            <div className="mt-5 rounded-[20px] border border-dashed border-border bg-background-muted p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
                Sponsor Placeholder
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground-muted">
                Replace this block with your own promo, affiliate banner, or site
                notice. Avoid forcing Google AdSense into this gate flow.
              </p>
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground-muted">
                {canReveal ? "You can reveal the script now." : `Unlocking in ${countdown}s`}
              </p>
              <button
                className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
                disabled={!canReveal}
                onClick={handleReveal}
                type="button"
              >
                Reveal Script
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
