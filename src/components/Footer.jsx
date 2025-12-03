export default function Footer() {
  return (
    <footer className="mt-16 border-t border-transparent py-12" style={{background: 'linear-gradient(180deg, rgba(255,255,255,0.01), transparent)'}}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="text-xl font-bold">VULCRO</div>
            <div className="text-sm text-[--muted] mt-2">Premium traditional kurti sets from Surat.</div>
          </div>

          <div>
            <div className="font-semibold mb-2">Customer Support</div>
            <ul className="text-sm text-[--muted] space-y-2">
              <li><a href="/contact" className="hover:underline">Contact</a></li>
              <li><a href="/shipping" className="hover:underline">Shipping</a></li>
              <li><a href="/returns" className="hover:underline">Return</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2">Categories</div>
            <ul className="text-sm text-[--muted] space-y-2">
              <li><a href="/category/kurtis" className="hover:underline">Kurtis</a></li>
              <li><a href="/category/embroidered" className="hover:underline">Embroidered</a></li>
              <li><a href="/category/daily" className="hover:underline">Daily Wear</a></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-2">Follow Us</div>
            <div className="flex items-center gap-3">
              <a href="#" aria-label="Instagram" className="text-[--muted] hover:text-[--foreground]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-[--muted] hover:text-[--foreground]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v7h4v-7h3l1-4h-4V6a1 1 0 011-1h3V2z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-sm text-[--muted]">© {new Date().getFullYear()} VULCRO. All rights reserved.</div>
      </div>
    </footer>
  );
}
