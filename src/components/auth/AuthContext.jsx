'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem('vulcro_user');
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch (e) {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const login = async ({ email, password }) => {
    // Mock auth - replace with real API call
    const fakeUser = { id: 'admin', email };
    localStorage.setItem('vulcro_user', JSON.stringify(fakeUser));
    setUser(fakeUser);
    return { ok: true, user: fakeUser };
  };

  const signup = async ({ email, password }) => {
    // Mock signup
    const fakeUser = { id: 'user_' + Date.now(), email };
    localStorage.setItem('vulcro_user', JSON.stringify(fakeUser));
    setUser(fakeUser);
    return { ok: true, user: fakeUser };
  };

  const logout = () => {
    try {
      localStorage.removeItem('vulcro_user');
      localStorage.removeItem('token');
    } catch (e) {}
    setUser(null);
  };

  const setAuthUser = (u) => {
    try {
      if (u) {
        localStorage.setItem('vulcro_user', JSON.stringify(u));
      } else {
        localStorage.removeItem('vulcro_user');
        // also remove any stored token when clearing auth
        localStorage.removeItem('token');
      }
    } catch (e) {}
    setUser(u || null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, setAuthUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
