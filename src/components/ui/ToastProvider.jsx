"use client";

import React, { createContext, useCallback, useContext, useState, useRef } from 'react';

const ToastContext = createContext(null);

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const idRef = useRef(0);

  const push = useCallback((toast) => {
    const id = `toast_${++idRef.current}`;
    setToasts((t) => [...t, { id, ...toast }]);
    // auto remove
    if (!toast.duration || toast.duration > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, toast.duration ?? 4000);
    }
  }, []);

  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  return (
    <ToastContext.Provider value={{ push, remove }}>
      {children}

      {/* Toast container */}
      <div aria-live="polite" className="pointer-events-none fixed inset-0 flex items-end px-6 py-6 sm:items-start sm:justify-end sm:py-8">
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {toasts.map((t) => (
            <div key={t.id} className={`pointer-events-auto max-w-sm w-full bg-white border border-gray-100 shadow-md rounded-md p-3 ${t.variant === 'destructive' ? 'ring-1 ring-red-200' : ''}`}>
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <div className="font-medium text-sm text-gray-900">{t.title}</div>
                  {t.description && <div className="text-xs text-gray-600">{t.description}</div>}
                </div>
                <div>
                  <button onClick={() => remove(t.id)} className="text-xs text-gray-400">Dismiss</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToastContext.Provider>
  );
}
