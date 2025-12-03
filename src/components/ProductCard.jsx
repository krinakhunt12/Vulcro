import Image from 'next/image';

/**
 * ProductCard Component with Optimized Lazy Loading
 * 
 * Features:
 * - Uses Next.js Image component for automatic optimization
 * - Lazy loading enabled by default (loading="lazy")
 * - Automatic image sizing and format optimization
 * - Responsive image loading based on viewport
 */
export default function ProductCard({ product, tag, priority = false }) {
  // Support both legacy product shape and DB-backed shape
  const id = product._id || product.id;
  const title = product.name || product.title;
  const badge = tag || product?.tag;

  return (
    <a href={`/product/${id}`} className="card p-4 block">
      <div className="relative product-image h-64 w-full overflow-hidden rounded-lg bg-[--surface]">
        {badge ? (
          <span className="absolute top-3 left-3 bg-[--primary] text-white text-xs px-3 py-1 rounded-full z-10">
            {badge}
          </span>
        ) : null}

        {/* Next.js Image with lazy loading */}
        <Image
          src={product.images?.[0] || product.image}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading={priority ? 'eager' : 'lazy'} // Lazy load by default, eager for above-fold
          quality={85}
        />
      </div>

      <h2 className="mt-3 text-lg font-semibold">{title}</h2>

      <p className="text-sm text-[--muted] mt-2 line-clamp-2">{product.description}</p>

      <div className="mt-4 flex items-center justify-between">
        <div className="price-badge text-lg">₹{product.price}</div>
        <div>
          <button className="btn btn-outline">View</button>
        </div>
      </div>
    </a>
  );
}
