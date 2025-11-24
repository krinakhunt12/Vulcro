export default function ShopFilters() {
  return (
    <aside className="w-full md:w-72">
      <div className="card p-4">
        <h4 className="font-semibold mb-3">Filters</h4>

        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-2">Price Range</div>
          <input type="range" min="499" max="9999" className="w-full" />
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-2">Fabric</div>
          <div className="flex flex-col gap-2 text-sm">
            <label><input type="checkbox" className="mr-2" />Cotton</label>
            <label><input type="checkbox" className="mr-2" />Silk Blend</label>
            <label><input type="checkbox" className="mr-2" />Linen</label>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm text-gray-700 mb-2">Size</div>
          <div className="flex flex-wrap gap-2">
            {['XS','S','M','L','XL'].map(s => (
              <button key={s} className="text-sm px-3 py-1 border border-gray-100 rounded-md">{s}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="text-sm text-gray-700 mb-2">Color</div>
          <div className="flex items-center gap-2">
            {['#F6D6C9','#EAEAEA','#CDE7E0','#F3E8FF'].map(c => (
              <button key={c} style={{background:c}} className="w-7 h-7 rounded-full border border-gray-100" />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
