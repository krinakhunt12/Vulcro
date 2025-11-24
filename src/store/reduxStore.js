import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';

// Simple localStorage persistence helpers
const CART_KEY = 'vulcro_cart';
const WISHLIST_KEY = 'vulcro_wishlist';

function loadState() {
  try {
    const cart = JSON.parse(typeof window !== 'undefined' ? window.localStorage.getItem(CART_KEY) || 'null' : 'null');
    const wishlist = JSON.parse(typeof window !== 'undefined' ? window.localStorage.getItem(WISHLIST_KEY) || 'null' : 'null');
    return {
      cart: { items: cart || [] },
      wishlist: { items: wishlist || [] }
    };
  } catch (e) {
    return undefined;
  }
}

function saveState(state) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(CART_KEY, JSON.stringify(state.cart.items || []));
    window.localStorage.setItem(WISHLIST_KEY, JSON.stringify(state.wishlist.items || []));
  } catch (e) {
    // ignore
  }
}

const preloaded = typeof window !== 'undefined' ? loadState() : undefined;

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: preloaded,
});

// subscribe to save
if (typeof window !== 'undefined') {
  store.subscribe(() => {
    saveState(store.getState());
  });
}

export default store;
