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
 * SignupForm - standalone signup form used on `/signup` page
 */
export default function SignupForm({ onSuccessRedirect = '/' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();
  const auth = useAuth();

  function validate() {
    if (!name || name.length < 2) return 'Please provide your full name.';
    if (!email || !password) return 'Email and password are required.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const v = validate();
    if (v) { setError(v); return; }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'Signup failed');
        toast?.push({ title: 'Signup failed', description: data?.message || 'Please try again', variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      if (data.token) {
        try { localStorage.setItem('token', data.token); } catch (_) {}
      }

      if (data.user && auth?.setAuthUser) {
        auth.setAuthUser(data.user);
      }

      toast?.push({ title: 'Account created', description: 'Welcome to VULCRO' });
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
      <form onSubmit={handleSubmit} aria-label="Signup form" className="flex flex-col">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Create your account</h2>
          <p className="text-sm text-gray-500 mt-1">Join VULCRO — Surat’s Finest Traditional Kurtis</p>
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="signup-name">Full name</Label>
            <Input id="signup-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Meera Shah" required />
          </div>

          <div>
            <Label htmlFor="signup-email">Email</Label>
            <Input id="signup-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@domain.com" required />
          </div>

          <div>
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password" required />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <Button type="submit" className="w-full" disabled={isLoading}>{isLoading ? 'Creating account...' : 'Create account'}</Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-100" />
            <div className="text-xs text-gray-400">or</div>
            <div className="flex-1 h-px bg-gray-100" />
          </div>

          <div>
            <Button type="button" variant="ghost" className="w-full">Continue with Google</Button>
          </div>

          <div className="text-sm text-center text-gray-600">
            Already have an account? <a href="/login" className="underline">Login</a>
          </div>
        </div>
      </form>
    </Card>
  );
}
