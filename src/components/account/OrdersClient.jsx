"use client";

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useToast } from '@/components/ui/ToastProvider';
import Link from 'next/link';

function StatusBadge({ status }) {
  const map = {
    Placed: 'bg-gray-50 text-gray-700 border-gray-100',
    Packed: 'bg-gray-50 text-gray-700 border-gray-100',
    Shipped: 'bg-gray-50 text-gray-700 border-gray-100',
    Delivered: 'bg-green-50 text-green-700 border-green-200',
  };
  const cls = map[status] || 'bg-gray-50 text-gray-700 border-gray-100';
  return <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full border ${cls}`}>{status}</span>;
}

function Timeline({ status }) {
  const steps = ['Placed', 'Packed', 'Shipped', 'Delivered'];
  const idx = steps.indexOf(status);
  return (
    <div className="flex items-center gap-4">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${i <= idx ? 'bg-black' : 'bg-gray-200'}`} />
          <div className={`text-xs ${i <= idx ? 'text-gray-800' : 'text-gray-400'}`}>{s}</div>
        </div>
      ))}
    </div>
  );
}

export default function OrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch('/api/orders');
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Failed to load orders');
        if (mounted) setOrders(data.orders || []);
      } catch (err) {
        toast?.push({ title: 'Error', description: err.message || 'Could not load orders', variant: 'destructive' });
      } finally {
        setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-extrabold">My Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Recent orders & tracking</p>
        </div>
      </div>

      <div className="space-y-4">
        {loading && <div className="text-sm text-gray-500">Loading orders…</div>}
        {!loading && orders.length === 0 && <div className="text-sm text-gray-500">No orders found.</div>}

        {orders.map((order) => (
          <Card key={order.id} className="p-4">
            <div className="md:flex md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex items-center justify-center">
                    <img src={order.items[0].thumbnail} alt={order.items[0].name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-500">Order ID</div>
                        <div className="text-base font-medium text-gray-900">{order.id}</div>
                      </div>
                      <div className="text-right">
                        <StatusBadge status={order.status} />
                        <div className="text-xs text-gray-500 mt-2">Delivery estimate: <span className="font-medium text-gray-900">{new Date(order.deliveryEstimate).toLocaleDateString()}</span></div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-gray-500">Product</div>
                        <div className="text-sm font-medium text-gray-900">{order.items[0].name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Size</div>
                        <div className="text-sm text-gray-900">{order.items[0].size}</div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-500">Qty / Price</div>
                        <div className="text-sm font-medium text-gray-900">{order.items[0].qty} × ₹{order.items[0].price}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <Timeline status={order.status} />
                </div>
              </div>

              <div className="mt-4 md:mt-0 md:w-40 flex flex-col gap-2">
                <Link href={`/order/${order.id}`} className="w-full">
                  <Button className="w-full">View Order Details</Button>
                </Link>
                <div className="text-sm text-gray-500 text-center">Ordered: {new Date(order.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
