import { create } from "zustand";


export const useAdminStore = create((set) => ({
  admin: null,
  isAuthenticated: false,
  setAdmin: (admin) => set({ admin, isAuthenticated: !!admin }),
  clearAdmin: () => set({ admin: null, isAuthenticated: false }),
}));
