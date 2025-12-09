"use client";

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { useSelector } from 'react-redux';
import ProfileMenu from '@/components/ui/ProfileMenu';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

export default function Navbar() {
  // default to solid so header is white on most pages
  const [solid, setSolid] = useState(true);
  const [mounted, setMounted] = useState(false);
  const auth = useAuth();
  const { user = null, isAuthenticated = false, logout = () => {} } = auth || {};
  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const cartCount = cartItems.reduce((s, it) => s + (it.qty || 1), 0);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    // Mark component as mounted to avoid SSR/client markup mismatch for dynamic badges
    setMounted(true);

    // If not on home page, keep header solid white
    if (pathname && pathname !== '/') {
      setSolid(true);
      return;
    }

    // On home page: observe the hero element; while hero is visible keep navbar transparent
    const hero = typeof document !== 'undefined' ? document.getElementById('site-hero') : null;
    if (!hero) {
      setSolid(true);
      return;
    }

    // start transparent when hero is visible
    setSolid(false);

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (!e.isIntersecting) setSolid(true);
        else setSolid(false);
      },
      { threshold: 0.05 }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, [pathname]);

  return (
    <nav className={`w-full navbar fixed top-0 left-0 right-0 z-50 ${solid ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between py-5">
        <div className="flex items-center gap-6">
          <Link href="/" className={`text-xl brand font-bold`} style={{ color: solid ? '#000' : '#fff' }}>VULCRO</Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className={`hover:underline`} style={{ color: solid ? '#000' : '#fff' }}>Home</Link>
          <Link href="/shop" className={`hover:underline`} style={{ color: solid ? '#000' : '#fff' }}>Shop</Link>
          <Link href="/collections" className={`hover:underline`} style={{ color: solid ? '#000' : '#fff' }}>Collections</Link>
          <Link href="/about" className={`hover:underline`} style={{ color: solid ? '#000' : '#fff' }}>About</Link>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className={`btn btn-white`} style={{ color: solid ? '#000' : '#fff' }}>Login</Link>
              <Link href="/signup" className={`btn btn-primary`} style={{ color: solid ? undefined : '#fff', borderColor: solid ? undefined : '#fff' }}>Signup</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* ProfileMenu shows avatar + dropdown */}
              <ProfileMenu />
            </div>
          )}

          <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.02)] relative">
            <FiHeart className={`w-5 h-5 ${solid ? 'text-black' : 'text-white'}`} aria-hidden />
            {mounted && wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{wishlistItems.length}</span>}
          </Link>

          <Link href="/cart" aria-label="Cart" className="p-2 rounded-md hover:bg-[rgba(0,0,0,0.03)] relative">
            <FiShoppingCart className={`w-5 h-5 ${solid ? 'text-black' : 'text-white'}`} aria-hidden />
            {mounted && cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
