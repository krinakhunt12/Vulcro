export default function Pagination({ page = 1, total = 5, variant = 'standard', showNumbers = true }) {
  const pages = Array.from({ length: total }, (_, i) => i + 1);

  const base = 'w-8 h-8 inline-flex items-center justify-center rounded-full text-sm font-medium transition-all';
  const isSolid = variant === 'standard' || variant === 'solid';
  const activeCls = isSolid ? 'bg-gray-300 text-black border border-gray-200' : 'bg-transparent text-black border border-gray-200';
  const inactiveCls = 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:border-gray-400';

  const prevPage = Math.max(1, Number(page) - 1);
  const nextPage = Math.min(total, Number(page) + 1);

  return (
    <div className="flex items-center justify-center mt-8">
      <nav className="flex items-center gap-2" aria-label="Pagination">
        <a
          href={`?page=${prevPage}`}
          aria-label="Previous page"
          className={`${base} ${inactiveCls}`}
        >
          ‹
        </a>

        {showNumbers && pages.map((p) => {
          const isActive = Number(p) === Number(page);
          return (
            <a
              key={p}
              href={`?page=${p}`}
              aria-current={isActive ? 'page' : undefined}
              className={`${base} ${isActive ? activeCls : inactiveCls}`}
            >
              {p}
            </a>
          );
        })}

        <a
          href={`?page=${nextPage}`}
          aria-label="Next page"
          className={`${base} ${inactiveCls}`}
        >
          ›
        </a>
      </nav>
    </div>
  );
}
