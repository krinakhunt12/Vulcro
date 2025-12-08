"use client";

import React, { useEffect, useState } from 'react';
import CheckoutClient from './CheckoutClient';

// Wrapper ensures no server-rendered markup for the checkout client UI
// Prevents hydration mismatches by rendering nothing on the server
export default function CheckoutClientWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return <CheckoutClient />;
}
