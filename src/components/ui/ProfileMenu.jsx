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

  // Close on Escape key
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
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
        className="flex items-center gap-2 px-3 py-2 rounded text-sm bg-white hover:shadow-sm ring-1 ring-transparent hover:ring-gray-200 transition-all"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm bg-black shadow">{(user?.email || 'U')[0].toUpperCase()}</span>
        <span className="hidden sm:block text-sm text-gray-700">{user?.email?.split('@')[0] || 'User'}</span>
      </button>

      {open && (
        <div
          role="menu"
          aria-label="Profile menu"
          className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-50 overflow-hidden origin-top-right transform transition ease-out duration-150 scale-100"
        >
          <div className="px-4 py-3 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-medium">{(user?.email || 'U')[0].toUpperCase()}</div>
              <div className="flex-1 text-sm">
                <div className="text-gray-900 font-medium">{user?.email?.split('@')[0] || 'User'}</div>
                <div className="text-gray-500 text-xs">{user?.email || 'No email'}</div>
              </div>
            </div>
          </div>

          <div className="divide-y">
            <div className="py-1">
              <button onClick={() => go('/account')} className="cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.88 6.196 9 9 0 015.12 17.804z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span className="text-sm text-gray-700">My Profile</span>
              </button>
              <button onClick={() => go('/order/history')} className="cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18"/></svg>
                <span className="text-sm text-gray-700">My Orders</span>
              </button>
              <button onClick={() => go('/wishlist')} className="cursor-pointer w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.8 4.6a5.5 5.5 0 00-7.78 0L12 5.62l-1.02-1.02a5.5 5.5 0 00-7.78 7.78L12 21.5l8.8-9.12a5.5 5.5 0 000-7.78z"/></svg>
                <span className="text-sm text-gray-700">My Wishlist</span>
              </button>
            </div>

            <div className="py-1 bg-white">
              <button onClick={doLogout} className="w-full text-left px-4 py-3 text-red-600 hover:bg-gray-50 flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7"/></svg>
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
