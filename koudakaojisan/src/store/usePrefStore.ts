"use client";
import { create } from "zustand";

type State = {
  senseiPersonality: "gentle" | "cheerful" | "strict";
  level: 1 | 2 | 3;
};

type Actions = {
  setPersonality: (p: State["senseiPersonality"]) => void;
  setLevel: (l: State["level"]) => void;
};

export const usePrefStore = create<State & Actions>((set) => ({
  senseiPersonality: "gentle",
  level: 1,
  setPersonality: (p) => set({ senseiPersonality: p }),
  setLevel: (l) => set({ level: l }),
}));

