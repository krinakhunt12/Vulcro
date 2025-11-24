// Persisted Zustand auth store using zustand/middleware
// Path: /store/authStorePersist.js
// Key: 'vulcro-auth'

import create from 'zustand';
import { persist } from 'zustand/middleware';

// Data shape stored in the persisted state:
// { user, token, isAuthenticated, loading }

const useAuthStorePersist = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      loading: false,

      setLoading: (val) => set({ loading: !!val }),

      login: ({ token, user }) => {
        set({ user: user || null, token: token || null, isAuthenticated: !!token });
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        // clear persisted storage (persist middleware does this on set but ensure removal)
        try {
          if (typeof window !== 'undefined') window.localStorage.removeItem('vulcro-auth');
        } catch (e) {
          // ignore
        }
        if (typeof window !== 'undefined') {
          try { window.location.href = '/login'; } catch (e) {}
        }
      },

      updateUser: (updatedUser) => {
        const current = get().user || {};
        const merged = { ...current, ...updatedUser };
        set({ user: merged });
      },

      // checkAuth is optional with persist middleware because rehydration happens automatically,
      // but providing it for parity with the non-persist store.
      checkAuth: () => {
        // No-op: rehydration handled by zustand/persist on load.
        return;
      },
    }),
    {
      name: 'vulcro-auth',
      // optional: only persist specific keys
      partialize: (state) => ({ user: state.user, token: state.token, isAuthenticated: state.isAuthenticated }),
    }
  )
);

export default useAuthStorePersist;
