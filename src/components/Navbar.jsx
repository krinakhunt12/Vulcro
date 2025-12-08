"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { useSelector } from 'react-redux';
import ProfileMenu from '@/components/ui/ProfileMenu';
import { useEffect, useState } from 'react';
import { FiShoppingCart, FiHeart } from 'react-icons/fi';

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const auth = useAuth();
  const { user = null, isAuthenticated = false, logout = () => {} } = auth || {};
  const cartItems = useSelector((state) => state.cart.items || []);
  const wishlistItems = useSelector((state) => state.wishlist.items || []);
  const cartCount = cartItems.reduce((s, it) => s + (it.qty || 1), 0);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    // Mark component as mounted to avoid SSR/client markup mismatch for dynamic badges
    setMounted(true);

    // Observe the hero element; while hero is visible keep navbar transparent
    const hero = typeof document !== 'undefined' ? document.getElementById('site-hero') : null;
    if (!hero) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        // if hero is not intersecting (scrolled past) make navbar solid
        if (!e.isIntersecting) setSolid(true);
        else setSolid(false);
      },
      { threshold: 0.05 }
    );

    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  return (
    <nav className={`w-full navbar sticky top-0 z-50 ${solid ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
      <div className="container flex items-center justify-between py-5">
        <div className="flex items-center gap-6">
          <Link href="/" className={`text-xl brand font-bold ${solid ? 'text-black' : 'text-white'}`}>VULCRO</Link>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm">
          <Link href="/" className={`${solid ? 'text-black hover:underline' : 'text-white hover:underline'}`}>Home</Link>
          <Link href="/shop" className={`${solid ? 'text-black hover:underline' : 'text-white hover:underline'}`}>Shop</Link>
          <Link href="/collections" className={`${solid ? 'text-black hover:underline' : 'text-white hover:underline'}`}>Collections</Link>
          <Link href="/about" className={`${solid ? 'text-black hover:underline' : 'text-white hover:underline'}`}>About</Link>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className={`btn ${solid ? 'btn-ghost text-black' : 'btn-ghost text-white'}`}>Login</Link>
              <Link href="/signup" className={`btn ${solid ? 'btn-primary' : 'btn btn-primary'}`}>Signup</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* ProfileMenu shows avatar + dropdown */}
              <ProfileMenu />
            </div>
          )}

          <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-md hover:bg-[rgba(255,255,255,0.02)] relative">
            <FiHeart className="text-black w-5 h-5" aria-hidden />
            {mounted && wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{wishlistItems.length}</span>}
          </Link>

          <Link href="/cart" aria-label="Cart" className="p-2 rounded-md hover:bg-[rgba(0,0,0,0.03)] relative">
            <FiShoppingCart className="text-black w-5 h-5" aria-hidden />
            {mounted && cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
