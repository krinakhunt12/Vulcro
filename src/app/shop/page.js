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

export default async function ShopPage({ searchParams } = {}) {
  // Temporarily filter noisy/invalid source-map console errors that break dev output.
  const _origConsoleError = console.error;
  console.error = (...args) => {
    try {
      const first = args[0];
      if (typeof first === 'string' && first.includes('Invalid source map')) {
        return;
      }
    } catch (e) {
      // ignore wrapper errors
    }
    _origConsoleError.apply(console, args);
  };

  const currentPage = Number(searchParams?.page) || 1;
  const category = searchParams?.category || 'All';
  const collection = searchParams?.collection || '';
  const minPrice = searchParams?.minPrice ? Number(searchParams.minPrice) : undefined;
  const maxPrice = searchParams?.maxPrice ? Number(searchParams.maxPrice) : undefined;
  const rating = searchParams?.rating ? Number(searchParams.rating) : undefined;
  const sortBy = searchParams?.sortBy || 'featured';
  const searchQuery = searchParams?.search || '';
  const view = searchParams?.view || 'grid';

  try {
    const queryParams = new URLSearchParams();
    
    if (category && category !== 'All') queryParams.append('category', category);
    if (collection) queryParams.append('collection', collection);
    if (minPrice !== undefined) queryParams.append('minPrice', minPrice.toString());
    if (maxPrice !== undefined) queryParams.append('maxPrice', maxPrice.toString());
    if (rating !== undefined) queryParams.append('rating', rating.toString());
    if (sortBy) queryParams.append('sortBy', sortBy);
    if (searchQuery) queryParams.append('search', searchQuery);
    queryParams.append('page', currentPage.toString());
    queryParams.append('limit', '12');

    const res = await fetch(`${ORIGIN}/api/products?${queryParams.toString()}`, { 
      cache: 'no-store' 
    });

    if (!res.ok) {
      const payload = await res.json().catch(() => ({}));
      return <ErrorClient message={payload?.message || 'Failed to load products'} />;
    }

    const { products, totalProducts, totalPages, currentPage: page } = await res.json();

    const allCategories = ["All", "Casual", "Daily Wear", "Embroidered", "Premium"];
    const collections = ['Essential Series', 'Archival Pieces', 'Limited Edition', 'Seasonal'];

    try {
      return (
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Header Section - Fixed navbar spacing */}
        <header className="pt-24 pb-8 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs 
              items={[
                { label: 'Home', href: '/' }, 
                { label: 'Shop', href: '/shop' }
              ]} 
              className="mb-6"
            />
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-3">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Shop Collection
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl">
                  Discover <span className="font-semibold text-black">{totalProducts || 0}</span> premium products across our curated categories
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <CategoryBar 
                  categories={allCategories} 
                  active={category}
                  variant="outline"
                />
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-12 gap-8">
            {/* Sidebar Filters */}
            <aside id="filters" className="col-span-12 lg:col-span-3">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                      <FiFilter className="w-5 h-5" />
                      Filters
                    </h2>
                    <a 
                      href="/shop"
                      className="text-sm text-gray-600 hover:text-black font-medium transition-colors"
                    >
                      Clear all
                    </a>
                  </div>

                  <div className="hidden lg:block space-y-6">
                    <ShopFiltersClient 
                      initialCategory={category}
                      initialCollections={collection ? [collection] : []}
                      initialMinPrice={minPrice}
                      initialMaxPrice={maxPrice}
                      initialRating={rating}
                    />
                    
                    {/* Collections */}
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="font-semibold mb-4 text-gray-900">Collections</h3>
                      <ul className="space-y-3">
                        {collections.map((col) => {
                          const isSelected = collection === col;
                          return (
                            <li key={col}>
                              <a 
                                href={`/shop?${new URLSearchParams({
                                  ...(category !== 'All' && { category }),
                                  ...(isSelected ? {} : { collection: col }),
                                  ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                                  ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                                  ...(rating !== undefined && { rating: rating.toString() }),
                                  sortBy,
                                }).toString()}`}
                                className={`flex items-center gap-3 cursor-pointer transition-all group ${isSelected ? 'text-black font-medium' : 'text-gray-700 hover:text-black'}`}
                              >
                                <div className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-all ${isSelected ? 'bg-black border-black' : 'border-gray-300 group-hover:border-gray-400'}`}>
                                  {isSelected && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                  )}
                                </div>
                                <span className="text-sm">{col}</span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    
                    {/* Ratings */}
                    <div className="pt-6 border-t border-gray-100">
                      <h3 className="font-semibold mb-4 text-gray-900">Customer Ratings</h3>
                      <div className="space-y-3">
                        {[4, 3, 2].map((ratingValue) => {
                          const isSelected = rating === ratingValue;
                          return (
                            <a 
                              key={ratingValue}
                              href={`/shop?${new URLSearchParams({
                                ...(category !== 'All' && { category }),
                                ...(collection && { collection }),
                                ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                                ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                                ...(isSelected ? {} : { rating: ratingValue.toString() }),
                                sortBy,
                              }).toString()}`}
                              className={`flex items-center gap-3 text-sm hover:text-black w-full text-left transition-colors group ${isSelected ? 'text-black font-medium' : 'text-gray-600'}`}
                            >
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <FiStar 
                                    key={i} 
                                    className={`w-4 h-4 transition-colors ${i < ratingValue ? 'text-yellow-400 fill-current' : 'text-gray-300 group-hover:text-gray-400'}`}
                                  />
                                ))}
                              </div>
                              <span>& above</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <div className="col-span-12 lg:col-span-9">
              {/* Toolbar */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-wrap">
                    <a
                      href="#filters"
                      className="lg:hidden flex items-center gap-2 px-4 py-2.5 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all font-medium"
                    >
                      <FiFilter />
                      <span>Filters</span>
                    </a>
                    
                    {/* View Toggle */}
                    <div className="flex items-center border-2 border-gray-100 rounded-lg overflow-hidden shadow-sm" role="tablist" aria-label="View toggle">
                      {/* Grid view */}
                      <a
                        href={`/shop?${new URLSearchParams({
                          ...(category !== 'All' && { category }),
                          ...(collection && { collection }),
                          ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                          ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                          ...(rating !== undefined && { rating: rating.toString() }),
                          sortBy,
                          view: 'grid',
                        }).toString()}`}
                        role="tab"
                        aria-pressed={view === 'grid'}
                        title="Grid view"
                        className={`p-2.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 ${view === 'grid' ? 'bg-white text-black' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}
                      >
                        <FiGrid className="w-5 h-5" aria-hidden />
                        <span className="sr-only">Grid view</span>
                      </a>

                      {/* List view */}
                      <a
                        href={`/shop?${new URLSearchParams({
                          ...(category !== 'All' && { category }),
                          ...(collection && { collection }),
                          ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                          ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                          ...(rating !== undefined && { rating: rating.toString() }),
                          sortBy,
                          view: 'list',
                        }).toString()}`}
                        role="tab"
                        aria-pressed={view === 'list'}
                        title="List view"
                        className={`p-2.5 border-l-2 border-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 ${view === 'list' ? 'bg-gray-900 text-white' : 'bg-transparent text-gray-600 hover:bg-gray-50'}`}
                      >
                        <FiList className="w-5 h-5" aria-hidden />
                        <span className="sr-only">List view</span>
                      </a>
                    </div>
                    
                    <span className="text-sm text-gray-600 font-medium hidden sm:block">
                      {products?.length || 0} of {totalProducts || 0} products
                    </span>
                  </div>
                  
                  {/* Sort Dropdown */}
                  <div className="relative w-full sm:w-auto">
                    <select 
                      defaultValue={sortBy}
                      className="appearance-none bg-white border-2 border-gray-200 rounded-lg pl-4 pr-10 py-2.5 text-sm font-medium focus:outline-none focus:border-black transition-colors w-full"
                    >
                      <option value="featured">Sort by: Featured</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="newest">Newest First</option>
                      <option value="best-selling">Best Selling</option>
                    </select>
                    <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500" />
                  </div>
                </div>

                {/* Active Filters Tags */}
                {(category !== 'All' || collection || minPrice !== undefined || maxPrice !== undefined || rating !== undefined) && (
                  <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-2">
                    {category !== 'All' && (
                      <div className="inline-flex items-center bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        Category: {category}
                        <a 
                          href={`/shop?${new URLSearchParams({
                            ...(collection && { collection }),
                            ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                            ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                            ...(rating !== undefined && { rating: rating.toString() }),
                            sortBy,
                            view,
                          }).toString()}`}
                          className="ml-2 hover:text-gray-300 transition-colors"
                        >
                          ×
                        </a>
                      </div>
                    )}
                    
                    {collection && (
                      <div className="inline-flex items-center bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        {collection}
                        <a 
                          href={`/shop?${new URLSearchParams({
                            ...(category !== 'All' && { category }),
                            ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                            ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                            ...(rating !== undefined && { rating: rating.toString() }),
                            sortBy,
                            view,
                          }).toString()}`}
                          className="ml-2 hover:text-gray-300 transition-colors"
                        >
                          ×
                        </a>
                      </div>
                    )}
                    
                    {(minPrice !== undefined || maxPrice !== undefined) && (
                      <div className="inline-flex items-center bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        ${minPrice !== undefined ? minPrice : 0} - ${maxPrice !== undefined ? maxPrice : '∞'}
                        <a 
                          href={`/shop?${new URLSearchParams({
                            ...(category !== 'All' && { category }),
                            ...(collection && { collection }),
                            ...(rating !== undefined && { rating: rating.toString() }),
                            sortBy,
                            view,
                          }).toString()}`}
                          className="ml-2 hover:text-gray-300 transition-colors"
                        >
                          ×
                        </a>
                      </div>
                    )}
                    
                    {rating !== undefined && (
                      <div className="inline-flex items-center bg-gray-900 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                        {rating}+ ⭐
                        <a 
                          href={`/shop?${new URLSearchParams({
                            ...(category !== 'All' && { category }),
                            ...(collection && { collection }),
                            ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                            ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                            sortBy,
                            view,
                          }).toString()}`}
                          className="ml-2 hover:text-gray-300 transition-colors"
                        >
                          ×
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Premium Banner */}
              {(category === 'All' || category === 'Premium') && (
                <div className="mb-8">
                  <div className="relative overflow-hidden bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white p-8 rounded-2xl shadow-lg">
                    <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
                      <div className="text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Premium Collection</h3>
                        <p className="text-gray-300 text-lg">Exclusive designs with premium craftsmanship</p>
                      </div>
                      <a 
                        href="/shop?category=Premium"
                        className="border-2 border-white px-8 py-3 font-bold rounded-lg hover:bg-white hover:text-black transition-all whitespace-nowrap shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                      >
                        Explore Premium →
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Products Grid */}
              <section className="mb-12">
                <div className={`grid gap-6 ${view === 'list' ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'}`}>
                  {Array.isArray(products) && products.length > 0 ? (
                    products.map((product, index) => (
                      <div key={product._id || product.id} className="group relative">
                        {index < 2 && (
                          <div className="absolute z-10 top-3 left-3 bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            ⭐ Featured
                          </div>
                        )}
                        
                        <ProductCard 
                          product={product}
                          variant={view === 'list' ? 'detailed' : 'standard'}
                          showQuickView
                        />
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-20">
                      <div className="text-6xl mb-6 text-gray-300">🔍</div>
                      <h3 className="text-2xl font-bold mb-3 text-gray-900">No Products Found</h3>
                      <p className="text-gray-600 mb-6 text-lg">Try adjusting your filters or check back later.</p>
                      <a 
                        href="/shop"
                        className="inline-block px-8 py-3 border-2 border-black rounded-lg hover:bg-black hover:text-white transition-all font-semibold"
                      >
                        Clear All Filters
                      </a>
                    </div>
                  )}
                </div>
              </section>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-sm">
                      <span className="text-gray-600">Page </span>
                      <span className="font-bold text-lg">{page || 1}</span>
                      <span className="text-gray-600"> of </span>
                      <span className="font-bold text-lg">{totalPages}</span>
                    </div>
                    
                    <Pagination 
                      page={page || 1} 
                      total={totalPages}
                      variant="standard"
                      showNumbers
                      baseUrl={`/shop?${new URLSearchParams({
                        ...(category !== 'All' && { category }),
                        ...(collection && { collection }),
                        ...(minPrice !== undefined && { minPrice: minPrice.toString() }),
                        ...(maxPrice !== undefined && { maxPrice: maxPrice.toString() }),
                        ...(rating !== undefined && { rating: rating.toString() }),
                        sortBy,
                        view,
                      }).toString()}`}
                    />
                    
                    <div className="text-sm text-gray-600">
                      Showing <span className="font-bold text-black">{(products?.length || 0)}</span> of <span className="font-bold text-black">{totalProducts || 0}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Category Quick Links */}
              <div className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-center">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { name: 'Casual', count: 24, description: 'Everyday essentials', emoji: '👕' },
                    { name: 'Daily Wear', count: 18, description: 'Comfort & style', emoji: '👔' },
                    { name: 'Embroidered', count: 12, description: 'Artisanal details', emoji: '🎨' },
                    { name: 'Premium', count: 8, description: 'Luxury craftsmanship', emoji: '✨' }
                  ].map((cat) => (
                    <a 
                      key={cat.name}
                      href={`/shop?category=${cat.name}`}
                      className={`group border-2 p-6 rounded-xl hover:border-black hover:shadow-lg transition-all cursor-pointer block transform hover:-translate-y-1 ${category === cat.name ? 'border-black bg-gray-50 shadow-md' : 'border-gray-200 bg-white'}`}
                    >
                      <div className="text-3xl mb-3">{cat.emoji}</div>
                      <h3 className="font-bold mb-2 text-lg group-hover:text-black transition-colors">{cat.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{cat.description}</p>
                      <div className="text-xs font-semibold text-gray-500">{cat.count} items</div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <section className="mt-20 border-t border-gray-200 pt-16">
            <div className="max-w-2xl mx-auto text-center bg-gradient-to-br from-gray-50 to-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-3xl font-bold mb-4 text-gray-900">Stay Updated</h2>
              <p className="text-gray-600 mb-8 text-lg">
                Subscribe to receive updates on new arrivals, exclusive offers, and style insights.
              </p>
              <form className="flex max-w-md mx-auto gap-3">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 border-2 border-gray-200 px-5 py-3.5 rounded-lg focus:outline-none focus:border-black transition-colors"
                  required
                />
                <button 
                  type="submit"
                  className="bg-black text-white px-8 py-3.5 font-bold rounded-lg hover:bg-gray-800 transition-all whitespace-nowrap shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Subscribe
                </button>
              </form>
              <p className="text-xs text-gray-500 mt-5">
                By subscribing, you agree to our Privacy Policy and consent to receive updates.
              </p>
            </div>
          </section>
        </div>
        <Footer/>
      </main>
      );
    } finally {
      console.error = _origConsoleError;
    }
  } catch (err) {
    console.error = _origConsoleError;
    return <ErrorClient message="Failed to fetch products. Please try again." />;
  }
}