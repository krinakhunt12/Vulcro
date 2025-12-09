import ProductCard from '@/components/ProductCard';
import CollectionBanner from '@/components/CollectionBanner';

export default async function CollectionPage({ params }) {
  const { slug } = await params;

  const map = {
    'premium-embroidered': {
      title: 'Premium Embroidered Kurtis',
      subtitle: 'Close-up embroidery, mirror work and threadwork — rich and detailed.',
      image: '/hero1.png',
    },
    'casual-daily': {
      title: 'Casual Kurti Collection',
      subtitle: 'Comfort first — pastel tones and relaxed silhouettes for everyday wear.',
      image: '/hero2.png',
    },
    'new-arrivals': {
      title: 'New Arrivals',
      subtitle: 'Fresh designs with flowing dupattas and modern Indian silhouettes.',
      image: '/hero3.png',
    },
    'occasion-wear': {
      title: 'Festival & Occasion Wear',
      subtitle: 'Statement pieces for celebrations with heavy embroidery and rich fabrics.',
      image: '/hero4.png',
    },
    'linen-collection': {
      title: 'Linen Essentials',
      subtitle: 'Breathable linen kurtis with minimalist detailing and natural textures.',
      image: '/hero5.png',
    },
    'anarkali-silhouettes': {
      title: 'Anarkali & Flared',
      subtitle: 'Dramatic flares and regal anarkali cuts for traditional elegance.',
      image: '/hero6.png',
    },
  };

  const data = map[slug] || map['new-arrivals'];

  // sample products for this collection
  const products = Array.from({length:8}).map((_, i) => ({
    id: `${slug}-${i}`,
    title: `${data.title} ${i+1}`,
    description: 'Premium kurti set with fine detailing and soft fabric.',
    price: 1699 + i*200,
    image: data.image,
    tag: i % 3 === 0 ? 'New' : undefined,
  }));

  return (
    <main>
      <CollectionBanner title={data.title} subtitle={data.subtitle} image={data.image} align="right" />

      <section className="py-12">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6">{data.title}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>
    </main>
  );
}
