"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '/store/authStore';

// ProtectedRoute wraps client-side UI that should be accessible only when authenticated.
// Example usage:
// <ProtectedRoute>
//   <SecretWidget />
// </ProtectedRoute>

export default function ProtectedRoute({ children, fallbackMessage = 'Please login to continue' }) {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();

  useEffect(() => {
    // Restore auth from localStorage (if any). This avoids hydration mismatches.
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // If not authenticated, block and redirect to /login
    if (!isAuthenticated) {
      // show a simple alert or integrate with your toast system
      try { window.alert(fallbackMessage); } catch (e) {}
      router.push('/login');
    }
  }, [isAuthenticated, router, fallbackMessage]);

  if (!isAuthenticated) return null; // render nothing while redirecting

  return <>{children}</>;
}
