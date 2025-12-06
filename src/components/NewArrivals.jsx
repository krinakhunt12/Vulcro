import ProductCard from "@/components/ProductCard";

/**
 * NewArrivals Component
 * 
 * Optimized for performance:
 * - Lazy loaded via dynamic import in parent page
 * - ProductCard handles image lazy loading automatically
 * - Configurable count for flexibility
 */
export default function NewArrivals({ count = 6 }) {
  const products = [
    {
      id: 201,
      title: "Pastel Floral Kurti",
      description: "Soft pastel kurti with floral motifs and delicate borders.",
      price: 1599,
      images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=900&q=80",
      tag: "New",
    },
    {
      id: 202,
      title: "Elegant Palazzo Set",
      description: "Comfortable palazzo and kurti set in subtle hues.",
      price: 1899,
      images: ["https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1516822003754-cca485356ecb?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 203,
      title: "Hand-stitched Kurti",
      description: "Fine hand-stitched detailing for a boutique finish.",
      price: 2199,
      images: ["https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=900&q=80",
      tag: "Trending",
    },
    {
      id: 204,
      title: "Minimal Block Print Kurti",
      description: "Timeless block prints with modern cuts.",
      price: 1399,
      images: ["https://images.unsplash.com/photo-1562158070-17c4f1b5d4c5?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1562158070-17c4f1b5d4c5?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 205,
      title: "Soft Linen Kurti",
      description: "Breathable linen blend for easy styling.",
      price: 1699,
      images: ["https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
    },
    {
      id: 206,
      title: "Embellished Festive Kurti",
      description: "Subtle embellishments for festive occasions.",
      price: 2599,
      images: ["https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=900&q=80"],
      image: "https://images.unsplash.com/photo-1520975910789-7f6f7b8a0c8b?auto=format&fit=crop&w=900&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-black mb-2">New Arrivals</h2>
            <p className="text-gray-600">Fresh styles just added</p>
          </div>
          <a href="/shop?filter=new" className="hidden md:inline-flex items-center text-black font-medium hover:underline">
            View All →
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.slice(0, count).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
