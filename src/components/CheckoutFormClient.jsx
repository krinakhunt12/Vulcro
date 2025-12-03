"use client";

import { useState } from 'react';

export default function CheckoutFormClient() {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const fd = new FormData(e.target);
    // placeholder: send fd to API
    console.log('Checkout form submitted', Object.fromEntries(fd.entries()));
    await new Promise((r) => setTimeout(r, 700));
    setSubmitting(false);
    alert('Checkout submitted (demo)');
  };

  return (
    <form className="space-y-8" onSubmit={handleSubmit}>
      <div className="card p-6">
        <h2 className="text-lg font-medium mb-4">Customer information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <div className="text-sm text-[--muted] mb-1">Full name</div>
            <input name="name" type="text" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label className="block">
            <div className="text-sm text-[--muted] mb-1">Mobile number</div>
            <input name="phone" type="tel" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label className="block sm:col-span-2">
            <div className="text-sm text-[--muted] mb-1">Email</div>
            <input name="email" type="email" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium mb-4">Shipping address</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label>
            <div className="text-sm text-[--muted] mb-1">House / Flat no.</div>
            <input name="house" type="text" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label>
            <div className="text-sm text-[--muted] mb-1">Street / Locality</div>
            <input name="street" type="text" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label>
            <div className="text-sm text-[--muted] mb-1">Area / Landmark</div>
            <input name="area" type="text" className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label>
            <div className="text-sm text-[--muted] mb-1">City</div>
            <input name="city" type="text" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label>
            <div className="text-sm text-[--muted] mb-1">State</div>
            <input name="state" type="text" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>

          <label>
            <div className="text-sm text-[--muted] mb-1">Pincode</div>
            <input name="pincode" type="text" required className="w-full border border-[--divider] rounded-md px-3 py-2 bg-transparent text-[--foreground]" />
          </label>
        </div>
      </div>

      <div className="card p-6">
        <h2 className="text-lg font-medium mb-4">Payment</h2>

        <div className="flex flex-col gap-4">
          <button type="button" className="w-full btn btn-primary px-4 py-3" aria-label="Pay with Razorpay">Pay with Razorpay</button>

          <label className="flex items-center gap-3">
            <input type="radio" name="payment" defaultChecked />
            <span className="text-sm">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button type="submit" disabled={submitting} className="btn btn-primary px-6 py-3 shadow-md">
          {submitting ? 'Submitting...' : 'Proceed to Payment'}
        </button>
      </div>
    </form>
  );
}
