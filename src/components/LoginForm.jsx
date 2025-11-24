"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthContext';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useToast } from '@/components/ui/ToastProvider';

/**
 * LoginForm - standalone login form to be used on `/login` page
 * Uses `fetch` to call `/api/auth/login` and shows toast notifications.
 */
export default function LoginForm({ onSuccessRedirect = '/' }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();

  function validate() {
    if (!email || !password) return 'Email and password are required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) {
      setError(v);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Login failed');
        toast?.push({ title: 'Login failed', description: data?.message || 'Invalid credentials', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      // store token (consider httpOnly cookie in production)
      if (data.token) {
        try { localStorage.setItem('token', data.token); } catch (_) {}
      }

      // If API returned user object, set it in AuthContext so navbar updates
      if (data.user && auth?.setAuthUser) {
        auth.setAuthUser(data.user);
      }

      toast?.push({ title: 'Welcome back', description: 'You are now logged in' });
      router.push(onSuccessRedirect);
    } catch (err) {
      setError(err.message || 'Unexpected error');
      toast?.push({ title: 'Error', description: err.message || 'Unexpected error', variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="p-6 min-h-[520px] flex flex-col justify-center">
      <form onSubmit={handleSubmit} aria-label="Login form" className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Welcome back</h2>
          <p className="text-sm text-gray-500 mt-1">Sign in to continue to VULCRO</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="login-email">Email</Label>
            <Input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" required />
          </div>

          <div>
            <Label htmlFor="login-password">Password</Label>
            <Input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Your password" required />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Signing in...' : 'Sign in'}</Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <div className="text-xs text-gray-400">or</div>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div>
            <Button type="button" variant="ghost" className="w-full"> 
              <img src="/placeholders/google-24x24.png" alt="Google" width={18} height={18} />
              <span className="ml-2">Continue with Google</span>
            </Button>
          </div>

          <div className="text-sm text-center text-gray-600">
            Don’t have an account? <a href="/signup" className="underline">Sign up</a>
          </div>
        </div>
      </form>
    </Card>
  );
}
