export default function CategoryBar({ categories = [], active = 'All' }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {categories.length === 0 ? (
          <div className="text-sm text-gray-600">No categories</div>
        ) : (
          categories.map((c) => (
            <a
              key={c}
              href={`#${c.toLowerCase()}`}
              className={`text-sm px-3 py-2 rounded-full ${c === active ? 'bg-black text-white' : 'text-gray-700 border border-transparent hover:border-black'}`}
            >
              {c}
            </a>
          ))
        )}
      </div>
      <div className="border-t border-gray-100 mt-3" />
    </div>
  );
}
