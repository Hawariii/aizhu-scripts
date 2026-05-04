type Toast = {
  description: string;
  id: string;
  title: string;
};

let toasts: Toast[] = [];
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function addToast(toast: Omit<Toast, "id">) {
  toasts = [
    ...toasts,
    {
      ...toast,
      id: crypto.randomUUID(),
    },
  ];
  emitChange();
}

export function removeToast(id: string) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emitChange();
}

export function subscribeToToasts(listener: () => void) {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getToastsSnapshot() {
  return toasts;
}
