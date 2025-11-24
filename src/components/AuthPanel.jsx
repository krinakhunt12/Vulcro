"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import Button from '@/components/ui/Button';
import Separator from '@/components/ui/Separator';
import { useToast } from '@/components/ui/ToastProvider';

// AuthPanel: uses UI primitives and integrates with auth API
export default function AuthPanel() {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const toast = useToast();

  // Simple client-side validation
  function validate() {
    if (!email || !password) return 'Please provide email and password.';
    if (mode === 'signup' && (!name || name.length < 2)) return 'Please provide a valid full name.';
    if (password.length < 6) return 'Password must be at least 6 characters.';
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const body = mode === 'signup'
        ? { name, email, password }
        : { email, password };

      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || 'An error occurred');
        toast?.push({ title: 'Authentication failed', description: data?.message, variant: 'destructive' });
        setIsLoading(false);
        return;
      }

      // Save token (recommend: use httpOnly cookie in production)
      if (data.token) {
        try {
          localStorage.setItem('token', data.token);
        } catch (err) {
          // ignore storage errors
        }
      }

      toast?.push({ title: 'Success', description: data.message || (mode === 'login' ? 'Logged in' : 'Account created') });

      // redirect to home or dashboard
      router.push('/');
    } catch (err) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[520px] flex items-center justify-center">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-2 items-center">
              <h3 className="text-lg font-semibold">{mode === 'login' ? 'Welcome back' : 'Create your account'}</h3>
              <span className="text-sm text-gray-500">VULCRO</span>
            </div>

            <div className="text-sm">
              <button
                type="button"
                aria-pressed={mode === 'login'}
                onClick={() => setMode('login')}
                className={`px-3 py-1 rounded-md ${mode === 'login' ? 'bg-black text-white' : 'text-gray-600'}`}
              >
                Login
              </button>
              <button
                type="button"
                aria-pressed={mode === 'signup'}
                onClick={() => setMode('signup')}
                className={`ml-2 px-3 py-1 rounded-md ${mode === 'signup' ? 'bg-black text-white' : 'text-gray-600'}`}
              >
                Signup
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {mode === 'signup' && (
              <div>
                <Label htmlFor="fullname">Full name</Label>
                <Input id="fullname" value={name} onChange={(e) => setName(e.target.value)} name="fullname" type="text" placeholder="Meera Shah" />
              </div>
            )}

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" type="email" placeholder="you@domain.com" />
              </div>

              <div>
                <Label htmlFor="phone">Mobile number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone" type="tel" placeholder="+91 9XXXXXXXXX" />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" type="password" placeholder="Create a password" />
              </div>

            {error && <div className="text-sm text-red-600">{error}</div>}

            <div className="text-center">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (mode === 'login' ? 'Logging in...' : 'Creating account...') : (mode === 'login' ? 'Login' : 'Create account')}
              </Button>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 border-t border-gray-100" />
              <div className="text-xs text-gray-400">or</div>
              <div className="flex-1 border-t border-gray-100" />
            </div>

            <div>
              <Button type="button" variant="ghost" className="w-full flex items-center justify-center gap-3">
                <img src="/placeholders/google-24x24.png" alt="Google" width={20} height={20} />
                <span className="text-sm">Continue with Google</span>
              </Button>
            </div>

            <div className="text-sm text-center text-gray-600">
              {mode === 'login' ? (
                <>
                  <a href="#" className="underline">Forgot Password?</a>
                  <div className="mt-2">Don’t have an account? <button type="button" onClick={() => setMode('signup')} className="underline">Sign up</button></div>
                </>
              ) : (
                <div>Already have an account? <button type="button" onClick={() => setMode('login')} className="underline">Login</button></div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
