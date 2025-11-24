'use client';

import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/components/ToastProvider';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const { isAuthenticated } = useAuth();
  const { push } = useToast();

  const addItem = (product, qty = 1) => {
    if (!isAuthenticated) {
      push({ type: 'warning', title: 'Please login to continue' });
      return { ok: false, error: 'not_authenticated' };
    }

    setItems((s) => {
      const found = s.find((it) => it.id === product.id);
      if (found) return s.map((it) => (it.id === product.id ? { ...it, qty: it.qty + qty } : it));
      return [...s, { ...product, qty }];
    });

    const title = product.name || product.title || 'Product';
    push({ type: 'success', title: 'Added to cart', description: `${title} has been added to your cart.` });
    return { ok: true };
  };

  const removeItem = (id) => {
    setItems((s) => s.filter((i) => i.id !== id));
  };

  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
