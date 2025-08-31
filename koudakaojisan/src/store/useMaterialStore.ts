"use client";
import { create } from "zustand";

type Material = { id: string; title: string; url?: string };

type State = { materials: Material[] };
type Actions = {
  add: (m: Omit<Material, "id">) => void;
  remove: (id: string) => void;
};

export const useMaterialStore = create<State & Actions>((set) => ({
  materials: [
    { id: "m1", title: "学習プリントA" },
    { id: "m2", title: "図形カード" },
  ],
  add: (m) => set((s) => ({ materials: [...s.materials, { id: crypto.randomUUID(), ...m }] })),
  remove: (id) => set((s) => ({ materials: s.materials.filter((x) => x.id !== id) })),
}));

