export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-white to-amber-50">
      {/* Background Images - Fixed Position */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1920&q=80"
            alt="Traditional fabric background"
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/40 to-white/90"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-rose-100/20 via-transparent to-amber-100/20"></div>
        </div>

        {/* Decorative Floating Images */}
        <img
          src="https://images.unsplash.com/photo-1523380744952-b7e00e6e2ffa?auto=format&fit=crop&w=800&q=60"
          alt="Fabric texture"
          className="absolute top-20 left-10 w-64 h-64 object-cover rounded-3xl opacity-30 rotate-12"
        />
        <img
          src="https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w-600&q=60"
          alt="Embroidery detail"
          className="absolute bottom-32 right-20 w-48 h-48 object-cover rounded-2xl opacity-40 -rotate-6"
        />

        {/* Bottom Blur Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-white via-white/95 to-transparent backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 to-transparent"></div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 bg-rose-100 text-rose-800 rounded-full text-sm font-semibold mb-6">
                Since 1995 • Family Owned
              </span>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-gray-900">Surat's Finest</span>
                <span className="block text-transparent bg-gradient-to-r from-rose-700 via-purple-700 to-amber-700 bg-clip-text mt-2">
                  Traditional Kurtis
                </span>
              </h1>
              
              <div className="w-32 h-2 bg-gradient-to-r from-rose-400 to-amber-400 rounded-full mt-6"></div>
            </div>

            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
              Where <span className="font-semibold text-rose-700">centuries-old craftsmanship</span> meets contemporary elegance. Each piece tells a story of tradition, woven with love and attention to detail.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="/shop"
                className="group relative px-10 py-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Shop Collection
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="/collections"
                className="group px-8 py-4 border-2 border-rose-200 text-rose-700 font-semibold rounded-full hover:bg-rose-50 hover:border-rose-300 transition-all duration-300 hover:scale-105"
              >
                Explore Designs
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl">
                <div className="text-3xl font-bold text-rose-700">500+</div>
                <div className="text-sm text-gray-600 mt-1">Unique Designs</div>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl">
                <div className="text-3xl font-bold text-purple-700">100%</div>
                <div className="text-sm text-gray-600 mt-1">Handcrafted</div>
              </div>
              <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-2xl">
                <div className="text-3xl font-bold text-amber-700">28Y</div>
                <div className="text-sm text-gray-600 mt-1">Legacy</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative z-20">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80"
                  alt="Model wearing traditional kurti"
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <span className="text-sm font-semibold text-gray-800">Best Seller</span>
                </div>
              </div>

              {/* Floating Image 1 */}
              <div className="absolute -bottom-6 -right-6 z-10">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-200 to-rose-200 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://images.unsplash.com/photo-1520975698512-4c5f2b8f9a34?auto=format&fit=crop&w=400&q=80"
                    alt="Dupatta detail"
                    className="relative w-40 h-40 object-cover rounded-2xl shadow-xl transform rotate-6 group-hover:rotate-0 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Floating Image 2 */}
              <div className="absolute -top-6 -left-6 z-10">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-200 to-pink-200 rounded-2xl blur opacity-70 group-hover:opacity-100 transition-opacity"></div>
                  <img
                    src="https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&w=400&q=80"
                    alt="Fabric texture closeup"
                    className="relative w-32 h-32 object-cover rounded-2xl shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500"
                  />
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 top-1/4 -left-8 w-64 h-64 bg-gradient-to-br from-rose-200/30 to-purple-200/30 rounded-full blur-3xl"></div>
            <div className="absolute -z-10 bottom-1/4 -right-8 w-80 h-80 bg-gradient-to-tr from-amber-200/30 to-rose-200/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>

      {/* Bottom Blur Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white via-white/95 to-transparent"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-600 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}