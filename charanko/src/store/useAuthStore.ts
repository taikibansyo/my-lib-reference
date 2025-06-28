import { create } from "zustand";

export type Address = {
  postalCode: string;
  prefecture: string;
  city: string;
  street: string;
  building?: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
};

type AuthState = {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => set({ user: null }),
}));