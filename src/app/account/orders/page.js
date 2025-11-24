"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ToastProvider';
import Link from 'next/link';

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const toast = useToast();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  useEffect(() => {
    if (!loading && user?.id) {
      loadOrders();
    }
  }, [loading, user]);

  async function loadOrders() {
    try {
      setLoadingOrders(true);
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const res = await fetch(`/api/orders?userId=${user.id}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const json = await res.json();
      if (json.success) setOrders(json.data.orders || []);
      else toast?.push({ title: 'Error', description: json.message || 'Unable to load orders' });
    } catch (err) {
      console.warn('Load user orders', err);
      toast?.push({ title: 'Error', description: err.message || 'Unable to load orders' });
    } finally {
      setLoadingOrders(false);
    }
  }

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>
      {loadingOrders ? (
        <div>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className="bg-white p-6 rounded border border-gray-100">You have not placed any orders yet.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="bg-white border border-gray-100 rounded-lg p-4 flex gap-4">
              <div className="w-24">
                <img src={(o.items?.[0]?.images?.[0]) || '/placeholder.png'} alt="product" className="w-24 h-24 object-cover rounded" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Order {o.orderNumber || o._id}</div>
                    <div className="text-sm text-gray-500">{o.items?.length || 0} items • ₹{o.totalAmount || o.totalPrice}</div>
                  </div>
                  <div className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="text-sm text-gray-700">Status: <span className="font-medium">{o.orderStatus}</span></div>
                  <Link href={`/account/orders/${o._id}`} className="text-indigo-600">View details</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
