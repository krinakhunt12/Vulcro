"use client";
import QuantitySelector from './QuantitySelector';
import { useState, useEffect } from 'react';

export default function CartItem({ item, onRemove, onQtyChange, onSizeChange }) {
  // controlled via parent when handlers are provided
  const [localQty, setLocalQty] = useState(item.qty || 1);
  const [localSize, setLocalSize] = useState(item.size || 'M');

  useEffect(() => {
    setLocalQty(item.qty || 1);
  }, [item.qty]);

  useEffect(() => {
    setLocalSize(item.size || 'M');
  }, [item.size]);

  function handleQty(n) {
    setLocalQty(n);
    onQtyChange?.(item.id, n);
  }

  function handleSize(e) {
    const s = e.target.value;
    setLocalSize(s);
    onSizeChange?.(item.id, s);
  }

  return (
    <div className="flex items-center gap-4 p-4 border border-gray-50 rounded-lg shadow-sm">
      <img src={item.image} alt={item.title} width={100} height={100} className="w-24 h-24 object-cover rounded-md" />

      <div className="flex-1">
        <div className="flex items-start justify-between">
          <div>
            <div className="font-medium text-sm">{item.title}</div>
            <div className="text-xs text-gray-600 mt-1">{item.color || 'Pastel'}</div>
          </div>

          <button onClick={() => onRemove?.(item.id)} aria-label={`Remove ${item.title}`} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="mt-3 flex items-center gap-4 flex-wrap">
          <div className="text-sm">
            <label className="text-sm text-gray-600 mr-2">Size</label>
            <select value={localSize} onChange={handleSize} className="border border-gray-100 rounded-md px-2 py-1 text-sm">
              <option>S</option>
              <option>M</option>
              <option>L</option>
              <option>XL</option>
            </select>
          </div>

          <div>
            <QuantitySelector initial={localQty} onChange={handleQty} />
          </div>

          <div className="ml-auto font-semibold">₹{item.price * localQty}</div>
        </div>
      </div>
    </div>
  );
}
