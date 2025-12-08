import Image from 'next/image';

export default function BrandStory() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h2 className="text-4xl font-bold text-black mb-6">The VULCRO Story</h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Born in the textile heart of Surat, VULCRO brings you the finest traditional kurtis crafted with passion and precision. Each piece tells a story of heritage, quality, and timeless elegance.
              </p>
              <p className="text-gray-700 mb-6 leading-relaxed">
                We believe in slow fashion — garments that are made to last, designed to flatter, and crafted with respect for our artisans and the environment.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Premium Quality</p>
                </div>
                <div className="text-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Handcrafted</p>
                </div>
                <div className="text-center animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md hover:shadow-lg transition-shadow duration-300">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-900">Sustainable</p>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <Image
                src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80"
                alt="VULCRO Craftsmanship"
                width={800}
                height={1000}
                className="rounded-lg shadow-2xl hover:shadow-3xl transition-shadow duration-300"
                loading="lazy"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
