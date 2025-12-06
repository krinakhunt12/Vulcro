import Link from 'next/link';
import CollectionBanner from '@/components/CollectionBanner';

export const metadata = {
  title: 'Collections - VULCRO',
};

const collections = [
  {
    slug: 'premium-embroidered',
    title: 'Premium Embroidered Kurtis',
    subtitle: 'Close-up embroidery, mirror work and fine threadwork — luxury crafted in Surat.',
    image: 'https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'casual-daily',
    title: 'Casual Kurti Collection',
    subtitle: 'Cheerful, everyday kurtis with soft pastels and comfortable cuts.',
    image: 'https://images.unsplash.com/photo-1562158070-17c4f1b5d4c5?auto=format&fit=crop&w=1200&q=80',
  },
  {
    slug: 'new-arrivals',
    title: 'New Arrivals',
    subtitle: 'Fresh silhouettes with flowing dupattas and modern ethnic styling.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1200&q=80',
  },
];

export default function CollectionsPage() {
  return (
    <main className="container py-12">
      <header className="mb-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Collections</h1>
          <p className="text-gray-600 mt-2 max-w-2xl">
            Explore our curated collections from Surat — handcrafted kurtis and coordinating sets highlighting thoughtful details, premium fabrics and mindful production.
          </p>
        </div>

        {/* Filters / quick nav */}
        <div className="flex flex-wrap items-center gap-3 mt-6">
          <div className="text-sm text-[--muted]">Browse:</div>
          <Link href="/collections/premium-embroidered" className="text-sm btn btn-ghost px-3 py-2 rounded-md">Embroidered</Link>
          <Link href="/collections/casual-daily" className="text-sm btn btn-ghost px-3 py-2 rounded-md">Casual</Link>
          <Link href="/collections/new-arrivals" className="text-sm btn btn-ghost px-3 py-2 rounded-md">New Arrivals</Link>

          <div className="ml-auto flex items-center gap-3">
            <label className="text-sm text-[--muted]">Sort</label>
            <select className="text-sm p-2 rounded-md border border-gray-200 bg-white">
              <option>Featured</option>
              <option>Newest</option>
              <option>Price: Low → High</option>
            </select>
          </div>
        </div>
      </header>

      <section aria-labelledby="collections-list" className="grid gap-12">
        <h2 id="collections-list" className="sr-only">Collections list</h2>

        {collections.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="block">
            <CollectionBanner title={c.title} subtitle={c.subtitle} image={c.image} />
          </Link>
        ))}
      </section>

      {/* Featured picks */}
      <section aria-labelledby="featured-picks" className="mt-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-[--primary]"></div>
          <h3 id="featured-picks" className="text-2xl font-bold">Featured Picks</h3>
          <div className="flex-1 h-0.5 bg-gray-200"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Lightweight product cards using the theme */}
          {[1,2,3].map((i) => (
            <article key={i} className="rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
              <Link href="/shop" className="block">
                <div className="w-full h-56 bg-gray-100 overflow-hidden">
                  <img src={`https://images.unsplash.com/photo-1520975917459-4a6f8e4f7f49?auto=format&fit=crop&w=1200&q=80&ixid=${i}`} alt={`Featured product ${i}`} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <div className="font-medium text-gray-800">Featured kurti set {i}</div>
                  <div className="text-sm text-[--muted] mt-2">A carefully selected piece from our atelier — limited availability.</div>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-lg font-semibold">₹2,499</div>
                    <button className="btn btn-primary px-4 py-2 rounded-md">Quick view</button>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Explore all CTA */}
      <section className="mt-12 text-center">
        <p className="text-[--muted] mb-4">Want to see everything? Browse the full shop for more styles and sizes.</p>
        <Link href="/shop">
          <button className="btn btn-primary px-8 py-3 rounded-lg">Shop All Collections</button>
        </Link>
      </section>
    </main>
  );
}
