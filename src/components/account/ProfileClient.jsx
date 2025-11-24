"use client";

import React, { useState, useEffect, useRef } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import Input from '@/components/ui/Input';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ui/ToastProvider';
import Link from 'next/link';

export default function ProfileClient() {
  const { user, setAuthUser } = useAuth() || {};
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const toast = useToast();
  const initialised = useRef(false);

  useEffect(() => {
    if (user && !initialised.current) {
      setForm({
        name: user.name || user.email?.split('@')[0] || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      });
      initialised.current = true;
    }
  }, [user]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  }

  function openEdit() {
    setEditing(true);
    setForm({
      name: user?.name || user?.email?.split('@')[0] || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
    });
  }

  function closeEdit() {
    setEditing(false);
  }

  function saveProfile() {
    // In production call API to persist. Here, update AuthContext state so navbar and app update.
    const updated = { ...user, name: form.name, email: form.email, phone: form.phone, address: form.address };
    if (setAuthUser) setAuthUser(updated);
    toast?.push({ title: 'Profile updated', description: 'Your profile information was saved.' });
    setEditing(false);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-24">
              <Card className="p-4 space-y-4">
                <nav className="flex flex-col gap-2">
                  <Link href="/account" className="px-3 py-2 rounded text-sm font-medium bg-black text-white">My Profile</Link>
                  <Link href="/order/history" className="px-3 py-2 rounded text-sm hover:bg-gray-50">My Orders</Link>
                  <Link href="/wishlist" className="px-3 py-2 rounded text-sm hover:bg-gray-50">Wishlist</Link>
                  <Link href="#" onClick={() => { if (typeof window !== 'undefined') { localStorage.removeItem('vulcro_user'); window.location.href = '/'; } }} className="px-3 py-2 rounded text-sm hover:bg-gray-50">Logout</Link>
                </nav>
              </Card>
            </div>
          </aside>

          {/* Main */}
          <main className="md:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-extrabold">My Profile</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your personal details</p>
              </div>
              <div>
                <Button variant="ghost" onClick={openEdit}>Edit Profile</Button>
              </div>
            </div>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-28 h-28 rounded-full bg-black text-white flex items-center justify-center text-2xl font-semibold">{(user?.name || user?.email || 'U')[0]?.toUpperCase()}</div>
                </div>

                <div className="flex-1">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs text-gray-500">Full name</div>
                      <div className="text-lg font-medium text-gray-900">{user?.name || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-lg font-medium text-gray-900">{user?.phone || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="text-lg font-medium text-gray-900">{user?.email || '-'}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Address</div>
                      <div className="text-lg font-medium text-gray-900">{user?.address || '-'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </main>
        </div>
      </div>

      {/* Edit dialog */}
      {editing && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6">
          <div className="bg-black/50 absolute inset-0" onClick={closeEdit} />
          <div className="relative w-full max-w-2xl z-[10000]">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" name="name" value={form.name} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" value={form.email} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={form.phone} onChange={handleChange} />
                </div>
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" value={form.address} onChange={handleChange} />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={closeEdit}>Cancel</Button>
                <Button onClick={saveProfile}>Save</Button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
