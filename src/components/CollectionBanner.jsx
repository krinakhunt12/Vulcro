export default function CollectionBanner({ title, subtitle, image, align = 'right' }) {
  return (
    <section className="py-16">
      <div className="container grid items-center gap-8 md:grid-cols-2">
        <div className={`space-y-4 ${align === 'left' ? 'order-2 md:order-1' : ''}`}>
          <div className="text-sm text-gray-600">Collection</div>
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
          <p className="text-gray-600 max-w-xl">{subtitle}</p>
        </div>

        <div className={`flex justify-center ${align === 'left' ? 'order-1 md:order-2' : ''}`}>
          <div className="card overflow-hidden" style={{borderRadius:18, maxWidth:800}}>
            <img src={image} alt={title} className="w-full h-96 object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
