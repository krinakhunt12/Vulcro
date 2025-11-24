"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import { useSelector } from 'react-redux';
import ProfileMenu from '@/components/ui/ProfileMenu';

export default function Navbar() {
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

  return (
    <nav className="w-full navbar sticky top-0 z-50 bg-white">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl brand font-bold">VULCRO</Link>
        </div>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/shop" className="hover:underline">Shop</Link>
          <Link href="/collections" className="hover:underline">Collections</Link>
          <Link href="/about" className="hover:underline">About</Link>
        </div>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="text-sm px-3 py-2">Login</Link>
              <Link href="/signup" className="text-sm px-3 py-2 border rounded">Signup</Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              {/* ProfileMenu shows avatar + dropdown */}
              <ProfileMenu />
            </div>
          )}

          <Link href="/wishlist" aria-label="Wishlist" className="p-2 rounded-md hover:bg-[rgba(0,0,0,0.03)] relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
            </svg>
            {wishlistItems.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{wishlistItems.length}</span>}
          </Link>

          <Link href="/cart" aria-label="Cart" className="p-2 rounded-md hover:bg-[rgba(0,0,0,0.03)] relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-black">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2 6h14l-2-6M9 21a1 1 0 11-2 0 1 1 0 012 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
