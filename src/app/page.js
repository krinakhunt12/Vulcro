import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import LazySection from '@/components/LazySection';
import products from '@/data/products';
import Hero from '@/components/Hero';
import FeaturedCollections from '@/components/FeaturedCollections';
import BrandStory from '@/components/BrandStory';
import Testimonials from '@/components/Testimonials';
import SiteFooter from '@/components/SiteFooter';
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
    <Hero/>
      {/* Featured Collections (extracted to component) */}
      <FeaturedCollections collections={featuredCollections} />

      {/* Best Sellers - Lazy loaded with dynamic import */}
      <BestSellers />

      {/* New Arrivals - Lazy loaded with dynamic import */}
      <NewArrivals />

      {/* Brand Story (extracted to component) */}
      <BrandStory />

      {/* Customer Testimonials (extracted to component) */}
      <Testimonials testimonials={testimonials} />

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

      {/* Footer (extracted to SiteFooter component) */}
      <SiteFooter year={year} />
    </div>
  );
}
