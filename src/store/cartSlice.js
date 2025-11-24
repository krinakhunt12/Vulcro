import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, title, price, image, qty, size, color }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const item = action.payload;
      const id = item._id || item.id;
      const existing = state.items.find((i) => String(i.id) === String(id));
      if (existing) {
        existing.qty = (existing.qty || 1) + (item.qty || 1);
      } else {
        state.items.push({ ...item, id, qty: item.qty || 1 });
      }
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => String(i.id) !== String(id));
    },
    increaseQty(state, action) {
      const id = action.payload;
      const it = state.items.find((i) => String(i.id) === String(id));
      if (it) it.qty = (it.qty || 1) + 1;
    },
    decreaseQty(state, action) {
      const id = action.payload;
      const it = state.items.find((i) => String(i.id) === String(id));
      if (it) it.qty = Math.max(1, (it.qty || 1) - 1);
    },
    clearCart(state) {
      state.items = [];
    },
    setCart(state, action) {
      state.items = action.payload || [];
    }
  }
});

export const { addToCart, removeFromCart, increaseQty, decreaseQty, clearCart, setCart } = cartSlice.actions;
export default cartSlice.reducer;
