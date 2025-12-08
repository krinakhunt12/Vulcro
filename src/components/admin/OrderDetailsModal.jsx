"use client";

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useToast } from '@/components/ui/ToastProvider';

export default function OrderDetailsModal({ orderId, order: prefetchedOrder, token, onClose }) {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  const fmt = (v) => typeof v === 'number' ? v.toLocaleString('en-IN') : v;

  useEffect(() => {
    // If a prefetched order object was passed, use it immediately
    if (prefetchedOrder) {
      setOrder(prefetchedOrder);
      setLoading(false);
      return;
    }

    if (!orderId) return;
    let mounted = true;
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`/api/orders/${orderId}`, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
        const json = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = json?.message || `Status ${res.status}`;
          setError(msg);
          toast?.push({ title: 'Error', description: msg, type: 'warning' });
          return;
        }
        if (mounted) setOrder(json.data);
      } catch (err) {
        console.warn('Fetch order error', err);
        setError(err.message || 'Unable to fetch order');
        toast?.push({ title: 'Error', description: err.message || 'Unable to fetch order', type: 'warning' });
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchOrder();
    return () => { mounted = false; };
  }, [orderId, token, prefetchedOrder]);

  if (!orderId && !prefetchedOrder) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50">
      <div role="dialog" aria-modal="true" className="bg-white w-full max-w-4xl mx-4 rounded-lg shadow-lg overflow-auto max-h-[85vh] border border-gray-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Order Details</h3>
            <div className="text-xs text-gray-500">{order?.orderNumber || order?. _id}</div>
          </div>
          <div>
            <button onClick={onClose} className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-gray-200 bg-white text-sm text-gray-700 hover:bg-gray-50">Close</button>
          </div>
        </div>

        <div className="p-6">
          {loading && <div className="text-sm text-gray-500">Loading order...</div>}
          {error && <div className="text-sm text-red-600">{error}</div>}
          {order && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded border border-gray-100">
                  <p className="text-xs text-gray-500">Order ID</p>
                  <div className="font-medium text-gray-800 break-all">{order.orderNumber || order._id}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded border border-gray-100 text-right">
                  <p className="text-xs text-gray-500">Order Date</p>
                  <div className="font-medium text-gray-800">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded border border-gray-100 bg-white">
                  <p className="text-xs text-gray-500">Customer</p>
                  <div className="font-medium text-gray-800">{order.userId?.name || order.address?.name || '—'}</div>
                  <div className="text-sm text-gray-600">{order.userId?.email}</div>
                </div>
                <div className="p-4 rounded border border-gray-100 bg-white">
                  <p className="text-xs text-gray-500">Contact</p>
                  <div className="font-medium text-gray-800">{order.address?.phone || '—'}</div>
                </div>
                <div className="p-4 rounded border border-gray-100 bg-white">
                  <p className="text-xs text-gray-500">Payment</p>
                  <div className="font-medium text-gray-800">{order.paymentMethod} · {order.paymentStatus}</div>
                </div>
              </div>

              <div className="p-4 rounded border border-gray-100 bg-white">
                <p className="text-xs text-gray-500">Shipping Address</p>
                <div className="mt-1 text-sm text-gray-700">
                  <div className="font-medium">{order.address?.name}</div>
                  <div>{order.address?.line1}</div>
                  <div>{order.address?.city}, {order.address?.state} - {order.address?.pincode}</div>
                  <div className="text-sm text-gray-600">Phone: {order.address?.phone}</div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700 mb-3">Items</p>
                <div className="space-y-3">
                  {Array.isArray(order.items) && order.items.map((it, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-3 rounded border border-gray-100 bg-white">
                      <div className="w-16 h-16 bg-gray-50 rounded overflow-hidden flex items-center justify-center border border-gray-100">
                        {it.productId?.images?.[0] || it.images?.[0]
                          ? <img src={it.productId?.images?.[0] || it.images?.[0]} alt={it.productId?.name || 'product'} className="w-full h-full object-cover" />
                          : <div className="text-xs text-gray-400">No image</div>
                        }
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-800">{it.productId?.name || it.title || 'Product'}</div>
                        <div className="text-sm text-gray-600">Size: {it.size || '—'} · Qty: {it.quantity} · Price: ₹{fmt(it.price)}</div>
                      </div>
                      <div className="text-sm font-semibold text-gray-800">₹{fmt((it.price || 0) * (it.quantity || 1))}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <div className="font-medium text-gray-800">{order.orderStatus}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Subtotal</div>
                  <div className="font-medium text-gray-800">₹{fmt(order.subtotal)}</div>
                  <div className="text-sm text-gray-500 mt-1">Shipping</div>
                  <div className="font-medium text-gray-800">₹{fmt(order.shippingCharge)}</div>
                  <div className="text-sm text-gray-500 mt-1">Tax</div>
                  <div className="font-medium text-gray-800">₹{fmt(order.tax)}</div>
                  <div className="text-sm text-gray-500 mt-2">Total</div>
                  <div className="font-semibold text-lg text-gray-900">₹{fmt(order.totalAmount)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

OrderDetailsModal.propTypes = {
  orderId: PropTypes.string,
  order: PropTypes.object,
  token: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};
