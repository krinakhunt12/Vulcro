'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const push = ({ type = 'info', title, description, timeout = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).slice(2, 9);
    setToasts((t) => [...t, { id, type, title, description }]);

    if (timeout > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, timeout);
    }

    return id;
  };

  const remove = (id) => setToasts((t) => t.filter((x) => x.id !== id));

  const value = useMemo(() => ({ toasts, push, remove }), [toasts]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-6 top-6 z-50 flex flex-col gap-3">
        {toasts.map((t) => (
          <div key={t.id} className={`max-w-sm w-full rounded-lg p-3 border ${t.type === 'success' ? 'bg-white border-green-100' : t.type === 'warning' ? 'bg-white border-yellow-100' : 'bg-white border-gray-100'}`}>
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="font-semibold text-sm text-gray-900">{t.title}</div>
                {t.description ? <div className="text-xs text-gray-500 mt-1">{t.description}</div> : null}
              </div>
              <button onClick={() => remove(t.id)} className="text-gray-400 text-sm">✕</button>
            </div>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
