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

const supportLinks = [
  {
    href: "https://youtube.com/@siaizhu?si=7ZK6-L4scDzCrrYS",
    label: "Subscribe YouTube",
  },
  {
    href: "https://www.tiktok.com/@siiaizhu?_r=1&_t=ZS-968MPc9uAq0",
    label: "Follow TikTok",
  },
  {
    href: "https://www.instagram.com/hawarii_bohay?igsh=MWp6bDA5YXU3YTJxag==",
    label: "Follow Instagram",
  },
];

export function ScriptAccessPanel({
  isRevealed,
  onReveal,
  scriptId,
}: ScriptAccessPanelProps) {
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const canReveal = countdown === 0;
  const sponsorLabel = useMemo(
    () => (isRevealed ? "Script unlocked" : "Support Aizhu"),
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
          Open the support panel first, then the script code and copy action
          will unlock here.
        </p>
      </div>

      {isGateOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 py-6">
          <div className="surface-border w-full max-w-lg rounded-[24px] bg-panel p-5 shadow-xl sm:p-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground-muted">
              {sponsorLabel}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              Support before reveal
            </h2>
            <p className="mt-3 text-sm leading-6 text-foreground-muted">
              Before opening the script, support the channel on YouTube, TikTok,
              or Instagram. After the timer finishes, you can reveal the code.
            </p>
            <div className="mt-5 grid gap-3 rounded-[20px] border border-border bg-background-muted p-4">
              {supportLinks.map((link) => (
                <a
                  className="flex items-center justify-between rounded-2xl border border-border bg-panel px-4 py-3 text-sm font-medium hover:border-accent/60"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>{link.label}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                    Open
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground-muted">
                {canReveal
                  ? "Support step finished. You can reveal the script now."
                  : `Unlocking in ${countdown}s`}
              </p>
              <button
                className="rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
                disabled={!canReveal}
                onClick={handleReveal}
                type="button"
              >
                Unlock Script
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
