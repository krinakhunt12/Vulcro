export const metadata = {
  title: 'Checkout — VULCRO',
  description: 'Secure checkout for premium VULCRO kurti sets. Enter shipping details and choose payment.',
};

import Link from 'next/link';
import CheckoutFormClient from '@/components/CheckoutFormClient';

import CheckoutClientWrapper from '@/components/checkout/CheckoutClientWrapper';

export default function CheckoutPage() {
  // Render client-only wrapper which mounts on the client to avoid hydration mismatches.
  return <CheckoutClientWrapper />;
}
