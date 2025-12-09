export default function CategoryBar({ categories = [], active = 'All', variant = 'solid' }) {
  const isSolid = variant === 'solid';

  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 overflow-x-auto pb-2">
        {categories.length === 0 ? (
          <div className="text-sm text-gray-600">No categories</div>
        ) : (
          categories.map((c) => {
            const isActive = c === active;
            const base = 'text-sm px-3 py-2 rounded-full inline-block';
            const activeClasses = isSolid ? 'bg-black text-white' : 'bg-transparent text-black border border-gray-200';
            const inactiveClasses = 'text-gray-700 border border-transparent hover:border-black';
            return (
              <a
                key={c}
                href={`#${c.toLowerCase()}`}
                className={`${base} ${isActive ? activeClasses : inactiveClasses}`}
              >
                {c}
              </a>
            );
          })
        )}
      </div>
      <div className="border-t border-gray-100 mt-3" />
    </div>
  );
}
