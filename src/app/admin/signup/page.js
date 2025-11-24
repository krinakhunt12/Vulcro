"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/components/ui/ToastProvider';

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(1),
  adminSecret: z.string().min(1),
}).refine((d) => d.password === d.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] });

function PasswordStrength({ password }) {
  if (!password) return <div className="text-sm text-gray-500">Enter a password</div>;
  const score = [/.{8,}/, /[A-Z]/, /[0-9]/, /[^A-Za-z0-9]/].reduce((s, rx) => s + (rx.test(password) ? 1 : 0), 0);
  const labels = ['Very weak', 'Weak', 'Okay', 'Strong', 'Very strong'];
  return <div className="text-sm text-gray-600">Strength: {labels[score]}</div>;
}

export default function AdminSignupPage() {
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, watch } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (values) => {
    try {
      // Avoid logging the full values object (can contain non-serializable/promises)
      console.log('Admin signup submit', { name: values.name, email: values.email });
      setLoading(true);
      // Only send the expected primitive fields to the server. React Hook Form
      // internals or DOM refs may sneak into `values` and cause circular
      // structure errors when stringifying.
      const payload = {
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        adminSecret: values.adminSecret,
      };

      const res = await fetch('/api/admin/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let json = {};
      try {
        json = await res.json();
      } catch (e) {
        console.warn('Could not parse JSON from /api/admin/signup response', e);
      }

      // Log only status and server message to avoid enumerating internal objects
      console.log('Signup response', res.status, json?.message ?? json);

      if (!res.ok) {
        toast?.push({ title: 'Signup failed', description: json?.message || `Status ${res.status}`, variant: 'destructive' });
        return;
      }
      toast?.push({ title: 'Admin created', description: 'You can now login', variant: 'success' });
      router.push('/admin/login');
    } catch (err) {
      console.error('Signup error', err);
      toast?.push({ title: 'Error', description: err.message || 'Unable to signup', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const pw = watch('password');

  return (
    <div className="-ml-64 -mt-20">
      <div className="min-h-screen flex">
        <div className="hidden md:flex md:w-1/2 items-center justify-center bg-black text-white">
        <div className="max-w-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white text-black rounded mb-6 font-bold">V</div>
          <h2 className="text-3xl font-bold mb-2">VULCRO Admin</h2>
          <p className="text-sm text-gray-300">Create an admin account to manage the store.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100">
            <h2 className="text-2xl font-semibold mb-4 text-black">Admin Signup</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4">
              <div>
                <label className="text-sm text-gray-700">Full name</label>
                <input {...register('name')} className="w-full border border-gray-200 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Email</label>
                <input {...register('email')} className="w-full border border-gray-200 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Password</label>
                <input {...register('password')} type="password" className="w-full border border-gray-200 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black" />
                <PasswordStrength password={pw} />
              </div>
              <div>
                <label className="text-sm text-gray-700">Confirm password</label>
                <input {...register('confirmPassword')} type="password" className="w-full border border-gray-200 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>
              <div>
                <label className="text-sm text-gray-700">Admin secret key</label>
                <input {...register('adminSecret')} className="w-full border border-gray-200 px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-black" />
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full bg-black text-white py-2 rounded">{loading ? 'Creating…' : 'Create admin'}</button>
              </div>
            </form>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
