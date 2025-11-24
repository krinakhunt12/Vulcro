export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2">
        {items.map((it, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <a href={it.href || '#'} className="hover:underline">{it.label}</a>
            {idx < items.length - 1 ? <span className="text-gray-400">/</span> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
