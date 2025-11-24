import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

export default function CustomersPage() {
  const customers = [
    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', orders: 12, spent: '₹28,490', joined: 'Jan 15, 2024', status: 'Active' },
    { id: 2, name: 'Anjali Patel', email: 'anjali.patel@email.com', orders: 8, spent: '₹15,200', joined: 'Feb 22, 2024', status: 'Active' },
    { id: 3, name: 'Neha Reddy', email: 'neha.reddy@email.com', orders: 15, spent: '₹34,750', joined: 'Dec 10, 2023', status: 'Active' },
    { id: 4, name: 'Kavya Iyer', email: 'kavya.iyer@email.com', orders: 5, spent: '₹12,900', joined: 'Mar 18, 2024', status: 'Active' },
    { id: 5, name: 'Riya Gupta', email: 'riya.gupta@email.com', orders: 3, spent: '₹7,200', joined: 'Apr 05, 2024', status: 'Inactive' },
    { id: 6, name: 'Meera Singh', email: 'meera.singh@email.com', orders: 20, spent: '₹45,600', joined: 'Nov 08, 2023', status: 'Active' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <AdminHeader />
      
      <main>
        <div className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
            <p className="text-gray-500 mt-2">Manage your customer database</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Total Customers</p>
              <h3 className="text-3xl font-bold text-gray-900">3,892</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Active</p>
              <h3 className="text-3xl font-bold text-green-600">3,645</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">New This Month</p>
              <h3 className="text-3xl font-bold text-blue-600">247</h3>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
              <p className="text-sm text-gray-500 font-medium mb-2">Avg Order Value</p>
              <h3 className="text-3xl font-bold text-gray-900">₹2,156</h3>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search customers..."
                    className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <select className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300">
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Customer</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Email</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Orders</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Total Spent</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Joined</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Status</th>
                    <th className="text-left text-xs font-semibold text-gray-600 px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                            {customer.name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-800">{customer.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">{customer.email}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-700">{customer.orders}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-semibold text-gray-800">{customer.spent}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-500">{customer.joined}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full border ${
                          customer.status === 'Active' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}>
                          {customer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <button className="p-1.5 text-gray-600 hover:bg-gray-100 rounded transition-colors">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
