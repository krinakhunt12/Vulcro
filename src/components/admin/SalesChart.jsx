'use client';

const SalesChart = () => {
  const weekData = [
    { day: 'Mon', sales: 12000 },
    { day: 'Tue', sales: 19000 },
    { day: 'Wed', sales: 15000 },
    { day: 'Thu', sales: 25000 },
    { day: 'Fri', sales: 22000 },
    { day: 'Sat', sales: 30000 },
    { day: 'Sun', sales: 28000 },
  ];

  const maxSales = Math.max(...weekData.map(d => d.sales));

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Weekly Sales Trends</h3>
          <p className="text-sm text-gray-500 mt-1">Sales performance over the week</p>
        </div>
        <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="flex items-end justify-between gap-4 h-64">
        {weekData.map((data, index) => {
          const height = (data.sales / maxSales) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1 gap-2">
              <div className="relative w-full flex items-end justify-center h-full group">
                <div
                  className="w-full bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg transition-all duration-300 hover:from-gray-800 hover:to-gray-600 cursor-pointer shadow-sm"
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ₹{data.sales.toLocaleString()}
                  </div>
                </div>
              </div>
              <span className="text-xs font-medium text-gray-600">{data.day}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SalesChart;
