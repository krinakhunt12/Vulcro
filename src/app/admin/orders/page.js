"use client";
import { useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { useToast } from '@/components/ui/ToastProvider';
import { useAdminStore } from '@/store/adminStore';
import dynamic from 'next/dynamic';
const OrderDetailsModal = dynamic(() => import('@/components/admin/OrderDetailsModal'), { ssr: false });

export default function OrdersPage() {
  const toast = useToast();
  const { token } = useAdminStore();
  const { role } = useAdminStore();
  const [orders, setOrders] = useState([]);
  const [analytics, setAnalytics] = useState({ totalOrders: 0, totalRevenue: 0, cod: 0, online: 0 });
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState('');
  const [status, setStatus] = useState('');
  const [query, setQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  async function loadOrders() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (range) params.set('range', range);
      if (status) params.set('status', status);
      const url = `/api/orders${params.toString() ? `?${params.toString()}` : ''}`;
      const res = await fetch(url, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const json = await res.json();
      if (json.success) {
        setOrders(json.data.orders || []);
        setAnalytics(json.data.analytics || { totalOrders: 0, totalRevenue: 0, cod: 0, online: 0 });
      } else {
        toast?.push({ title: 'Error', description: json.message || 'Unable to fetch orders', type: 'warning' });
      }
    } catch (err) {
      console.warn('Load orders', err);
      toast?.push({ title: 'Error', description: err.message || 'Unable to fetch orders', type: 'warning' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { loadOrders(); }, [range, status]);

  const handleStatusUpdate = async (orderId, value) => {
    try {
      // Use dedicated status endpoint for clarity
      console.log('Admin: updating status', orderId, value);
      const res = await fetch(`/api/orders/${orderId}/status`, { method: 'PATCH', headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify({ orderStatus: value }) });
      const json = await res.json();
      if (json.success) {
        toast?.push({ title: 'Updated', description: 'Order status updated' });
        // update local UI without full refresh
        setOrders((prev) => prev.map((o) => (String(o._id) === String(orderId) ? json.data : o)));
        if (selectedOrder && String(selectedOrder._id) === String(orderId)) setSelectedOrder(json.data);
      } else {
        toast?.push({ title: 'Error', description: json.message || 'Unable to update' });
      }
    } catch (err) {
      console.warn('Update status', err);
      toast?.push({ title: 'Error', description: err.message || 'Unable to update' });
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Soft-delete this order?')) return;
    try {
      const res = await fetch(`/api/orders/${orderId}`, { method: 'DELETE', headers: token ? { Authorization: `Bearer ${token}` } : {} });
      const json = await res.json();
      if (json.success) {
        toast?.push({ title: 'Deleted', description: 'Order soft-deleted' });
        loadOrders();
      } else {
        toast?.push({ title: 'Error', description: json.message || 'Unable to delete' });
      }
    } catch (err) {
      console.warn('Delete order', err);
      toast?.push({ title: 'Error', description: err.message || 'Unable to delete' });
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      Placed: 'bg-gray-50 text-gray-700 border-gray-200',
      Packed: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Shipped: 'bg-blue-50 text-blue-700 border-blue-200',
      Delivered: 'bg-green-50 text-green-700 border-green-200',
    };
    return colors[status] || colors.Placed;
  };

  if (role !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Access restricted</h2>
          <p className="text-sm text-gray-600 mb-4">You must be an admin to view orders. Please login with an admin account.</p>
          <a href="/admin/login" className="px-4 py-2 bg-indigo-600 text-white rounded">Go to Admin Login</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <AdminHeader />

      <main>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
            <p className="text-gray-500 mt-2">Manage customer orders and shipments</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Total Orders</p>
              <h3 className="text-3xl font-bold text-gray-900">{analytics.totalOrders}</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">COD</p>
              <h3 className="text-3xl font-bold text-gray-900">{analytics.cod}</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Online</p>
              <h3 className="text-3xl font-bold text-gray-900">{analytics.online}</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Revenue</p>
              <h3 className="text-3xl font-bold text-gray-900">₹{analytics.totalRevenue}</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search orders..."
                    className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <option value="">All Status</option>
                  <option value="Placed">Placed</option>
                  <option value="Packed">Packed</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                </select>
                <select value={range} onChange={(e) => setRange(e.target.value)} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <option value="">All time</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
                <button onClick={loadOrders} className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Refresh</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Order #</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Customer</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Items</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Total</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Payment</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Date</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-800">{order.orderNumber || order._id}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{order.userId?.name || order.userId?.email || '—'}</span>
                        <div className="text-xs text-gray-500">{order.address?.line1}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{order.items?.length || 0}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-800">₹{order.totalAmount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <select value={order.orderStatus} onChange={(e) => handleStatusUpdate(order._id, e.target.value)} className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.orderStatus)}`}>
                          <option value="Placed">Placed</option>
                          <option value="Packed">Packed</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{order.paymentMethod} · {order.paymentStatus}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button onClick={() => { console.log('Admin: open order', order._id); setSelectedOrder(order); }} className="px-2 py-1 text-sm bg-gray-50 border border-gray-200 rounded">View</button>
                          <button onClick={() => handleDelete(order._id)} className="px-2 py-1 text-sm bg-red-50 border border-red-200 rounded text-red-600">Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} token={token} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  );
}
