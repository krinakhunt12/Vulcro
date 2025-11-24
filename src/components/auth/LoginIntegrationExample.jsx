"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '/store/authStore';

// Example of how to call your login API and update the auth store.
// This is intentionally minimal — adapt error handling and UX to your app.

export default function LoginIntegrationExample() {
  const router = useRouter();
  const { login, setLoading } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || 'Login failed');

      // Expecting { token, user }
      login({ token: data.token, user: data.user });

      // Redirect after login
      router.push('/');
    } catch (err) {
      console.warn(err);
      // replace with toast in production
      alert(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <label className="block mb-2">
        <span className="text-sm">Email</span>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded" />
      </label>
      <label className="block mb-2">
        <span className="text-sm">Password</span>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded" />
      </label>
      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Login</button>
    </form>
  );
}
