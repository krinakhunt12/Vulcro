"use client";

import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically load the heavy ShopFilters component on the client only.
const ShopFilters = dynamic(() => import('@/components/ShopFilters'), {
  loading: () => (
    <div className="space-y-4">
      <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
      <div className="h-32 bg-gray-200 rounded animate-pulse"></div>
    </div>
  ),
  ssr: false,
});

export default function ShopFiltersClient(props) {
  return <ShopFilters {...props} />;
}
