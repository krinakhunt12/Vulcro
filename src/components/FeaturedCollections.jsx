import Link from 'next/link';
import Image from 'next/image';

export default function FeaturedCollections({ collections = [] }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-black mb-4">Curated Collections</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of traditional kurtis for every occasion
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              href={collection.href}
              className="group relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                <Image
                  src={collection.image}
                  alt={collection.title}
                  width={800}
                  height={1067}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  unoptimized
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold mb-2">{collection.title}</h3>
                <p className="text-sm text-gray-200 mb-3">{collection.description}</p>
                <span className="inline-flex items-center text-sm font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Explore <span className="ml-2">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
