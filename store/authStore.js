// Non-persist Zustand auth store
// Path: /store/authStore.js
// Usage: import useAuthStore from '/store/authStore'

import create from 'zustand';

const LOCAL_USER_KEY = 'vulcro_user';
const LOCAL_TOKEN_KEY = 'vulcro_token';

const useAuthStore = create((set, get) => ({
  // state
  user: null, // { id, name, email, role, avatar }
  token: null,
  isAuthenticated: false,
  loading: false,

  // actions
  setLoading: (val) => set({ loading: !!val }),

  login: ({ token, user }) => {
    // Save to localStorage (if available) then update store
    if (typeof window !== 'undefined') {
      try {
        if (token) window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
        if (user) window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(user));
      } catch (err) {
        // ignore quota errors
        // You could optionally log this to an analytics service
        console.warn('Failed to persist auth to localStorage', err);
      }
    }

    set({ user: user || null, token: token || null, isAuthenticated:    !!token });
  },

  logout: () => {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(LOCAL_TOKEN_KEY);
        window.localStorage.removeItem(LOCAL_USER_KEY);
      } catch (err) {
        console.warn('Failed to clear localStorage during logout', err);
      }
      // client-side redirect
      try {
        window.location.href = '/login';
      } catch (e) {
        // ignore
      }
    }

    set({ user: null, token: null, isAuthenticated: false });
  },

  updateUser: (updatedUser) => {
    const current = get().user || {};
    const merged = { ...current, ...updatedUser };
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(merged));
      } catch (err) {
        console.warn('Failed to persist updated user', err);
      }
    }
    set({ user: merged });
  },

  checkAuth: () => {
    // Restore from localStorage if available. Safe for app-router usage in client components.
    if (typeof window === 'undefined') return;
    try {
      const token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
      const userRaw = window.localStorage.getItem(LOCAL_USER_KEY);
      const user = userRaw ? JSON.parse(userRaw) : null;
      if (token) {
        set({ token, user, isAuthenticated: true });
      } else {
        set({ token: null, user: null, isAuthenticated: false });
      }
    } catch (err) {
      console.warn('Failed to restore auth from localStorage', err);
      set({ token: null, user: null, isAuthenticated: false });
    }
  },
}));

export default useAuthStore;
