import ProductCard from './ProductCard';
import productsData from '@/data/products';

export default function RelatedProducts({ items = [] }) {
  const products = items.length ? items : productsData.slice(0, 3);

  return (
    <section className="py-12">
      <div className="container">
        <h3 className="text-xl font-bold mb-6">You may also like</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
