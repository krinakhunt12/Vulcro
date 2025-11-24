'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { useToast } from './ToastProvider';
import { useAuth } from './auth/AuthContext';

export default function AddToCartButton({ product, className }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const handle = () => {
    if (!isAuthenticated) {
      toast.push({ type: 'warning', title: 'Please log in to continue' });
      return;
    }

    const id = product._id || product.id;
    const title = product.name || product.title || 'Product';
    const payload = { id, title, price: product.price, image: product.images?.[0] || product.image };
    dispatch(addToCart(payload));
    toast.push({ type: 'success', title: 'Added to cart', description: `${title} added to cart` });
  };

  return (
    <button onClick={handle} className={className || 'btn-primary px-6 py-3'}>
      Add to Cart
    </button>
  );
}
