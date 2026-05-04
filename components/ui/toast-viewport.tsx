"use client";

import { useEffect, useSyncExternalStore } from "react";
import {
  getToastsSnapshot,
  removeToast,
  subscribeToToasts,
} from "@/lib/toast-store";

export function ToastViewport() {
  const toasts = useSyncExternalStore(
    subscribeToToasts,
    getToastsSnapshot,
    getToastsSnapshot,
  );

  useEffect(() => {
    if (toasts.length === 0) {
      return;
    }

    const timers = toasts.map((toast) =>
      window.setTimeout(() => {
        removeToast(toast.id);
      }, 3000),
    );

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [toasts]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <div className="flex w-full max-w-sm flex-col gap-3">
        {toasts.map((toast) => (
          <div
            className="glass-panel surface-border pointer-events-auto rounded-2xl px-4 py-3 shadow-2xl"
            key={toast.id}
          >
            <p className="text-sm font-semibold text-white">{toast.title}</p>
            <p className="mt-1 text-sm text-foreground-muted">
              {toast.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
