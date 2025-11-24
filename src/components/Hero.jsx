export default function Hero() {
  return (
    <section className="py-20">
      <div className="container grid gap-8 md:grid-cols-2 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">Surat’s Finest Traditional Kurtis</h1>

          <p className="text-lg text-gray-600 mb-6">Premium stitched kurti sets inspired by traditional craft.</p>

          <div className="flex gap-4">
            <a href="/shop" className="btn-primary">Shop Now</a>
            <a href="/collections" className="btn-outline">New Arrivals</a>
          </div>
        </div>

        <div className="flex justify-end">
          <div className="relative" style={{maxWidth: 520}}>
            <div className="card overflow-hidden" style={{borderRadius: 18}}>
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80"
                alt="Model wearing kurti"
                className="w-full h-96 object-cover"
              />
            </div>

            <div style={{position: 'absolute', right: -20, bottom: -20}}>
              <img
                src="https://images.unsplash.com/photo-1520975698512-4c5f2b8f9a34?auto=format&fit=crop&w=300&q=60"
                alt="Dupatta flow"
                className="w-40 h-40 object-cover rounded-lg opacity-90 shadow-lg"
                style={{transform: 'rotate(-12deg)'}}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
