const RecentOrders = () => {
  const orders = [
    { id: '#ORD-1047', customer: 'Priya Sharma', product: 'Anarkali Kurti Set', status: 'Delivered', amount: '₹2,499', date: 'Nov 22, 2025' },
    { id: '#ORD-1046', customer: 'Anjali Patel', product: 'Cotton Straight Kurti', status: 'Shipped', amount: '₹1,299', date: 'Nov 22, 2025' },
    { id: '#ORD-1045', customer: 'Neha Reddy', product: 'Printed A-Line Kurti', status: 'Processing', amount: '₹1,799', date: 'Nov 21, 2025' },
    { id: '#ORD-1044', customer: 'Kavya Iyer', product: 'Embroidered Kurti', status: 'Delivered', amount: '₹2,999', date: 'Nov 21, 2025' },
    { id: '#ORD-1043', customer: 'Riya Gupta', product: 'Floral Print Kurti', status: 'Cancelled', amount: '₹1,499', date: 'Nov 20, 2025' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Processing':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Latest customer transactions</p>
        </div>
        <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-200 transition-all">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Order ID</th>
              <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Customer</th>
              <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Product</th>
              <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Status</th>
              <th className="text-left text-xs font-semibold text-gray-600 pb-3 pr-4">Amount</th>
              <th className="text-left text-xs font-semibold text-gray-600 pb-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 pr-4">
                  <span className="text-sm font-medium text-gray-800">{order.id}</span>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-sm text-gray-700">{order.customer}</span>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-sm text-gray-700">{order.product}</span>
                </td>
                <td className="py-4 pr-4">
                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 pr-4">
                  <span className="text-sm font-semibold text-gray-800">{order.amount}</span>
                </td>
                <td className="py-4">
                  <span className="text-sm text-gray-500">{order.date}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
