export default function Pagination({ page = 1, total = 5 }) {
  const pages = Array.from({length: total}, (_, i) => i+1);
  return (
    <div className="flex items-center justify-center mt-8">
      <nav className="flex items-center gap-2 text-sm">
        {pages.map(p => (
          <a key={p} href={`?page=${p}`} className={`w-8 h-8 inline-flex items-center justify-center rounded-full ${p===page ? 'bg-black text-white' : 'border border-gray-100 text-gray-700'}`}>{p}</a>
        ))}
      </nav>
    </div>
  );
}
