"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function MultiSelect({ options = [], value = [], onChange, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');
  const ref = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const toggle = (val) => {
    if (value.includes(val)) onChange(value.filter((v) => v !== val));
    else onChange([...value, val]);
  };

  const visible = options.filter((o) => o.label.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((s) => !s)} className="w-full text-left px-3 py-2 border rounded flex items-center justify-between">
        <span className={`truncate ${value.length === 0 ? 'text-gray-400' : ''}`}>{value.length === 0 ? placeholder : value.join(', ')}</span>
        <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded shadow z-50 max-h-64 overflow-auto">
          <div className="p-2">
            <input className="w-full px-2 py-1 border rounded" placeholder="Search..." value={filter} onChange={(e) => setFilter(e.target.value)} />
          </div>
          <div>
            {visible.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 w-full cursor-pointer">
                <input type="checkbox" checked={value.includes(opt.value)} onChange={() => toggle(opt.value)} />
                <span className="truncate">{opt.label}</span>
              </label>
            ))}
            {visible.length === 0 && <div className="px-3 py-2 text-sm text-gray-400">No options</div>}
          </div>
        </div>
      )}
    </div>
  );
}
