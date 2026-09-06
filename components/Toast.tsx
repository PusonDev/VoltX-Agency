"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

type ToastType = "success" | "info" | "warning";

interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (title: string, description?: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType>({
  toast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback((title: string, description?: string, type: ToastType = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-20 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-tech-md border border-border-tech bg-surface-card p-3.5 shadow-2xl backdrop-blur-lg animate-in slide-in-from-bottom-5 fade-in duration-200"
          >
            {t.type === "success" && (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
            )}
            {t.type === "info" && (
              <Info className="h-4 w-4 text-volt-cyan mt-0.5 shrink-0" />
            )}
            {t.type === "warning" && (
              <AlertTriangle className="h-4 w-4 text-volt-gold mt-0.5 shrink-0" />
            )}
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-text-primary tracking-tight font-sans">
                {t.title}
              </div>
              {t.description && (
                <div className="text-[11px] text-text-secondary mt-0.5 font-mono leading-relaxed">
                  {t.description}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(t.id)}
              className="text-text-muted hover:text-text-primary p-0.5 transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};
