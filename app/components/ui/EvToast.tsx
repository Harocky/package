"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  title?: string;
  description?: string;
  emoji?: string;
  type?: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id">) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = ({
    title,
    description,
    emoji,
    type = "info",
    duration = 3000,
  }: Omit<Toast, "id">) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [
      ...prev,
      { id, title, description, emoji, type, duration },
    ]);

    setTimeout(() => removeToast(id), duration);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col ev-gap-sm w-[calc(100vw-2rem)] sm:w-auto max-w-sm">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

const ToastItem = ({
  toast,
  onClose,
}: {
  toast: Toast;
  onClose: (id: string) => void;
}) => {
  const styles = {
    success: "text-green-500",
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  return (
    <div
      className={`w-full rounded-2xl shadow-xl flex items-start justify-between ev-pad-md ev-gap-sm ${styles[toast.type || "info"]}`}
    >
      <div className="flex items-start ev-gap-sm w-full">
        {toast.emoji && <span className="text-xl">{toast.emoji}</span>}

        <div className="flex flex-col">
          {toast.title && (
            <span className="font-semibold text-sm">{toast.title}</span>
          )}
          {toast.description && (
            <span className="text-xs opacity-90">{toast.description}</span>
          )}
        </div>
      </div>

      <button
        onClick={() => onClose(toast.id)}
        className="text-sm opacity-80 hover:opacity-100 cursor-pointer"
      >
        ✕
      </button>
    </div>
  );
};
