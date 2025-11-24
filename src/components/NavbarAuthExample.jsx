"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import useAuthStore from '/store/authStore';

// Example navbar that toggles Login/Signup vs Profile dropdown based on auth store

export default function NavbarAuthExample() {
  const { isAuthenticated, user, checkAuth, logout } = useAuthStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Ensure client-side restoration happens before rendering auth-dependent UI
    checkAuth();
    setHydrated(true);
  }, [checkAuth]);

  // Avoid showing wrong UI during hydration
  if (!hydrated) {
    return (
      <nav className="p-4">
        <div className="container mx-auto">Loading...</div>
      </nav>
    );
  }

  return (
    <nav className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="font-bold">VULCRO</Link>

        <div className="flex items-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link href="/login" className="px-3 py-1 border rounded">Login</Link>
              <Link href="/signup" className="px-3 py-1 bg-black text-white rounded">Signup</Link>
            </>
          ) : (
            <div className="relative">
              <button className="flex items-center gap-2" aria-label="Profile menu">
                <img src={user?.avatar || '/avatar-placeholder.png'} alt="avatar" className="w-8 h-8 rounded-full" />
                <span>{user?.name || user?.email}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                <Link href="/account" className="block px-3 py-2">Profile</Link>
                <Link href="/order/history" className="block px-3 py-2">Orders</Link>
                <Link href="/wishlist" className="block px-3 py-2">Wishlist</Link>
                <button onClick={() => logout()} className="w-full text-left px-3 py-2">Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
