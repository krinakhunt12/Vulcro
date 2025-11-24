export default function AboutVulcro() {
  return (
    <section className="py-16">
      <div className="container grid gap-8 md:grid-cols-2 items-center">
        <div>
          <div className="text-sm text-gray-600 mb-2">Made in Surat</div>
          <h2 className="text-3xl font-bold mb-4">Designed with Tradition. Crafted with Love.</h2>
          <p className="text-gray-600 mb-6">VULCRO creates premium traditional kurti sets blending time-honored techniques with modern silhouettes. Each piece is tailored in Surat with attention to detail and comfort.</p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col items-start gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-1">
                <path d="M12 2l2 5 5 .5-3.5 3 1 5L12 14l-4.5 2.5 1-5L5 7.5 10 7 12 2z" fill="#000" />
              </svg>
              <div className="font-semibold">Premium Quality</div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-1">
                <path d="M12 2a4 4 0 014 4v1h-8V6a4 4 0 014-4zM6 11v6h12v-6H6z" fill="#000" />
              </svg>
              <div className="font-semibold">Comfortable Fabric</div>
            </div>

            <div className="flex flex-col items-start gap-2">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-1">
                <path d="M3 12h18M12 3v18" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="font-semibold">Fast Shipping</div>
            </div>
          </div>
        </div>

        <div>
          <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80" alt="Vulcro craft" className="w-full h-72 object-cover rounded-lg shadow" />
        </div>
      </div>
    </section>
  );
}
