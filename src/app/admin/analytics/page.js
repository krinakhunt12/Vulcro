'use client';

import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function AnalyticsPage() {
  const monthlyData = [
    { month: 'Jan', revenue: 145000, orders: 342 },
    { month: 'Feb', revenue: 168000, orders: 398 },
    { month: 'Mar', revenue: 192000, orders: 456 },
    { month: 'Apr', revenue: 178000, orders: 421 },
    { month: 'May', revenue: 205000, orders: 489 },
    { month: 'Jun', revenue: 234000, orders: 556 },
  ];

  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue));

  const topProducts = [
    { name: 'Anarkali Kurti Set', revenue: '₹3,89,440', sales: 156 },
    { name: 'Cotton Straight Kurti', revenue: '₹1,71,468', sales: 132 },
    { name: 'Printed A-Line Kurti', revenue: '₹2,12,282', sales: 118 },
    { name: 'Embroidered Kurti', revenue: '₹2,84,905', sales: 95 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <AdminHeader />
      
      <main>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
            <p className="text-gray-500 mt-2">Track your store performance and insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Revenue (6 months)</p>
              <h3 className="text-3xl font-bold text-gray-900">₹11.22L</h3>
              <p className="text-xs text-green-600 mt-2">↑ +18.5%</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Avg Order Value</p>
              <h3 className="text-3xl font-bold text-gray-900">₹2,156</h3>
              <p className="text-xs text-green-600 mt-2">↑ +5.2%</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Conversion Rate</p>
              <h3 className="text-3xl font-bold text-gray-900">3.8%</h3>
              <p className="text-xs text-green-600 mt-2">↑ +0.8%</p>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Customer Retention</p>
              <h3 className="text-3xl font-bold text-gray-900">67%</h3>
              <p className="text-xs text-green-600 mt-2">↑ +3.2%</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Monthly Revenue</h3>
                  <p className="text-sm text-gray-500 mt-1">Revenue trends over 6 months</p>
                </div>
              </div>

              <div className="flex items-end justify-between gap-6 h-72">
                {monthlyData.map((data, index) => {
                  const height = (data.revenue / maxRevenue) * 100;
                  return (
                    <div key={index} className="flex flex-col items-center flex-1 gap-3">
                      <div className="relative w-full flex items-end justify-center h-full group">
                        <div
                          className="w-full bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-600 cursor-pointer shadow-sm"
                          style={{ height: `${height}%` }}
                        >
                          <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <div>₹{(data.revenue / 1000).toFixed(0)}K</div>
                            <div className="text-gray-300">{data.orders} orders</div>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium text-gray-600">{data.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Top Products by Revenue</h3>
              <div className="space-y-5">
                {topProducts.map((product, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-700">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-1">{product.sales} sales</p>
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{product.revenue}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Traffic Sources</h3>
              <div className="space-y-4">
                {[
                  { source: 'Direct', percentage: 45, visitors: '2,340' },
                  { source: 'Social Media', percentage: 30, visitors: '1,560' },
                  { source: 'Search Engines', percentage: 20, visitors: '1,040' },
                  { source: 'Referrals', percentage: 5, visitors: '260' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.source}</span>
                      <span className="text-sm text-gray-600">{item.visitors} visitors</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Popular Categories</h3>
              <div className="space-y-4">
                {[
                  { category: 'Anarkali', sales: 234, percentage: 35 },
                  { category: 'Straight Kurti', sales: 198, percentage: 30 },
                  { category: 'A-Line', sales: 156, percentage: 23 },
                  { category: 'Designer', sales: 89, percentage: 12 },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.category}</span>
                      <span className="text-sm text-gray-600">{item.sales} sales</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
