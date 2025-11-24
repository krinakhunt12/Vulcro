"use client";

import React from 'react';
import CheckoutOrderItem from './CheckoutOrderItem';

export default function CheckoutSummary({ items = [], subtotal = 0, shipping = 0, tax = 0, total = 0, onIncrease, onDecrease, onRemove }) {
  return (
    <div>
      <div className="space-y-4">
        {items.map((it) => (
          <CheckoutOrderItem key={it.id || it._id} item={it} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
        ))}
      </div>

      <div className="border-t border-gray-100 mt-6 pt-4 text-sm space-y-3">
        <div className="flex items-center justify-between text-gray-600"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="flex items-center justify-between text-gray-600"><span>Delivery Charges</span><span>₹{shipping}</span></div>
        <div className="flex items-center justify-between text-gray-600"><span>Tax (GST)</span><span>₹{tax}</span></div>
        <div className="flex items-center justify-between font-semibold text-lg"><span>Total</span><span className="text-xl">₹{total}</span></div>
      </div>
    </div>
  );
}
