import { Skeleton } from '@/components/ui/skeleton';

/**
 * ProductCardSkeleton - Loading state for product cards
 * Shows shimmer effect while product data is loading
 */
export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm">
      {/* Image skeleton */}
      <Skeleton className="aspect-[3/4] w-full" />
      
      {/* Content skeleton */}
      <div className="p-5 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex items-center justify-between pt-2">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * ProductListSkeleton - Shows multiple product card skeletons
 * @param {number} count - Number of skeleton cards to display
 */
export function ProductListSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}

/**
 * ProductDetailSkeleton - Loading state for product detail page
 */
export function ProductDetailSkeleton() {
  return (
    <div className="container py-12">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery skeleton */}
        <div className="space-y-4">
          <Skeleton className="aspect-square w-full rounded-lg" />
          <div className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <aside className="space-y-6">
          <div>
            <Skeleton className="h-10 w-3/4 mb-3" />
            <Skeleton className="h-8 w-32" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
          
          <div className="space-y-3">
            <Skeleton className="h-5 w-24" />
            <div className="flex gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-16" />
              ))}
            </div>
          </div>
          
          <Skeleton className="h-20 w-full rounded-lg" />
        </aside>
      </div>
    </div>
  );
}

/**
 * SectionSkeleton - Generic skeleton for page sections
 * @param {string} className - Additional CSS classes
 */
export function SectionSkeleton({ className = '' }) {
  return (
    <div className={`py-20 ${className}`}>
      <div className="container px-6">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <Skeleton className="h-10 w-64 mx-auto" />
          <Skeleton className="h-5 w-96 mx-auto" />
        </div>

        {/* Content grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="aspect-[3/4] w-full rounded-lg" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-5 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * CollectionCardSkeleton - Loading state for collection cards
 */
export function CollectionCardSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-lg bg-white shadow-sm">
      <Skeleton className="aspect-[3/4] w-full" />
      <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
        <Skeleton className="h-6 w-3/4 bg-gray-400" />
        <Skeleton className="h-4 w-full bg-gray-400" />
      </div>
    </div>
  );
}

/**
 * TestimonialSkeleton - Loading state for testimonials
 */
export function TestimonialSkeleton() {
  return (
    <div className="bg-gray-50 rounded-lg p-8 space-y-4">
      <div className="flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-5 w-5 rounded-full" />
        ))}
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex items-center gap-3 pt-2">
        <Skeleton className="h-12 w-12 rounded-full" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-3 w-24" />
        </div>
      </div>
    </div>
  );
}

/**
 * HeroSkeleton - Loading state for hero section
 */
export function HeroSkeleton() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-100">
      <div className="container px-6">
        <div className="max-w-2xl space-y-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <div className="flex gap-4">
            <Skeleton className="h-14 w-36 rounded-md" />
            <Skeleton className="h-14 w-40 rounded-md" />
          </div>
        </div>
      </div>
    </section>
  );
}
