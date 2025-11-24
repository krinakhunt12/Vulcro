export const metadata = {
  title: 'Checkout — VULCRO',
  description: 'Secure checkout for premium VULCRO kurti sets. Enter shipping details and choose payment.',
};

import Link from 'next/link';
import CheckoutFormClient from '@/components/CheckoutFormClient';

import CheckoutClient from '@/components/checkout/CheckoutClient';

export default function CheckoutPage() {
  // Render client checkout wrapper that reads Redux state in real-time
  return <CheckoutClient />;
}
