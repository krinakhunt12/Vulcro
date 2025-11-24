import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import ProductManager from '@/components/admin/ProductManager';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      <AdminHeader />

      <main>
        <div className="p-8">
          <ProductManager />
        </div>
      </main>
    </div>
  );
}
