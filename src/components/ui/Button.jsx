"use client";

import React from 'react';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md font-semibold transition-transform transform-gpu';
  const variants = {
    primary: 'bg-black text-white hover:scale-[1.01] px-4 py-2',
    ghost: 'bg-white border border-gray-200 text-gray-900 px-3 py-2 hover:shadow-sm',
  };

  return (
    <button {...props} className={`${base} ${variants[variant] || variants.primary} ${className}`}>
      {children}
    </button>
  );
}
