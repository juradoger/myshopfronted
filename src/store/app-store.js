import { create } from 'zustand';

export const useAppStore = create((set) => ({
  isCartOpen: false,
  setIsCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
}));
