import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [] // array of { id, title, image }
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action) {
      const item = action.payload;
      const id = item._id || item.id;
      const exists = state.items.find((i) => String(i.id) === String(id));
      if (!exists) {
        state.items.push({ ...item, id });
      }
    },
    removeFromWishlist(state, action) {
      const id = action.payload;
      state.items = state.items.filter((i) => String(i.id) !== String(id));
    },
    clearWishlist(state) {
      state.items = [];
    },
    setWishlist(state, action) {
      state.items = action.payload || [];
    }
  }
});

export const { addToWishlist, removeFromWishlist, clearWishlist, setWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
