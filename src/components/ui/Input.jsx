"use client";

import React from 'react';

export default function Input(props) {
  return (
    <input
      {...props}
      className={`mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/10 ${props.className || ''}`}
    />
  );
}
