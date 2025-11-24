import OrdersClient from '@/components/account/OrdersClient';

export const metadata = {
  title: 'My Orders — VULCRO',
  description: 'View your orders and tracking information',
};

export default function OrdersPage() {
  return <OrdersClient />;
}
