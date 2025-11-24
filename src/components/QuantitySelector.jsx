"use client";
import { useState } from "react";

export default function QuantitySelector({ initial = 1, onChange }) {
  const [qty, setQty] = useState(initial);

  function inc() { setQty((q) => { const n = Math.min(10, q+1); onChange?.(n); return n; }); }
  function dec() { setQty((q) => { const n = Math.max(1, q-1); onChange?.(n); return n; }); }

  return (
    <div className="inline-flex items-center gap-2 border border-gray-100 rounded-md px-2 py-1">
      <button onClick={dec} className="px-2">-</button>
      <div className="w-8 text-center">{qty}</div>
      <button onClick={inc} className="px-2">+</button>
    </div>
  );
}
