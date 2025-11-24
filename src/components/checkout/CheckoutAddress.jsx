"use client";

import React from 'react';

export default function CheckoutAddress({ value = {}, onChange = () => {} }) {
  const update = (partial) => onChange({ ...value, ...partial });

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700">Full name</label>
          <input value={value.name || ''} onChange={(e) => update({ name: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700">Phone</label>
          <input value={value.phone || ''} onChange={(e) => update({ phone: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>

      <div>
        <label className="text-sm font-medium text-gray-700">Address</label>
        <input value={value.line1 || ''} onChange={(e) => update({ line1: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" placeholder="House, street, landmark" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
        <div>
          <label className="text-sm font-medium text-gray-700">City</label>
          <input value={value.city || ''} onChange={(e) => update({ city: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">State</label>
          <input value={value.state || ''} onChange={(e) => update({ state: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">Pincode</label>
          <input value={value.pincode || ''} onChange={(e) => update({ pincode: e.target.value })} className="mt-1 w-full border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-200" />
        </div>
      </div>
    </div>
  );
}
