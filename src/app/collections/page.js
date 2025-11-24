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
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Collections</h1>
        <p className="text-gray-600 mt-2">Explore our curated collections from Surat — crafted with care.</p>
      </div>

      <div className="grid gap-12">
        {collections.map((c) => (
          <Link key={c.slug} href={`/collections/${c.slug}`} className="block">
            <CollectionBanner title={c.title} subtitle={c.subtitle} image={c.image} />
          </Link>
        ))}
      </div>
    </main>
  );
}
