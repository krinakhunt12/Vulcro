"use client";

import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('in-view');
        });
      },
      { threshold: 0.12 }
    );

    const nodes = document.querySelectorAll('.fade-up');
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="site-hero" className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background Images - Fixed Position */}
      <div className="absolute inset-0 z-0">
        {/* Main Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="./hero.png"
            alt="Traditional fabric background"
            className="w-full h-full object-cover grayscale blur-[0.6px] opacity-85"
          />
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/35 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/10"></div>
        </div>

        {/* Decorative Floating Images */}
        <img
          src="./hero5.png"
          alt="Fabric texture"
          className="absolute top-20 left-10 w-64 h-64 object-cover rounded-3xl opacity-18 rotate-12 fade-up"
        />
        <img
          src="./hero2.png"
          alt="Embroidery detail"
          className="absolute bottom-32 right-20 w-48 h-48 object-cover rounded-2xl opacity-22 -rotate-6 fade-up"
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
              <span className="inline-block px-4 py-2 bg-white/10 text-gray-100 rounded-full text-sm font-semibold mb-6">
                Since 1995 • Family Owned
              </span>

              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                <span className="block text-white">Surat's Finest</span>
                <span className="block text-gray-200 mt-2">Traditional Kurtis</span>
              </h1>

              <div className="w-32 h-1 bg-white/20 rounded-full mt-6"></div>
            </div>

            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Where <span className="font-semibold text-white">centuries-old craftsmanship</span> meets contemporary elegance. Each piece tells a story of tradition, woven with attention to detail.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-6">
              <a
                href="/shop"
                className="group relative px-10 py-4 bg-white text-black font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-3 text-black">
                  Shop Collection
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </a>

              <a
                href="/collections"
                className="group px-8 py-4 border border-white/20 text-white font-semibold rounded-full hover:bg-white/6 transition-all duration-300 hover:scale-105"
              >
                Explore Designs
              </a>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center p-4 bg-gray-400/30 backdrop-blur-sm rounded-2xl">
                <div className="text-3xl font-bold text-white">500+</div>
                <div className="text-sm text-gray-800 mt-1">Unique Designs</div>
              </div>
              <div className="text-center p-4 bg-gray-400/30 backdrop-blur-sm rounded-2xl">
                <div className="text-3xl font-bold text-white">100%</div>
                <div className="text-sm text-gray-800 mt-1">Handcrafted</div>
              </div>
              <div className="text-center p-4 bg-gray-400/30 backdrop-blur-sm rounded-2xl">
                <div className="text-3xl font-bold text-white">28Y</div>
                <div className="text-sm text-gray-800 mt-1">Legacy</div>
              </div>
            </div>
          </div>

          {/* Right Column - Image Gallery */}
          <div className="relative">
            {/* Main Product Image */}
            <div className="relative z-20">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="./hero2.png"
                  alt="Model wearing traditional kurti"
                  className="w-full h-[500px] object-cover transition-transform duration-700 hover:scale-105 fade-up"
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
                  <div className="absolute -inset-2 bg-white/5 rounded-2xl blur opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  <img
                    src="./hero4.png"
                    alt="Dupatta detail"
                    className="relative w-40 h-40 object-cover rounded-2xl shadow-xl transform rotate-6 group-hover:rotate-0 transition-transform duration-500 fade-up"
                  />
                </div>
              </div>

              {/* Floating Image 2 */}
              <div className="absolute -top-6 -left-6 z-10">
                <div className="relative group">
                  <div className="absolute -inset-2 bg-white/5 rounded-2xl blur opacity-50 group-hover:opacity-80 transition-opacity"></div>
                  <img
                    src="./hero3.png"
                    alt="Fabric texture closeup"
                    className="relative w-32 h-32 object-cover rounded-2xl shadow-xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-500 fade-up"
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
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-300 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </section>
  );
}