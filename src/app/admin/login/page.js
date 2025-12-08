"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/ToastProvider';
import { useAdminStore } from '@/store/adminStore';

const schema = z.object({
    email: z.string().email({ message: 'Enter a valid email' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

export default function AdminLoginPage() {
    const router = useRouter();
    const toast = useToast();
    const { login } = useAdminStore();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async(values) => {
        try {
            console.log('[Login] Starting login for:', values.email);
            setLoading(true);
            const payload = { email: values.email, password: values.password };
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            console.log('[Login] Response status:', res.status);

            let json = {};
            try {
                json = await res.json();
            } catch (e) {
                console.warn('[Login] Could not parse JSON response', e);
            }

            console.log('[Login] Response data:', json);

            if (!res.ok) {
                const errorMessage = (json && (json.message || json.error)) || res.statusText || `HTTP ${res.status}`;
                console.error('[Login] Login failed:', errorMessage, json);
                toast?.push({ title: 'Login failed', description: errorMessage || 'Invalid credentials', variant: 'destructive' });
                return;
            }

            // Store token and admin data in the store
            if (json.token && json.admin) {
                console.log('[Login] Storing token and admin data...');
                login({ 
                    admin: json.admin, 
                    token: json.token, 
                    role: json.admin.role || 'admin' 
                });
            }

            console.log('[Login] Login successful, checking cookies...');
            console.log('[Login] Cookies:', document.cookie);

            toast?.push({ title: 'Logged in', description: 'Welcome back', variant: 'success' });

            console.log('[Login] Redirecting to /admin/dashboard...');
            if (typeof window !== 'undefined') {
                window.location.assign('/admin/dashboard');
            } else {
                router.push('/admin/dashboard');
            }
        } catch (err) {
            console.error('[Login] Error during login:', err);
            toast?.push({ title: 'Login error', description: err.message || 'Unable to login', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    };

    // Prevent hydration mismatch by only rendering form after client mount
    if (!mounted) {
        return (
            <div className="-ml-64 -mt-20">
                <div className="min-h-screen flex bg-white items-center justify-center">
                    <div className="text-gray-400">Loading...</div>
                </div>
            </div>
        );
    }

    return (
        <div className="-ml-64 -mt-20">
            <div className="min-h-screen flex bg-white">
                <aside className="hidden md:flex md:w-1/2 items-center justify-center bg-black text-white">
                    <div className="max-w-md p-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-white text-black rounded mb-6 font-bold text-lg">V</div>
                        <h2 className="text-3xl font-bold mb-2">VULCRO Admin</h2>
                        <p className="text-sm text-gray-300">Manage products, orders and customers from a single place.</p>
                    </div>
                </aside>

                <main className="flex-1 flex items-center justify-center p-8">
                    <div className="w-full max-w-md">
                        <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="text-2xl font-semibold mb-4 text-black">Admin Login</h3>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label htmlFor="email" className="text-sm text-gray-700">Email</label>
                                    <input
                                        id="email"
                                        {...register('email')}
                                        className={`w-full border ${errors.email ? 'border-red-400' : 'border-gray-200'} px-3 py-2 rounded mt-1 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                                        placeholder="you@example.com"
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                    />
                                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="password" className="text-sm text-gray-700">Password</label>
                                    <div className="relative">
                                        <input
                                            id="password"
                                            {...register('password')}
                                            type={showPassword ? 'text' : 'password'}
                                            className={`w-full border ${errors.password ? 'border-red-400' : 'border-gray-200'} px-3 py-2 rounded mt-1 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black`}
                                            placeholder="Enter your password"
                                            aria-invalid={errors.password ? 'true' : 'false'}
                                        />
                                        <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-2 text-sm text-gray-500">
                                            {showPassword ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password.message}</p>}
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded disabled:opacity-60 flex items-center justify-center gap-2"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                                        </svg>
                                    ) : null}
                                    <span>{loading ? 'Logging in…' : 'Login'}</span>
                                </button>
                            </form>

                            <div className="text-center text-sm text-gray-500 mt-3">
                                <Link href="/admin/signup" className="text-black underline">Create an admin account</Link>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}