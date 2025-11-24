"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';

export default function ProfileMenu() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDoc(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  function go(path) {
    setOpen(false);
    router.push(path);
  }

  function doLogout() {
    logout();
    setOpen(false);
    router.push('/');
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 px-3 py-2 border rounded text-sm bg-white hover:shadow-sm"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm">{(user?.email || 'U')[0].toUpperCase()}</span>
        <span className="hidden sm:block">{user?.email?.split('@')[0]}</span>
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M6 8l4 4 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50">
          <button onClick={() => go('/account')} className="w-full text-left px-4 py-2 hover:bg-gray-50">My Profile</button>
          <button onClick={() => go('/order/history')} className="w-full text-left px-4 py-2 hover:bg-gray-50">My Orders</button>
          <button onClick={() => go('/wishlist')} className="w-full text-left px-4 py-2 hover:bg-gray-50">My Wishlist</button>
          <div className="border-t" />
          <button onClick={doLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50">Logout</button>
        </div>
      )}
    </div>
  );
}
