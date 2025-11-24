import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import ErrorClient from '@/components/ErrorClient';
import ShopFiltersClient from '@/components/ShopFiltersClient';

export const metadata = {
  title: 'Shop - VULCRO',
};

const ORIGIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default async function ShopPage() {
  let res;
  try {
    res = await fetch(`${ORIGIN}/api/products`, { cache: 'no-store' });
  } catch (err) {
    // avoid console.error during server render to prevent dev overlay source-map parsing
    return <ErrorClient message="Failed to fetch products. Please try again." />;
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    return <ErrorClient message={payload?.message || 'Failed to load products'} />;
  }

  const { products } = await res.json();

  return (
    <main className="container py-8">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Shop', href: '/shop' }]} />

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Shop</h1>
        <CategoryBar categories={["Casual","Daily Wear","Embroidered","Premium"]} active="Casual" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-3">
          {/* Client-only filters (loaded lazily) */}
          <ShopFiltersClient />
        </div>

        <div className="md:col-span-9">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.isArray(products) && products.length > 0 ? (
              products.map((p) => <ProductCard key={p._id || p.id} product={p} />)
            ) : (
              <div className="col-span-full text-center text-gray-600">No products found.</div>
            )}
          </div>

          <Pagination page={1} total={4} />
        </div>
      </div>
    </main>
  );
}
