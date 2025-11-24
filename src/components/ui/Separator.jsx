"use client";

import React from 'react';

export default function Separator({ className = '' }) {
  return <div className={`my-4 flex items-center gap-3 ${className}`}><div className="flex-1 h-px bg-gray-100"/></div>;
}
