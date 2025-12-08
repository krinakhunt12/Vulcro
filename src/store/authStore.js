import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Auth store (Zustand) with persistence.
 * - Stores `email` and `token` and a boolean `isAuthenticated`.
 * - `login({ email, token })` sets values and persists them.
 * - `logout()` clears state and removes persisted storage.
 *
 * Usage:
 * const { email, token, login, logout } = useAuthStore();
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      email: null,
      token: null,
      isAuthenticated: false,

      login: ({ email, token }) => {
        set({ email, token, isAuthenticated: true });
      },

      logout: () => {
        set({ email: null, token: null, isAuthenticated: false });
        try {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('vulcro-auth');
          }
        } catch (e) {
          // ignore
        }
      },
    }),
    {
      name: 'vulcro-auth', // storage key
      getStorage: () => (typeof window !== 'undefined' ? localStorage : undefined),
      // optionally, you could provide a serializer to encrypt the token
    }
  )
);
