import { create } from "zustand";

type MenuState = {
  menuOpen: boolean;
  toggleMenu: () => void;
  closeMenu: () => void;
};

export const useMenuStore = create<MenuState>((set) => ({
  menuOpen: false,
  toggleMenu: () => set((state) => ({ menuOpen: !state.menuOpen })),
  closeMenu: () => set({ menuOpen: false }),
}));
