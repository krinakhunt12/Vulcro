/**
 * ===================================================================
 * LAZY LOADING IMPLEMENTATION GUIDE
 * ===================================================================
 * 
 * This file demonstrates all lazy loading techniques implemented
 * in the VULCRO ecommerce project for optimal performance.
 */

// ===================================================================
// 1. DYNAMIC COMPONENT IMPORT (next/dynamic)
// ===================================================================

/**
 * Use Case: Load heavy React components only when needed
 * Benefits: Reduces initial bundle size, faster first paint
 * Best For: Components below the fold, modals, complex UI sections
 */

import dynamic from 'next/dynamic';

// Example 1: Basic dynamic import
const HeavyComponent = dynamic(() => import('@/components/HeavyComponent'));

// Example 2: With loading skeleton
const BestSellers = dynamic(() => import('@/components/BestSellers'), {
  loading: () => <div className="h-96 animate-pulse bg-gray-200"></div>,
  ssr: true, // Keep server-side rendering for SEO
});

// Example 3: Client-side only (no SSR)
const ShopFilters = dynamic(() => import('@/components/ShopFilters'), {
  ssr: false, // Only loads on client - good for interactive components
});

// Example 4: Named export import
const SpecificComponent = dynamic(() => 
  import('@/components/MultiExport').then(mod => mod.SpecificComponent)
);


// ===================================================================
// 2. IMAGE LAZY LOADING (next/image)
// ===================================================================

/**
 * Use Case: Optimize image loading across the site
 * Benefits: Automatic format optimization, responsive images, lazy loading
 * Best For: All images except hero/LCP images
 */

import Image from 'next/image';

// Example 1: Hero image (above fold - load immediately)
function HeroSection() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero"
      width={1920}
      height={1080}
      priority // Load immediately - critical for LCP
      quality={95}
    />
  );
}

// Example 2: Product image (below fold - lazy load)
function ProductImage() {
  return (
    <Image
      src="/product.jpg"
      alt="Product"
      width={800}
      height={1067}
      loading="lazy" // Lazy load when near viewport
      quality={85}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
    />
  );
}

// Example 3: Gallery with conditional priority
function Gallery({ images, activeIndex }) {
  return images.map((img, i) => (
    <Image
      key={i}
      src={img}
      alt={`Gallery ${i}`}
      fill
      loading={i === activeIndex ? 'eager' : 'lazy'} // Active image loads first
      priority={i === 0} // First image gets priority
    />
  ));
}


// ===================================================================
// 3. INTERSECTION OBSERVER HOOK (useLazyLoad)
// ===================================================================

/**
 * Use Case: Load content when it enters the viewport
 * Benefits: Fine control over when content loads
 * Best For: Sections below fold, infinite scroll, heavy widgets
 */

'use client';
import { useLazyLoad, useInView } from '@/hooks/useLazyLoad';

// Example 1: Basic usage with isIntersecting
function LazyWidget() {
  const { ref, isIntersecting } = useLazyLoad({
    rootMargin: '100px', // Start loading 100px before entering viewport
    threshold: 0.1, // Trigger when 10% visible
  });

  return (
    <div ref={ref}>
      {isIntersecting ? (
        <ComplexWidget />
      ) : (
        <WidgetSkeleton />
      )}
    </div>
  );
}

// Example 2: Simple visibility check
function TestimonialsSection() {
  const { ref, isVisible } = useInView({ rootMargin: '50px' });

  return (
    <section ref={ref}>
      {isVisible && <TestimonialsCarousel />}
    </section>
  );
}

// Example 3: Load once and keep loaded
function ReviewsSection() {
  const { ref, hasIntersected } = useLazyLoad({
    triggerOnce: true, // Only load once, never unload
  });

  return (
    <div ref={ref}>
      {hasIntersected && <CustomerReviews />}
    </div>
  );
}


// ===================================================================
// 4. LAZY SECTION WRAPPER
// ===================================================================

/**
 * Use Case: Reusable wrapper for any section
 * Benefits: Consistent loading behavior, easy to apply
 * Best For: Standardized section loading
 */

import LazySection from '@/components/LazySection';
import { ProductListSkeleton } from '@/components/skeletons';

function HomePage() {
  return (
    <>
      <HeroSection /> {/* Above fold - loads immediately */}
      
      {/* Below fold - lazy loads with skeleton */}
      <LazySection fallback={<ProductListSkeleton count={4} />}>
        <BestSellers />
      </LazySection>

      <LazySection>
        <Testimonials />
      </LazySection>
    </>
  );
}


// ===================================================================
// 5. SKELETON COMPONENTS
// ===================================================================

/**
 * Use Case: Loading states that match final content
 * Benefits: Better perceived performance, smooth transitions
 * Best For: All lazy-loaded content
 */

import {
  ProductCardSkeleton,
  ProductListSkeleton,
  ProductDetailSkeleton,
  SectionSkeleton,
  CollectionCardSkeleton,
  TestimonialSkeleton,
  HeroSkeleton
} from '@/components/skeletons';

// Example: Product grid loading state
function ProductGrid({ loading, products }) {
  if (loading) {
    return <ProductListSkeleton count={8} />;
  }
  
  return (
    <div className="grid grid-cols-4 gap-6">
      {products.map(p => <ProductCard key={p.id} product={p} />)}
    </div>
  );
}


// ===================================================================
// 6. COMPLETE PAGE EXAMPLE
// ===================================================================

/**
 * Full implementation showing all techniques together
 */

import dynamic from 'next/dynamic';
import Image from 'next/image';
import LazySection from '@/components/LazySection';
import { ProductListSkeleton, SectionSkeleton } from '@/components/skeletons';

// Lazy load heavy components
const Newsletter = dynamic(() => import('@/components/Newsletter'), {
  loading: () => <SectionSkeleton />,
  ssr: false,
});

const Footer = dynamic(() => import('@/components/Footer'), {
  ssr: true, // Keep SSR for SEO (footer has important links)
});

export default function OptimizedPage() {
  return (
    <div>
      {/* Hero - Above fold, loads immediately */}
      <section className="hero">
        <Image
          src="/hero.jpg"
          alt="Hero"
          width={1920}
          height={1080}
          priority // Critical for LCP
          quality={95}
        />
      </section>

      {/* Featured Products - Lazy loaded component */}
      <LazySection fallback={<ProductListSkeleton count={4} />}>
        <FeaturedProducts />
      </LazySection>

      {/* Newsletter - Dynamic import (client-side only) */}
      <Newsletter />

      {/* Footer - Dynamic import (with SSR) */}
      <Footer />
    </div>
  );
}


// ===================================================================
// 7. PERFORMANCE BEST PRACTICES
// ===================================================================

/**
 * ✅ DO:
 * - Use priority/eager loading for hero images (LCP)
 * - Lazy load images below the fold
 * - Use dynamic imports for heavy components
 * - Provide skeleton loaders for better UX
 * - Keep SEO-critical components with SSR
 * - Use appropriate rootMargin (100-200px)
 * 
 * ❌ DON'T:
 * - Lazy load hero/LCP images
 * - Over-lazy-load (causes layout shift)
 * - Skip loading states (causes blank screens)
 * - Disable SSR for SEO-critical content
 * - Use rootMargin too large (loads too early)
 */


// ===================================================================
// 8. MEASURING PERFORMANCE
// ===================================================================

/**
 * Test your implementation:
 * 
 * 1. Lighthouse Score:
 *    - Run: npm run build && npm run start
 *    - Open Chrome DevTools > Lighthouse
 *    - Check: Performance, LCP, CLS scores
 * 
 * 2. Network Tab:
 *    - Open DevTools > Network
 *    - Throttle to "Fast 3G"
 *    - Verify images/components load on scroll
 * 
 * 3. Bundle Analysis:
 *    - Run: npm run build
 *    - Check .next/analyze/client.html
 *    - Verify code splitting is working
 */


// ===================================================================
// 9. TROUBLESHOOTING
// ===================================================================

/**
 * Common Issues & Solutions:
 * 
 * Issue: Images don't lazy load
 * Solution: Check loading="lazy" is set, ensure not in viewport initially
 * 
 * Issue: Components flash/flicker
 * Solution: Add proper skeleton loaders
 * 
 * Issue: SEO content missing
 * Solution: Keep ssr: true for dynamic imports
 * 
 * Issue: Intersection Observer not supported
 * Solution: Hook has built-in fallback (loads immediately)
 * 
 * Issue: Too many re-renders
 * Solution: Use triggerOnce: true for one-time loads
 */

