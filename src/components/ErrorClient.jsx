"use client";

import { useEffect, useState } from 'react';

// Very small client-side toast / error component. Replace with your design/system.
export default function ErrorClient({ message = 'Something went wrong' }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => setVisible(false), 6000);
    return () => clearTimeout(t);
  }, [message]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 w-full max-w-xs">
      <div className="bg-red-600 text-white px-4 py-3 rounded shadow-lg">
        <div className="flex items-start gap-3">
          <div className="flex-1 text-sm">{message}</div>
          <button onClick={() => setVisible(false)} className="text-white opacity-80">✕</button>
        </div>
      </div>
    </div>
  );
}
