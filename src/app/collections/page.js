"use client";

import Link from 'next/link';
import CollectionBanner from '@/components/CollectionBanner';
import Footer from '@/components/SiteFooter';
import { useRouter } from 'next/navigation';

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

const SparkleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

export default function CollectionsPage() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section - Fixed navbar spacing */}
      <section className="relative pt-32 pb-20 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full blur-3xl opacity-30"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white rounded-full shadow-md border border-gray-100">
              <SparkleIcon />
              <span className="text-sm font-semibold text-gray-700">Premium Handcrafted Collections</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 bg-clip-text text-transparent">
              Curated Collections
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed">
              Discover handcrafted kurtis from Surat — where traditional craftsmanship meets contemporary design. Each piece tells a story of ethical production and mindful detailing.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button onClick={() => router.push('/shop')} className="inline-flex items-center px-8 py-4 bg-black text-white rounded-full text-lg font-bold shadow-lg hover:shadow-xl hover:bg-gray-900 transition-all transform hover:-translate-y-0.5">
                Shop All Collections
                <ChevronRightIcon />
              </button>
              <button onClick={() => router.push('/about')} className="inline-flex items-center px-8 py-4 border-2 border-black text-black rounded-full text-lg font-bold hover:bg-black hover:text-white transition-all transform hover:-translate-y-0.5">
                Our Craftsmanship
              </button>
            </div>
          </div>

          {/* Stats - Enhanced Design */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl hover:scale-105 transition-all">
                <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-20 h-1.5 bg-gradient-to-r from-black to-gray-400 rounded-full"></div>
                <h2 className="text-xl font-bold uppercase tracking-wider text-gray-500">Our Collections</h2>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900">Explore By Category</h3>
              <p className="text-gray-600 text-lg max-w-2xl">
                Each collection is thoughtfully curated to bring you the finest in ethnic wear
              </p>
            </div>
            
            <div className="flex items-center gap-4 bg-white border-2 border-gray-200 rounded-xl px-4 py-3 shadow-sm">
              <label className="text-sm font-bold text-gray-700">Sort by:</label>
              <select className="text-sm font-medium bg-transparent focus:outline-none cursor-pointer">
                <option>Featured Collections</option>
                <option>Newest First</option>
                <option>Most Popular</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {collections.map((collection, index) => (
              <Link 
                key={collection.slug} 
                href={`/collections/${collection.slug}`}
                className="group relative overflow-hidden rounded-3xl bg-white border-2 border-gray-100 hover:border-gray-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 right-4 bg-white px-3 py-1.5 rounded-full shadow-lg">
                    <span className="text-xs font-bold text-gray-900">{collection.count}</span>
                  </div>
                  
                  {/* Index Number */}
                  <div className="absolute top-4 left-4 w-12 h-12 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-2xl font-bold mb-3 group-hover:text-gray-700 transition-colors">
                    {collection.title}
                  </h4>
                  
                  <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                    {collection.subtitle}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {collection.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1.5 text-xs font-bold bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm font-bold text-gray-900 group-hover:gap-2 transition-all">
                    Explore Collection
                    <ChevronRightIcon />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Filter Bar - Enhanced */}
          <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 rounded-3xl shadow-2xl">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h4 className="font-bold text-2xl mb-2">Not sure where to start?</h4>
                <p className="text-gray-300 text-lg">Browse by popular categories</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => router.push('/collections/premium-embroidered')} className="px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:-translate-y-0.5 shadow-lg">
                  ✨ Embroidered Luxury
                </button>
                <button onClick={() => router.push('/collections/casual-daily')} className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 font-bold rounded-full hover:bg-white/20 transition-all">
                  👕 Casual Wear
                </button>
                <button onClick={() => router.push('/collections/occasion-wear')} className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 font-bold rounded-full hover:bg-white/20 transition-all">
                  🎉 Festival Ready
                </button>
                <button onClick={() => router.push('/collections/new-arrivals')} className="px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/30 font-bold rounded-full hover:bg-white/20 transition-all">
                  🆕 New Arrivals
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Picks */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6 px-5 py-2.5 bg-white rounded-full shadow-lg border border-gray-100">
              <RibbonIcon />
              <span className="text-sm font-bold uppercase tracking-wider text-gray-700">Editor's Selection</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Featured Picks
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-xl leading-relaxed">
              Our team's favorite selections this season — pieces that define quality and style
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 h-full border-2 border-gray-100 hover:border-gray-300 transform hover:-translate-y-2">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 text-xs font-bold bg-gradient-to-r from-black to-gray-800 text-white rounded-full shadow-lg">
                        {product.badge}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <button className="p-3 bg-white/95 backdrop-blur-sm rounded-full hover:bg-white hover:scale-110 transition-all shadow-lg">
                        <HeartIcon />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-xl font-bold leading-tight flex-1">{product.name}</h4>
                      <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full ml-2">
                        <StarIcon />
                        <span className="font-bold text-sm">{product.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-600 mb-5 line-clamp-2 leading-relaxed">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <span className="text-3xl font-bold text-gray-900">{product.price}</span>
                        <span className="text-gray-400 line-through ml-2 text-sm">{product.originalPrice}</span>
                      </div>
                      <span className="px-3 py-1.5 text-sm font-bold bg-green-100 text-green-800 rounded-full">
                        Save 22%
                      </span>
                    </div>
                    
                    <div className="flex gap-3">
                      <button className="flex-1 bg-black text-white py-3.5 rounded-xl font-bold hover:bg-gray-900 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                        Add to Cart
                      </button>
                      <button className="px-5 py-3.5 border-2 border-gray-300 rounded-xl hover:border-black hover:bg-gray-50 transition-all font-semibold">
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
      <section className="relative py-24 px-4 bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        {/* Decorative Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"></div>

        <div className="container mx-auto relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
              Crafted with Care,<br />Worn with Pride
            </h2>
            <p className="text-gray-300 text-xl mb-10 leading-relaxed">
              Each VULCRO piece is thoughtfully designed and ethically produced in Surat, supporting local artisans while bringing you premium quality kurtis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/about')}
                className="px-10 py-5 bg-white text-[#111827] font-bold rounded-full hover:bg-gray-100 transition-all shadow-2xl hover:shadow-xl transform hover:-translate-y-1 text-lg z-20 inline-block text-center"
              >
                Learn About Our Craft
              </button>
              <button
                onClick={() => router.push('/shop')}
                className="px-10 py-5 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all backdrop-blur-sm text-lg z-20 inline-block text-center"
              >
                Browse All Collections
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-100 p-10 md:p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-900 to-gray-700 rounded-full mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Stay Updated</h3>
              <p className="text-gray-600 text-lg mb-8 max-w-xl mx-auto">
                Be the first to know about new collections, exclusive offers, and styling tips
              </p>
              
              <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-full focus:outline-none focus:border-black transition-all text-lg"
                  required
                />
                <button type="submit" className="px-10 py-4 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 whitespace-nowrap">
                  Subscribe Now
                </button>
              </form>
              
              <p className="text-sm text-gray-500 mt-6">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer/>
    </main>
  );
}