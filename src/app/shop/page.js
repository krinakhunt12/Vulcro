import Breadcrumbs from '@/components/Breadcrumbs';
import CategoryBar from '@/components/CategoryBar';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/Pagination';
import ErrorClient from '@/components/ErrorClient';
import ShopFiltersClient from '@/components/ShopFiltersClient';
import { FiFilter, FiGrid, FiList, FiChevronDown, FiStar } from 'react-icons/fi';
import Footer from '@/components/Footer';
export const metadata = {
  title: 'Shop - VULCRO',
};

const ORIGIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export default async function ShopPage() {
  let res;
  try {
    res = await fetch(`${ORIGIN}/api/products`, { cache: 'no-store' });
  } catch (err) {
    return <ErrorClient message="Failed to fetch products. Please try again." />;
  }

  if (!res.ok) {
    const payload = await res.json().catch(() => ({}));
    return <ErrorClient message={payload?.message || 'Failed to load products'} />;
  }

  const { products } = await res.json();

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <header className="border-b border-gray-100">
        <div className="max-w-7xl mx-auto py-6">
          <Breadcrumbs 
            items={[
              { label: 'Home', href: '/' }, 
              { label: 'Shop', href: '/shop' }
            ]} 
            className="mb-4"
          />
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold tracking-tight mb-2">Shop Collection</h1>
              <p className="text-gray-600">
                Discover {products?.length || 0} premium products across our curated categories
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <CategoryBar 
                categories={["All", "Casual", "Daily Wear", "Embroidered", "Premium"]} 
                active="All"
                variant="outline"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8">
        {/* Shop Layout - Main Grid */}
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar - Filters */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-24 space-y-8">
              {/* Filter Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button className="text-sm text-gray-600 hover:text-black">
                  Clear all
                </button>
              </div>

              {/* Desktop Filters */}
              <div className="hidden lg:block">
                <ShopFiltersClient />
                
                {/* Additional Filters */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Collections</h3>
                    <ul className="space-y-2">
                      {['Essential Series', 'Archival Pieces', 'Limited Edition', 'Seasonal'].map((collection) => (
                        <li key={collection}>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" className="rounded border-gray-300" />
                            <span className="text-sm">{collection}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-3">Customer Ratings</h3>
                    <div className="space-y-2">
                      {[4, 3, 2].map((rating) => (
                        <button key={rating} className="flex items-center gap-2 text-sm hover:text-black w-full text-left">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <FiStar 
                                key={i} 
                                className={`w-4 h-4 ${i < rating ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                          <span>& above</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="col-span-12 lg:col-span-9">
            {/* Control Bar */}
            <div className="bg-gray-50 p-4 mb-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <button className="lg:hidden flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white transition-all">
                    <FiFilter />
                    <span>Filters</span>
                  </button>
                  
                  <div className="flex items-center border border-gray-200 rounded-md overflow-hidden">
                    <button className="p-2 border-r border-gray-200 hover:bg-gray-100">
                      <FiGrid className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100">
                      <FiList className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <span className="text-sm text-gray-600 hidden sm:block">
                    {products?.length || 0} products
                  </span>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <select className="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-sm focus:outline-none focus:border-black">
                      <option>Sort by: Featured</option>
                      <option>Price: Low to High</option>
                      <option>Price: High to Low</option>
                      <option>Newest First</option>
                      <option>Best Selling</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Banner */}
            <div className="mb-8">
              <div className="bg-black text-white p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Premium Collection</h3>
                    <p className="text-gray-300">Exclusive designs with premium craftsmanship</p>
                  </div>
                  <button className="border border-white px-6 py-2 font-semibold hover:bg-white hover:text-black transition-all whitespace-nowrap">
                    Explore Premium
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <section className="mb-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(products) && products.length > 0 ? (
                  products.map((product, index) => (
                    <div key={product._id || product.id} className="group">
                      {/* Featured Badge for first 2 items */}
                      {index < 2 && (
                        <div className="absolute z-10 top-3 left-3 bg-black text-white text-xs font-semibold px-2 py-1">
                          Featured
                        </div>
                      )}
                      
                      <ProductCard 
                        product={product}
                        variant="standard"
                        showQuickView
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-16">
                    <div className="text-4xl mb-4">—</div>
                    <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
                    <p className="text-gray-600">Try adjusting your filters or check back later.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Pagination */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-sm">
                  <span className="text-gray-600">Page </span>
                  <span className="font-semibold">1 of 4</span>
                </div>
                
                <Pagination 
                  page={1} 
                  total={4}
                  variant="standard"
                  showNumbers
                />
                
                <div className="text-sm text-gray-600">
                  Showing <span className="font-semibold">12</span> of <span className="font-semibold">48</span> products
                </div>
              </div>
            </div>

            {/* Category Highlights */}
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Casual', count: 24, description: 'Everyday essentials' },
                  { name: 'Daily Wear', count: 18, description: 'Comfort & style' },
                  { name: 'Embroidered', count: 12, description: 'Artisanal details' },
                  { name: 'Premium', count: 8, description: 'Luxury craftsmanship' }
                ].map((category) => (
                  <div 
                    key={category.name}
                    className="border border-gray-200 p-6 hover:border-black transition-colors cursor-pointer"
                  >
                    <h3 className="font-semibold mb-2">{category.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                    <div className="text-xs text-gray-500">{category.count} items</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <section className="mt-16 border-t border-gray-200 pt-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to receive updates on new arrivals, exclusive offers, and style insights.
            </p>
            <form className="flex max-w-md mx-auto gap-2">
              <input 
                type="email"
                placeholder="Enter your email"
                className="flex-1 border border-gray-300 px-4 py-3 focus:outline-none focus:border-black"
                required
              />
              <button 
                type="submit"
                className="bg-black text-white px-6 py-3 font-semibold hover:bg-gray-900 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy and consent to receive updates.
            </p>
          </div>
        </section>
      </div>
      <Footer/>
    </main>
  );
}