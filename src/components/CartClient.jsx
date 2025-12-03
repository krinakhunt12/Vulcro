"use client";
import { useEffect } from 'react';
import CartItem from './CartItem';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQty, decreaseQty, clearCart } from '@/store/cartSlice';
import { useToast } from './ToastProvider';

export default function CartClient() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.cart.items || []);
  const toast = useToast();

  function handleRemove(id) {
    dispatch(removeFromCart(id));
    toast.push({ type: 'success', title: 'Removed', description: 'Item removed from cart' });
  }

  function handleQtyChange(id, qty) {
    // reflect change via increase/decrease
    // naive: set exact qty by computing diff
    const current = items.find((i) => String(i.id) === String(id));
    if (!current) return;
    const diff = qty - (current.qty || 1);
    if (diff > 0) {
      for (let i = 0; i < diff; i++) dispatch(increaseQty(id));
    } else if (diff < 0) {
      for (let i = 0; i < Math.abs(diff); i++) dispatch(decreaseQty(id));
    }
  }

  function handleSizeChange(id, size) {
    // size managed per item in slice if needed (not implemented fully)
    toast.push({ type: 'info', title: 'Size updated', description: `Size set to ${size}` });
  }

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0);
  const delivery = subtotal > 3000 ? 0 : items.length ? 49 : 0;
  const discount = 0;
  const total = subtotal + delivery - discount;

  return (
    <div className="container mx-auto px-6 py-10">
      <header className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Your Cart</h1>
        <div className="text-sm text-[--muted]">{items.length} items</div>
      </header>

      {items.length === 0 ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-6">
          <div className="w-64 h-48 bg-[--surface] rounded-md flex items-center justify-center">{/* illustration placeholder */}
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none"><rect width="120" height="90" rx="8" fill="#F7F7F7"/></svg>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-semibold">Your cart is empty</h2>
            <p className="text-sm text-[--muted] mt-2">Browse our kurti collections and add your favourites.</p>

            <div className="mt-4">
              <Link href="/shop">
                <button className="btn btn-outline px-4 py-2">Continue Shopping</button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <section className="lg:col-span-8 space-y-4">
            {items.map((it) => (
              <CartItem key={it.id} item={it} onRemove={handleRemove} onQtyChange={handleQtyChange} onSizeChange={handleSizeChange} />
            ))}

            <div className="flex justify-between items-center text-sm text-gray-600">
              <div>Have a promo code?</div>
              <button className="text-sm underline">Apply</button>
            </div>
          </section>

          <aside className="lg:col-span-4">
            <div className="card p-6 sticky top-24">
              <h2 className="text-lg font-medium mb-4">Order summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal}</span></div>
                <div className="flex items-center justify-between"><span>Delivery</span><span>₹{delivery}</span></div>
                <div className="flex items-center justify-between"><span>Discount</span><span>-₹{discount}</span></div>
                <div className="border-t border-gray-100 pt-3 flex items-center justify-between font-semibold text-lg"><span>Total</span><span>₹{total}</span></div>
              </div>

              <div className="mt-6">
                <Link href="/checkout">
                  <button className="w-full btn btn-primary px-4 py-3">Proceed to Checkout</button>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
