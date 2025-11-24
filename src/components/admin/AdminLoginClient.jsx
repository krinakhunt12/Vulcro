'use client';

import { useState } from 'react';

export default function AdminLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // placeholder: implement real auth
    console.log('login', { email, password });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden">
      {/* Subtle left background pattern */}
      <svg className="absolute left-0 top-0 h-full w-1/2 text-gray-100" preserveAspectRatio="none" viewBox="0 0 600 800" fill="none" aria-hidden>
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopColor="#f7f7f7" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="800" fill="url(#g1)" />
        <g opacity="0.035" fill="none" stroke="#000" strokeWidth="2">
          <path d="M40 120c120-80 260-80 380 0s260 80 380 0" />
          <path d="M40 220c120-80 260-80 380 0s260 80 380 0" />
          <path d="M40 320c120-80 260-80 380 0s260 80 380 0" />
        </g>
      </svg>

      <div className="relative z-10 w-full max-w-md px-6">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-md p-8">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 flex items-center justify-center rounded-md bg-black text-white font-bold">V</div>
            <span className="ml-3 text-lg font-semibold text-black">Vulcro</span>
          </div>

          <h2 className="text-2xl font-bold text-black mb-6">Admin Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="text-xs text-gray-700">Email</span>
              <div className="mt-2 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-black text-sm"
                  placeholder="admin@vulcro.com"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 10-8 0 4 4 0 008 0z" />
                </svg>
              </div>
            </label>

            <label className="block">
              <span className="text-xs text-gray-700">Password</span>
              <div className="mt-2 relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 text-black text-sm"
                  placeholder="Enter your password"
                />
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3 .895 3 2v1H9v-1c0-1.105 1.343-2 3-2z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11V8a5 5 0 0110 0v3" />
                </svg>
              </div>
            </label>

            <div className="flex items-center justify-between">
              <a href="#" className="text-xs text-gray-600 hover:underline">Forgot Password?</a>
            </div>

            <button type="submit" className="w-full mt-2 px-4 py-3 bg-black text-white rounded-lg text-sm font-medium hover:opacity-95 transition">
              Login to Dashboard
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">Secure · Enterprise Ready · Vulcro</p>
      </div>
    </div>
  );
}
