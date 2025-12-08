"use client";

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { increaseQty, decreaseQty, removeFromCart, clearCart } from '@/store/cartSlice';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/ToastProvider';
import CheckoutSummary from './CheckoutSummary';
import CheckoutAddress from './CheckoutAddress';
import { useAuthStore } from '@/store/authStore';

export default function CheckoutClient() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const { user, loading, isAuthenticated } = useAuth();
  const { token: authToken } = useAuthStore();

  const items = useAppSelector((s) => s.cart.items || []);

  const subtotal = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.qty) || 1), 0), [items]);
  const shipping = useMemo(() => (subtotal > 2000 || subtotal === 0 ? 0 : 49), [subtotal]);
  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);
  const total = useMemo(() => subtotal + shipping + tax, [subtotal, shipping, tax]);

  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', state: '', pincode: '' });
  const [placing, setPlacing] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('COD');
  const [addressError, setAddressError] = useState('');

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

  const handlePlaceOrder = async (paymentMode = 'COD') => {
    // allow anonymous orders as server no longer requires auth
    console.log('[Checkout] Placing order with payment mode:', paymentMode);

    // validate address
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      const msg = 'Please complete the shipping address';
      console.warn('[Checkout] Missing address fields', address);
      setAddressError(msg);
      toast?.push({ title: 'Missing information', description: msg, variant: 'destructive' });
      return;
    }

    // Build payload compatible with server API: items require productId and quantity
    const payload = {
      items: items.map((it) => ({ productId: it.id || it._id, quantity: Number(it.qty) || 1, price: Number(it.price) || 0, size: it.size, color: it.color, title: it.title })),
      address,
      paymentMethod: paymentMode,
      paymentStatus: 'Pending',
      totalAmount: Number(total) || 0,
      subtotal: Number(subtotal) || 0,
      shipping: Number(shipping) || 0,
      tax: Number(tax) || 0,
      userId: user?.id || user?._id || null,
    };

    try {
      setPlacing(true);
      // include auth token if present
      const headers = { 'Content-Type': 'application/json' };
      if (authToken) headers['Authorization'] = `Bearer ${authToken}`;

      console.log('[Checkout] POST /api/orders payload:', payload);

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
      setAddressError('');
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

  const onConfirmPlace = () => {
    // user confirmed payment selection
    setShowPaymentModal(false);
    handlePlaceOrder(selectedPayment);
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
                  onClick={() => setShowPaymentModal(true)}
                  disabled={placing}
                  className="w-full btn btn-primary p-3 rounded-lg shadow-md disabled:opacity-60"
                >
                  {placing ? 'Placing order...' : 'Place Order'}
                </button>
              </div>

              <div className="mt-4 text-xs text-gray-500">We’ll send a confirmation email once your order is placed.</div>
            </div>
          </aside>
        </div>
      </div>
          {/* Payment selection modal */}
          {showPaymentModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
              <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                <h3 className="text-lg font-semibold mb-3">Select payment method</h3>
                <div className="space-y-3">
                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${selectedPayment === 'COD' ? 'border-primary' : 'border-gray-200'}`}>
                    <input className="mr-3" type="radio" name="payment" value="COD" checked={selectedPayment === 'COD'} onChange={() => setSelectedPayment('COD')} />
                    <div>
                      <div className="font-medium">Cash on Delivery (COD)</div>
                      <div className="text-sm text-gray-500">Pay when you receive the order</div>
                    </div>
                  </label>

                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${selectedPayment === 'UPI' ? 'border-primary' : 'border-gray-200'}`}>
                    <input className="mr-3" type="radio" name="payment" value="UPI" checked={selectedPayment === 'UPI'} onChange={() => setSelectedPayment('UPI')} />
                    <div>
                      <div className="font-medium">UPI / Netbanking</div>
                      <div className="text-sm text-gray-500">Fast and secure online payment</div>
                    </div>
                  </label>

                  <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${selectedPayment === 'Card' ? 'border-primary' : 'border-gray-200'}`}>
                    <input className="mr-3" type="radio" name="payment" value="Card" checked={selectedPayment === 'Card'} onChange={() => setSelectedPayment('Card')} />
                    <div>
                      <div className="font-medium">Card (Credit / Debit)</div>
                      <div className="text-sm text-gray-500">Pay with your card</div>
                    </div>
                  </label>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button className="btn btn-ghost px-4 py-2 rounded" onClick={() => setShowPaymentModal(false)}>Cancel</button>
                  <button className="btn btn-primary px-4 py-2 rounded" onClick={onConfirmPlace}>Confirm & Pay</button>
                </div>
              </div>
            </div>
          )}
    </div>
  );
}
