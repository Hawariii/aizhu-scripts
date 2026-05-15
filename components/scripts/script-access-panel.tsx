"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "@/lib/analytics";
import { addToast } from "@/lib/toast-store";

type ScriptAccessPanelProps = {
  isRevealed: boolean;
  onReveal: () => void;
  scriptId: string;
};

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
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const canReveal = completedActions.length === supportLinks.length;
  const progressPercent = (completedActions.length / supportLinks.length) * 100;
  const sponsorLabel = useMemo(
    () => (isRevealed ? "Script unlocked" : "Support Aizhu"),
    [isRevealed],
  );

  function handleShowScript() {
    if (isRevealed) {
      return;
    }

    setCompletedActions([]);
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

  function handleSupportAction(href: string) {
    window.open(href, "_blank", "noopener,noreferrer");
    setCompletedActions((current) =>
      current.includes(href) ? current : [...current, href],
    );
    trackEvent("show_script_support_action", {
      href,
      scriptId,
    });
  }

  return (
    <>
      <div className="rounded-[18px] bg-panel px-3.5 py-3 sm:rounded-[20px] sm:px-4 sm:py-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-foreground-muted">
          Script access
        </p>
        <button
          className="mt-2.5 flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-background-muted disabled:text-foreground-muted"
          onClick={handleShowScript}
          type="button"
        >
          {isRevealed ? "Script Unlocked" : "Show Script"}
        </button>
        <p className="mt-2 text-xs leading-5 text-foreground-muted sm:text-sm sm:leading-6">
          Complete the support step once to unlock the code.
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
              Open all three links first. Once every action is done, the script
              unlock button will turn on automatically.
            </p>
            <div className="mt-4 rounded-[18px] border border-border bg-background-muted p-3.5">
              <div className="flex items-center justify-between gap-3 text-xs font-medium uppercase tracking-[0.18em] text-foreground-muted">
                <span>Progress</span>
                <span>
                  {completedActions.length}/{supportLinks.length}
                </span>
              </div>
              <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-panel">
                <div
                  aria-hidden="true"
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
            <div className="mt-5 grid gap-3 rounded-[20px] border border-border bg-background-muted p-4">
              {supportLinks.map((link) => (
                <button
                  className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium ${
                    completedActions.includes(link.href)
                      ? "border-success/40 bg-success/15 text-foreground"
                      : "border-border bg-panel hover:border-accent/60"
                  }`}
                  key={link.href}
                  onClick={() => handleSupportAction(link.href)}
                  type="button"
                >
                  <span>{link.label}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground-muted">
                    {completedActions.includes(link.href) ? "Done" : "Open"}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground-muted">
                {canReveal
                  ? "All actions finished. You can reveal the script now."
                  : `${completedActions.length}/${supportLinks.length} actions completed`}
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
