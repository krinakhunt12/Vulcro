"use client";

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import Image from 'next/image';

function ProductCard({ item, onAddToCart, onRemove }) {
  return (
    <Card className="p-4 hover:shadow-lg transition-shadow rounded-lg">
      <div className="flex flex-col">
        <div className="w-full h-48 relative rounded overflow-hidden bg-gray-100">
          <Image src={item.image} alt={item.name} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover" />
        </div>

        <div className="mt-4 flex-1 flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">{item.name}</div>
            <div className="text-lg font-medium text-gray-900 mt-1">₹{item.price}</div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <Button onClick={() => onAddToCart(item)} className="text-sm">Add to Cart</Button>
            <button onClick={() => onRemove(item.id)} aria-label="Remove from wishlist" className="text-gray-500 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function WishlistClient() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/wishlist');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load');
        if (mounted) setItems(data.items || []);
      } catch (err) {
        toast?.push({ title: 'Error', description: err.message || 'Could not load wishlist', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  function handleAddToCart(item) {
    // TODO: call cart API
    toast?.push({ title: 'Added to cart', description: item.name });
  }

  function handleRemove(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
    toast?.push({ title: 'Removed', description: 'Item removed from wishlist' });
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <aside className="md:col-span-1">
            <div className="sticky top-24">
              <Card className="p-4 space-y-4">
                <nav className="flex flex-col gap-2">
                  <a href="/account" className="px-3 py-2 rounded text-sm hover:bg-gray-50">My Profile</a>
                  <a href="/order/history" className="px-3 py-2 rounded text-sm hover:bg-gray-50">My Orders</a>
                  <a href="/wishlist" className="px-3 py-2 rounded text-sm font-medium bg-black text-white">Wishlist</a>
                  <a href="#" onClick={() => { localStorage.removeItem('vulcro_user'); window.location.href = '/'; }} className="px-3 py-2 rounded text-sm hover:bg-gray-50">Logout</a>
                </nav>
              </Card>
            </div>
          </aside>

          <main className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-extrabold">My Wishlist</h1>
                <p className="text-sm text-gray-500 mt-1">Your saved items</p>
              </div>
            </div>

            {loading && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg bg-gray-50 animate-pulse h-64" />
                ))}
              </div>
            )}

            {!loading && items.length === 0 && (
              <div className="py-20 text-center">
                <div className="mx-auto w-48 h-48 rounded-lg bg-gray-100 flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.682l-7.682-7.682a4.5 4.5 0 010-6.364z" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold">Your wishlist is empty</h2>
                <p className="text-sm text-gray-500 mt-2">Save items you love to find them later</p>
                <div className="mt-6">
                  <a href="/shop"><Button>Start Shopping</Button></a>
                </div>
              </div>
            )}

            {!loading && items.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {items.map((item) => (
                  <ProductCard key={item.id} item={item} onAddToCart={handleAddToCart} onRemove={handleRemove} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
