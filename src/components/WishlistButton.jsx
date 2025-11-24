"use client";

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '@/store/wishlistSlice';
import { useToast } from './ToastProvider';
import { useAuth } from './auth/AuthContext';

export default function WishlistButton({ product, className }) {
  const dispatch = useDispatch();
  const toast = useToast();
  const { isAuthenticated } = useAuth();
  const wishlist = useSelector((s) => s.wishlist.items || []);
  const id = product?._id || product?.id;
  const exists = wishlist.find((i) => String(i.id) === String(id));

  function handleToggle() {
    if (!isAuthenticated) {
      toast.push({ type: 'warning', title: 'Please log in to continue' });
      return;
    }
    if (exists) {
      dispatch(removeFromWishlist(id));
      toast.push({ type: 'success', title: 'Removed from wishlist' });
    } else {
      dispatch(addToWishlist({ id, title: product.name || product.title, image: product.images?.[0] }));
      toast.push({ type: 'success', title: 'Added to wishlist' });
    }
  }

  return (
    <button onClick={handleToggle} className={className || 'p-2'} aria-label="Toggle wishlist">
      {exists ? '♥' : '♡'}
    </button>
  );
}
