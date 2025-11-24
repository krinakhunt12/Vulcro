"use client";

import React from 'react';

export default function CheckoutOrderItem({ item, onIncrease, onDecrease, onRemove }) {
  const id = item.id || item._id;
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-b-0">
      <img src={item.image || item.images?.[0] || '/placeholder.png'} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
      <div className="flex-1">
        <div className="font-medium text-sm text-gray-800">{item.title}</div>
        <div className="text-xs text-gray-500 mt-1">Size: {item.size || '-'} • Qty: {item.qty}</div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={() => onDecrease(id)} className="px-2 py-1 bg-gray-100 rounded-md text-sm">-</button>
          <div className="text-sm px-2">{item.qty}</div>
          <button onClick={() => onIncrease(id)} className="px-2 py-1 bg-gray-100 rounded-md text-sm">+</button>
          <button onClick={() => onRemove(id)} className="ml-4 text-sm text-red-600">Remove</button>
        </div>
      </div>

      <div className="text-sm font-semibold text-gray-800">₹{(Number(item.price) || 0) * (Number(item.qty) || 1)}</div>
    </div>
  );
}
