import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import LazySection from '@/components/LazySection';
import products from '@/data/products';

/**
 * Lazy-loaded components using next/dynamic
 * These components are loaded only when needed, reducing initial bundle size
 * ssr: false ensures they're only loaded on client-side
 * loading: provides a skeleton/shimmer effect during load
 */
const BestSellers = dynamic(() => import('@/components/BestSellers'), {
  loading: () => <div className="py-20 bg-gray-50"><div className="container px-6"><div className="h-96 animate-pulse bg-gray-200 rounded-lg"></div></div></div>,
  ssr: true, // Keep SSR for SEO
});

const NewArrivals = dynamic(() => import('@/components/NewArrivals'), {
  loading: () => <div className="py-20 bg-white"><div className="container px-6"><div className="h-96 animate-pulse bg-gray-200 rounded-lg"></div></div></div>,
  ssr: true, // Keep SSR for SEO
});

// Note: `LazySection` is a client component (uses IntersectionObserver).
// It's imported directly above so the server component can render the client component wrapper.

export default function Home() {
  const featuredCollections = [
    {
      id: 1,
      title: 'Daily Wear Kurtis',
      description: 'Comfortable & stylish for everyday elegance',
      image: 'https://images.unsplash.com/photo-1583391733981-5aff9b5f3b3f?auto=format&fit=crop&w=800&q=80',
      href: '/collections/daily-wear',
    },
    {
      id: 2,
      title: 'Embroidered Premium Kurtis',
      description: 'Handcrafted embroidery and mirror work',
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
      href: '/collections/embroidered',
    },
    {
      id: 3,
      title: 'Festive Collection',
      description: 'Celebrate in style with rich fabrics',
      image: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80',
      href: '/collections/festive',
    },
    {
      id: 4,
      title: 'Office Wear Kurti Sets',
      description: 'Professional elegance for the modern woman',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      href: '/collections/office-wear',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      review: 'The quality and finish are exceptional. I love how comfortable and elegant these kurtis are!',
      rating: 5,
    },
    {
      id: 2,
      name: 'Anjali Patel',
      review: 'VULCRO has become my go-to brand for traditional wear. Beautiful designs and perfect fit.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Neha Reddy',
      review: 'Impressed with the craftsmanship. Every piece feels premium and lasts beautifully.',
      rating: 5,
    },
  ];

  const bestSellers = products.slice(0, 4);
  const newArrivals = products.slice(4, 8);
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2000&q=80"
            alt="VULCRO Hero - Traditional Kurti"
            fill
            className="object-cover opacity-20 animate-slow-zoom"
            priority // Hero image should load immediately for LCP
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/60"></div>
        </div>
        
        <div className="container relative z-10 px-6">
          <div className="max-w-2xl">
            <p className="text-sm tracking-widest text-gray-700 mb-4 uppercase font-medium animate-fade-in-up" style={{animationDelay: '0.2s'}}>Surat's Finest</p>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 text-black animate-fade-in-up" style={{animationDelay: '0.4s'}}>
              Traditional Kurtis
            </h1>
            <p className="text-xl text-gray-800 mb-8 max-w-xl leading-relaxed animate-fade-in-up" style={{animationDelay: '0.6s'}}>
              Handpicked styles crafted with elegance and comfort. Experience the heritage of Surat craftsmanship.
            </p>
            <div className="flex gap-4 flex-wrap animate-fade-in-up" style={{animationDelay: '0.8s'}}>
              <Link href="/shop" className="inline-block px-8 py-4 bg-white text-gray-800 font-semibold rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                Shop Now
              </Link>
              <Link href="/collections" className="inline-block px-8 py-4 text-black font-semibold rounded-md hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg">
                View Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-black mb-4">Curated Collections</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of traditional kurtis for every occasion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredCollections.map((collection, index) => (
              <Link
                key={collection.id}
                href={collection.href}
                className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    width={800}
                    height={1067}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy" // Lazy load collection images
                    unoptimized
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                  <p className="text-sm text-gray-200 mb-3">{collection.description}</p>
                  <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                    Explore <span className="ml-2">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers - Lazy loaded with dynamic import */}
      <BestSellers />

      {/* New Arrivals - Lazy loaded with dynamic import */}
      <NewArrivals />

      {/* Brand Story */}
      <section className="py-20 bg-gray-50">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <h2 className="text-4xl font-bold text-black mb-6">The VULCRO Story</h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  Born in the textile heart of Surat, VULCRO brings you the finest traditional kurtis crafted with passion and precision. Each piece tells a story of heritage, quality, and timeless elegance.
                </p>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We believe in slow fashion — garments that are made to last, designed to flatter, and crafted with respect for our artisans and the environment.
                </p>
                <div className="grid grid-cols-3 gap-6 mt-8">
                  <div className="text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Premium Quality</p>
                  </div>
                  <div className="text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Handcrafted</p>
                  </div>
                  <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-900">Sustainable</p>
                  </div>
                </div>
              </div>
              <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <Image
                  src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                  alt="VULCRO Craftsmanship"
                  width={800}
                  height={1000}
                  className="rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                  loading="lazy" // Lazy load - below the fold
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-white">
        <div className="container px-6">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl font-bold text-black mb-4">What Our Customers Say</h2>
            <p className="text-gray-600">Real experiences from real women</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-gray-50 rounded-lg p-8 shadow-sm hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{animationDelay: `${index * 0.15}s`}}
              >
                  <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: Math.max(0, Math.round(testimonial.rating || 0)) }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 leading-relaxed italic">"{testimonial.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-black">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="py-16 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
            <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
              Flat 20% Off on Festive Kurtis
            </h2>
            <p className="text-lg text-gray-800 mb-8">
              Celebrate the season in style. Limited time offer on our premium festive collection.
            </p>
            <Link href="/collections/festive" className="inline-block px-10 py-4 bg-gray-100 text-gray-800 font-semibold rounded-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
              Shop Festive Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h3 className="text-2xl font-bold text-black mb-4">VULCRO</h3>
              <p className="text-gray-600 mb-4">
                Surat's finest traditional kurtis crafted with elegance and comfort.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">About</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/about" className="hover:text-black transition-colors">Our Story</Link></li>
                <li><Link href="/about#makers" className="hover:text-black transition-colors">Artisans</Link></li>
                <li><Link href="/about#sustainability" className="hover:text-black transition-colors">Sustainability</Link></li>
                <li><Link href="/about#store" className="hover:text-black transition-colors">Visit Us</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/shop" className="hover:text-black transition-colors">All Products</Link></li>
                <li><Link href="/collections" className="hover:text-black transition-colors">Collections</Link></li>
                <li><Link href="/shop?filter=new" className="hover:text-black transition-colors">New Arrivals</Link></li>
                <li><Link href="/shop?filter=sale" className="hover:text-black transition-colors">Sale</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-black mb-4">Support</h4>
              <ul className="space-y-2 text-gray-600">
                <li><Link href="/contact" className="hover:text-black transition-colors">Contact Us</Link></li>
                <li><Link href="/shipping" className="hover:text-black transition-colors">Shipping Policy</Link></li>
                <li><Link href="/returns" className="hover:text-black transition-colors">Returns & Exchange</Link></li>
                <li><Link href="/faq" className="hover:text-black transition-colors">FAQs</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
            <p>© {year} VULCRO. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="/privacy" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-black transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
