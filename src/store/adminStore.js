import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Admin auth store (Zustand) with persistence.
 * - Stores `email`, `token`, `role`, and `admin` object.
 * - `login({ admin, token, role })` sets values and persists them.
 * - `logout()` clears state and removes persisted storage.
 *
 * Keep `setAdmin` (backwards-compatible) for existing callers.
 */
export const useAdminStore = create(
  persist(
    (set) => ({
      admin: null,
      email: null,
      token: null,
      role: null,
      isAuthenticated: false,

      // Backwards-compatible setter used elsewhere
      setAdmin: (adminObj) => set({ admin: adminObj, email: adminObj?.email ?? null, isAuthenticated: !!adminObj }),

      // Primary login API for storing admin auth
      login: ({ admin, token, role = 'admin' }) => {
        set({ admin: admin || null, email: admin?.email || null, token: token || null, role, isAuthenticated: true });
      },

      logout: () => {
        set({ admin: null, email: null, token: null, role: null, isAuthenticated: false });
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('vulcro-admin');
          }
        } catch (e) {
          // ignore
        }
      },
    }),
    {
      name: 'vulcro-admin', // storage key
      getStorage: () => (typeof window !== 'undefined' ? localStorage : undefined),
    }
  )
);
