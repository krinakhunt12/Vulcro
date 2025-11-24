'use client';

const ProductPerformance = () => {
  const products = [
    { name: 'Anarkali Kurti Set', sales: 156, percentage: 95 },
    { name: 'Cotton Straight Kurti', sales: 132, percentage: 80 },
    { name: 'Printed A-Line Kurti', sales: 118, percentage: 72 },
    { name: 'Embroidered Kurti', sales: 95, percentage: 58 },
    { name: 'Floral Print Kurti', sales: 87, percentage: 53 },
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Product Performance</h3>
          <p className="text-sm text-gray-500 mt-1">Top selling kurtis this month</p>
        </div>
        <span className="px-3 py-1 bg-gray-50 text-gray-700 text-xs font-medium rounded-full border border-gray-200">
          November 2025
        </span>
      </div>

      <div className="space-y-5">
        {products.map((product, index) => (
          <div key={index} className="group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">{product.name}</span>
              <span className="text-sm font-semibold text-gray-800">{product.sales} sales</span>
            </div>
            <div className="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-gray-600 to-gray-800 rounded-full transition-all duration-500 group-hover:from-gray-700 group-hover:to-gray-900"
                style={{ width: `${product.percentage}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductPerformance;
