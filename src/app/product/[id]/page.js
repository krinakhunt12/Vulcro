import dynamic from 'next/dynamic';
import Gallery from '@/components/Gallery';
import SizeChartModal from '@/components/SizeChartModal';
import QuantitySelector from '@/components/QuantitySelector';
import AddToCartButton from '@/components/AddToCartButton';
import WishlistButton from '@/components/WishlistButton';
import ErrorClient from '@/components/ErrorClient';
import { notFound } from 'next/navigation';

// Server-side DB helpers
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';
import mongoose from 'mongoose';

// NOTE: This page is a Server Component (async) and fetches product data
// from the internal API route. For production, set `NEXT_PUBLIC_APP_URL`
// to your canonical origin (e.g. https://example.com). Falling back to
// localhost for local development.
const ORIGIN = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

/**
 * Lazy load RelatedProducts component
 * This section is below the fold and can be loaded after main content
 * ssr: true maintains SEO benefits while reducing initial bundle size
 */
const RelatedProducts = dynamic(() => import('@/components/RelatedProducts'), {
  loading: () => (
    <div className="mt-16 py-12">
      <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-[3/4] bg-gray-200 rounded animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ))}
      </div>
    </div>
  ),
  ssr: true, // Keep SSR for SEO - related products are important for crawlers
});

export default async function ProductDetails({ params }) {
  // `params` can be a Promise in some Next/Turbopack setups. Await it
  // so we can safely access `params.id` without triggering the runtime
  // error: "params is a Promise and must be unwrapped with await".
  const resolvedParams = await params;
  // Normalize params which can be: { id: '123' } | { id: ['123'] } | undefined
  let idRaw = resolvedParams?.id ?? null;
  if (Array.isArray(idRaw)) {
    // If the dynamic segment produced an array (catch-all or similar),
    // use the last segment as the id.
    idRaw = idRaw.length > 0 ? idRaw[idRaw.length - 1] : null;
  }
  const id = typeof idRaw === 'string' && idRaw.trim().length > 0 ? idRaw : null;

  if (!id) {
    // For server components, prefer to throw a 404 so the router can handle it.
    notFound();
  }
  // Wrap the remaining server-side work in a broad try/catch to prevent
  // unhandled server errors from bubbling to Next's dev overlay which will
  // attempt to parse source maps for the stack frames (this can produce
  // the "Invalid source map" noise). We still use `notFound()` above for
  // missing ids so that remains unchanged.
  try {
    // Prefer direct DB lookup from the server for reliability and to avoid
    // internal HTTP requests during SSR. If no DB is configured, fall back
    // to the internal API route which has its own local-data fallback.
    let product = null;

    if (process.env.MONGODB_URI) {
      try {
        await dbConnect();

        // Try ObjectId lookup first
        if (mongoose.Types.ObjectId.isValid(id)) {
          product = await Product.findById(id).lean();
        }

        // If not found, try matching by string _id or a custom id field
        if (!product) {
          product = await Product.findOne({ $or: [{ _id: id }, { id }] }).lean();
        }
      } catch (e) {
        console.warn('Server-side product lookup failed, falling back to API:', e?.message);
        product = null;
      }
    }

    // If DB not configured or product still not found, fall back to internal API
    if (!product) {
      try {
        const res = await fetch(`${ORIGIN}/api/products/${id}`, { cache: 'no-store' });
        if (!res.ok) {
          const payload = await res.json().catch(() => ({}));
          return <ErrorClient message={payload?.message || 'Product not found'} />;
        }
        const json = await res.json();
        product = json?.product;
      } catch (e) {
        console.warn('Fallback API fetch failed:', e?.message);
        return <ErrorClient message="Failed to fetch product. Please try again." />;
      }
    }

    if (!product) {
      return <ErrorClient message="Product not found" />;
    }

    // Convert product to a plain JSON-safe object before passing to
    // Client Components. Mongoose/BSON types (ObjectId, Date) can have
    // toJSON methods or nested buffers which the App Router disallows.
    const safeProduct = {
      ...product,
      _id: product._id ? String(product._id) : undefined,
      createdAt: product.createdAt ? new Date(product.createdAt).toISOString() : undefined,
      updatedAt: product.updatedAt ? new Date(product.updatedAt).toISOString() : undefined,
    };

    return (
      <main className="container py-12">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <Gallery images={product.images} />
          </div>

          <aside className="space-y-6">
            <div className="">
              <h1 className="text-3xl font-bold">{safeProduct.name}</h1>
              <div className="mt-3 text-lg font-semibold">₹{safeProduct.price}</div>
            </div>

            <div className="text-gray-700">
              <p className="mb-3">{safeProduct.description}</p>

              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-2">Materials</div>
                <div className="flex gap-3 text-sm">
                  {safeProduct.materials?.map((f) => (
                    <div key={f} className="px-3 py-1 border border-gray-100 rounded-md">{f}</div>
                  ))}
                </div>
              </div>

              <div className="mb-2 flex items-center gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-2">Size</div>
                  <div className="flex items-center gap-2">
                    {['S','M','L','XL'].map(s => (
                      <button key={s} className="px-3 py-2 border rounded-md text-sm">{s}</button>
                    ))}
                  </div>
                </div>

                <div className="ml-4 flex items-center gap-3">
                  <SizeChartModal />
                </div>
              </div>
            </div>

            <div className="card p-4 shadow-lg">
              <div className="flex items-center justify-between">
                <QuantitySelector />
                <div className="flex items-center gap-3">
                  {/* Wishlist toggle (client) */}
                  <WishlistButton product={safeProduct} />
                  {/* Client-side add to cart button */}
                  {/* eslint-disable-next-line @next/next/no-async-client-component */}
                  <AddToCartButton product={safeProduct} />
                </div>
              </div>
            </div>

          </aside>
        </div>

        <RelatedProducts />
      </main>
    );
  } catch (err) {
    // Warn instead of erroring so Next's dev overlay doesn't try to parse
    // source maps for this stack trace which can be malformed in dev build
    // artifacts.
    console.warn('Product page render error (caught):', err);
    return <ErrorClient message="An unexpected error occurred. Please try again." />;
  }
}
