import Link from 'next/link';
import CollectionBanner from '@/components/CollectionBanner';
import Footer from '@/components/SiteFooter';
export const metadata = {
  title: 'Collections - VULCRO',
  description: 'Explore premium kurti collections from Surat featuring handcrafted embroidery, modern silhouettes, and ethical production.',
};

const collections = [
  {
    slug: 'premium-embroidered',
    title: 'Premium Embroidered Kurtis',
    subtitle: 'Intricate zardozi, mirror work and fine threadwork — luxury crafted in Surat.',
    image: 'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=1600&q=80',
    count: '48 pieces',
    tags: ['Hand Embroidered', 'Silk Fabrics', 'Limited Edition'],
  },
  {
    slug: 'casual-daily',
    title: 'Casual Kurti Collection',
    subtitle: 'Comfort-first designs with soft pastels, breathable cottons and relaxed fits.',
    image: 'https://images.unsplash.com/photo-1562158070-17c4f1b5d4c5?auto=format&fit=crop&w=1600&q=80',
    count: '62 pieces',
    tags: ['Everyday Wear', 'Cotton', 'Wash & Wear'],
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'Contemporary silhouettes with flowing dupattas and modern ethnic styling.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1600&q=80',
    count: '36 pieces',
    tags: ['Just Launched', 'Trend Alert', 'Seasonal'],
  },
  {
    slug: 'occasion-wear',
    title: 'Festival & Occasion Wear',
    subtitle: 'Statement pieces for celebrations with heavy embroidery and rich fabrics.',
    image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=1600&q=80',
    count: '28 pieces',
    tags: ['Festival Ready', 'Heavy Work', 'Special Occasion'],
  },
  {
    slug: 'linen-collection',
    title: 'Linen Essentials',
    subtitle: 'Breathable linen kurtis with minimalist detailing and natural textures.',
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1600&q=80',
    count: '41 pieces',
    tags: ['Sustainable', 'Natural Fibers', 'Minimalist'],
  },
  {
    slug: 'anarkali-silhouettes',
    title: 'Anarkali & Flared',
    subtitle: 'Dramatic flares and regal anarkali cuts for traditional elegance.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1600&q=80',
    count: '34 pieces',
    tags: ['Traditional', 'Flared', 'Floor Length'],
  },
];

const featuredProducts = [
  {
    id: 1,
    name: 'Zari Embroidered Silk Kurti Set',
    description: 'Handcrafted with real zari thread work, featuring a matching dupatta.',
    price: '₹3,899',
    originalPrice: '₹4,999',
    image: 'https://images.unsplash.com/photo-1585487000160-6eb9ce6b5aae?auto=format&fit=crop&w=800&q=80',
    badge: 'Best Seller',
    rating: 4.9,
  },
  {
    id: 2,
    name: 'Cotton Printed Daily Wear Kurti',
    description: 'Lightweight cotton with block print, perfect for everyday elegance.',
    price: '₹1,499',
    originalPrice: '₹1,999',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=800&q=80',
    badge: 'Trending',
    rating: 4.7,
  },
  {
    id: 3,
    name: 'Designer Festive Anarkali Set',
    description: 'Complete festive set with heavy embroidery and ornate detailing.',
    price: '₹5,499',
    originalPrice: '₹6,999',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=80',
    badge: 'Limited Edition',
    rating: 4.9,
  },
];

const stats = [
  { number: '1,000+', label: 'Handcrafted Pieces' },
  { number: '150+', label: 'Artisans Supported' },
  { number: '7', label: 'Collections' },
  { number: '4.8', label: 'Customer Rating' },
];

// Simple SVG icons as inline components
const ChevronRightIcon = () => (
  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
  </svg>
);

const StarIcon = () => (
  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const RibbonIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const HeartIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);

export default function CollectionsPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              Curated Collections
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover handcrafted kurtis from Surat — where traditional craftsmanship meets contemporary design. Each piece tells a story of ethical production and mindful detailing.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="/shop" className="btn btn-primary px-8 py-3 rounded-full text-lg font-medium group inline-flex items-center">
                Shop All Collections
                <ChevronRightIcon />
              </Link>
              <Link href="/about" className="btn btn-outline px-8 py-3 rounded-full text-lg font-medium">
                Our Craftsmanship
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto py-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-16 h-1 bg-black"></div>
                <h2 className="text-2xl font-semibold uppercase tracking-wider text-gray-500">Our Collections</h2>
              </div>
              <h3 className="text-4xl font-bold">Explore By Category</h3>
            </div>
            
            <div className="hidden md:flex items-center gap-4">
              <label className="text-sm font-medium text-gray-600">Sort by:</label>
              <select className="text-sm p-3 rounded-lg border border-gray-300 bg-white min-w-[180px]">
                <option>Featured Collections</option>
                <option>Newest First</option>
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {collections.map((collection) => (
              <Link 
                key={collection.slug} 
                href={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-gray-50 hover:shadow-2xl transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xl font-bold group-hover:text-gray-700 transition-colors">
                      {collection.title}
                    </h4>
                    <span className="text-sm text-gray-500">{collection.count}</span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2">{collection.subtitle}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {collection.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm font-medium text-gray-700 group-hover:text-black transition-colors">
                    Explore Collection
                    <ChevronRightIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Filter Bar */}
          <div className="mb-12 p-6 bg-gray-50 rounded-2xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-lg mb-2">Not sure where to start?</h4>
                <p className="text-gray-600">Browse by popular categories:</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/collections/premium-embroidered" className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-black transition-colors">
                  Embroidered Luxury
                </Link>
                <Link href="/collections/casual-daily" className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-black transition-colors">
                  Casual Wear
                </Link>
                <Link href="/collections/occasion-wear" className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-black transition-colors">
                  Festival Ready
                </Link>
                <Link href="/collections/new-arrivals" className="px-6 py-3 bg-white border border-gray-300 rounded-full hover:border-black transition-colors">
                  New Arrivals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Picks */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <RibbonIcon />
              <span className="text-sm font-medium uppercase tracking-wider text-gray-500">Editor's Selection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Picks</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Our team's favorite selections this season — pieces that define quality and style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 text-xs font-bold bg-black text-white rounded-full">
                        {product.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors">
                        <HeartIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xl font-bold">{product.name}</h4>
                      <div className="flex items-center gap-1">
                        <StarIcon />
                        <span className="font-medium">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-2xl font-bold">{product.price}</span>
                        <span className="text-gray-400 line-through ml-2">{product.originalPrice}</span>
                      </div>
                      <span className="px-3 py-1 text-sm font-medium bg-green-100 text-green-800 rounded-full">
                        Save 22%
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 btn btn-primary py-3 rounded-lg font-medium">
                        Add to Cart
                      </button>
                      <button className="px-4 py-3 border border-gray-300 rounded-lg hover:border-black transition-colors">
                        Quick View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Crafted with Care,<br />Worn with Pride
            </h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Each VULCRO piece is thoughtfully designed and ethically produced in Surat, supporting local artisans while bringing you premium quality kurtis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/about" className="px-8 py-4 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition-colors">
                Learn About Our Craft
              </Link>
              <Link href="/shop" className="px-8 py-4 border-2 border-white font-medium rounded-full hover:bg-white/10 transition-colors">
                Browse All Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
            <p className="text-gray-600 mb-8">
              Be the first to know about new collections, exclusive offers, and styling tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-full focus:outline-none focus:border-black transition-colors"
              />
              <button type="submit" className="px-8 py-4 bg-black text-white font-medium rounded-full hover:bg-gray-800 transition-colors">
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
      <Footer/>
    </main>
  );
}