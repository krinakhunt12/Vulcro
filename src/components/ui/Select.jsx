"use client";

import React, { useState, useRef, useEffect } from 'react';

export default function Select({ options = [], value = '', onChange, placeholder = 'Select...', className = '' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  const selectedLabel = options.find((o) => o.value === value)?.label || '';

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button type="button" onClick={() => setOpen((s) => !s)} className="w-full text-left px-3 py-2 border rounded flex items-center justify-between">
        <span className={`truncate ${selectedLabel ? '' : 'text-gray-400'}`}>{selectedLabel || placeholder}</span>
        <svg className="w-4 h-4 ml-2" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-full bg-white border rounded shadow z-50 max-h-64 overflow-auto">
          {options.map((opt) => (
            <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setOpen(false); }} className="w-full text-left px-3 py-2 hover:bg-gray-50">
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
