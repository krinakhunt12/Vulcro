"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increaseQty, decreaseQty, removeFromCart, clearCart } from '@/store/cartSlice';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/ToastProvider';
import CheckoutSummary from './CheckoutSummary';
import CheckoutAddress from './CheckoutAddress';

export default function CheckoutClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, loading, isAuthenticated } = useAuth();

  const items = useAppSelector((s) => s.cart.items || []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1), 0), [items]);
  const shipping = useMemo(() => (subtotal > 2000 || subtotal === 0 ? 0 : 49), [subtotal]);
  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
  const [placing, setPlacing] = useState(false);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      toast?.push({ title: 'Login required', description: 'Please login to continue to checkout', variant: 'destructive' });
      router.push(`/login?redirect=/checkout`);
    }
  }, [loading, isAuthenticated]);

  useEffect(() => {
    if (!items || items.length === 0) {
      // show empty state and redirect back to shop after small delay
      toast?.push({ title: 'Your cart is empty', description: 'Add items to proceed to checkout', variant: 'destructive' });
      const t = setTimeout(() => router.push('/shop'), 900);
      return () => clearTimeout(t);
    }
  }, []); // only run on mount

  const handlePlaceOrder = async () => {
    if (!user) {
      toast?.push({ title: 'Login required', description: 'Please login to place the order', variant: 'destructive' });
      router.push(`/login?redirect=/checkout`);
      return;
    }

    // validate address
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      toast?.push({ title: 'Missing information', description: 'Please complete the shipping address', variant: 'destructive' });
      return;
    }

    // Build payload compatible with server API: items require productId and quantity
    const payload = {
      items: items.map((it) => ({ productId: it.id || it._id, quantity: Number(it.qty) || 1, price: Number(it.price) || 0, size: it.size, color: it.color })),
      address,
      paymentMethod: 'COD',
      paymentStatus: 'Pending',
      totalAmount: Number(total) || 0,
      subtotal: Number(subtotal) || 0,
      shipping: Number(shipping) || 0,
      tax: Number(tax) || 0,
    };

    try {
      setPlacing(true);
      // include auth token if present
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Failed to place order');
      }

      const data = await res.json().catch(() => ({}));
      toast?.push({ title: 'Order placed', description: 'Your order was placed successfully', variant: 'success' });
      // clear cart and navigate to success page with order id/number
      dispatch(clearCart());
      const orderId = data?.data?._id || data?.data?.id;
      const orderNumber = data?.data?.orderNumber;
      if (orderId) router.push(`/order/success?orderId=${orderId}${orderNumber ? `&orderNumber=${orderNumber}` : ''}`);
      else router.push('/order/success');
    } catch (err) {
      console.warn('Order error', err);
      toast?.push({ title: 'Order failed', description: err.message || 'Unable to place order', variant: 'destructive' });
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold">Checkout</h1>
          <div className="text-sm text-gray-500">Secure checkout • Easy returns</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8">
            <div className="bg-white border border-gray-100 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium mb-4">Customer details</h2>
              <p className="text-sm text-gray-500 mb-4">Provide your shipping details so we can deliver your order.</p>
              <CheckoutAddress value={address} onChange={setAddress} />
            </div>
          </section>

          <aside className="lg:col-span-4">
            <div className="bg-white border border-gray-100 rounded-lg shadow-lg p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-medium mb-4">Order summary</h2>
              <CheckoutSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                tax={tax}
                total={total}
                onIncrease={(id) => dispatch(increaseQty(id))}
                onDecrease={(id) => dispatch(decreaseQty(id))}
                onRemove={(id) => dispatch(removeFromCart(id))}
              />

              <div className="mt-6">
                <button
                  onClick={handlePlaceOrder}
                  disabled={placing}
                  className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white p-3 rounded-lg shadow-md hover:opacity-95 disabled:opacity-60"
                >
                  {placing ? 'Placing order...' : 'Place Order'}
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500">We’ll send a confirmation email once your order is placed.</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
