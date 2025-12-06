import ProductCard from "@/components/ProductCard";

/**
 * BestSellers Component
 * 
 * Optimized for performance:
 * - Lazy loaded via dynamic import in parent page
 * - ProductCard handles image lazy loading automatically
 * - Lightweight data structure
 */
export default function BestSellers() {
  const products = [
    {
      id: 101,
      title: "Pastel Chanderi Kurti Set",
      description: "Lightweight chanderi with delicate print and soft lining.",
      price: 2499,
      images: ["https://images.unsplash.com/photo-1520975698512-4c5f2b8f9a34?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1520975698512-4c5f2b8f9a34?auto=format&fit=crop&w=900&q=80",
      tag: "Trending",
    },
    {
      id: 102,
      title: "Embroidered Cotton Kurti",
      description: "Fine embroidery on breathable cotton for everyday elegance.",
      price: 1799,
      images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      tag: "New",
    },
    {
      id: 103,
      title: "Silk Blend Anarkali Set",
      description: "Flowing silhouette with premium silk-blend fabric.",
      price: 4299,
      images: ["https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=900&q=80",
      tag: "Trending",
    },
    {
      id: 104,
      title: "Handloom Straight Kurti",
      description: "Handloom weave with subtle motifs and comfortable fit.",
      price: 1999,
      images: ["https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2">Best Sellers</h2>
            <p className="text-gray-600">Our most loved kurtis, handpicked by you</p>
          </div>
          <a href="/shop" className="text-sm text-black font-medium hover:underline">
            View all →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
