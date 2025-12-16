"use client";
import { create } from "zustand";
import {
  createAssignments,
  createRungs,
  ensureGoalLabels,
  sanitizeEntries,
  traverseLadder,
  type Rung,
} from "@/lib/amida";

type State = {
  participants: string[];
  goals: string[];
  rows: number;
  rungs: Rung[];
  selectedStart: number | null;
  status: "editing" | "ready" | "animating" | "done";
  history: { at: number; mapping: Record<string, string> }[];
};

type Actions = {
  setParticipants: (names: string[]) => void;
  setGoals: (labels: string[]) => void;
  generate: () => void;
  pickStart: (index: number) => void;
  setStatus: (s: State["status"]) => void;
  saveHistory: () => void;
  reset: () => void;
  computeEnd: (start: number) => number;
};

export const useAmidaStore = create<State & Actions>((set, get) => ({
  participants: ["Aさん", "Bさん", "Cさん"],
  goals: ["景品1", "景品2", "景品3"],
  rows: 16,
  rungs: [],
  selectedStart: null,
  status: "editing",
  history: [],
  setParticipants: (names) => set((state) => {
    const entries = sanitizeEntries(names);
    const goals = ensureGoalLabels(state.goals, entries.length);
    return { participants: entries, goals, status: "editing" };
  }),
  setGoals: (labels) => set((state) => ({
    goals: ensureGoalLabels(labels, state.participants.length),
    status: "editing",
  })),
  generate: () => set((s) => ({
    rungs: createRungs(s.participants.length, s.rows),
    selectedStart: null,
    status: "ready",
  })),
  pickStart: (index) => set({ selectedStart: index, status: "animating" }),
  setStatus: (status) => set({ status }),
  saveHistory: () => set((s) => {
    try {
      const mapping = createAssignments(s.participants, s.goals, {
        cols: s.participants.length,
        rows: s.rows,
        rungs: s.rungs,
      });
      const next = [...s.history, { at: Date.now(), mapping }];
      if (typeof window !== "undefined") {
        localStorage.setItem("amida_history", JSON.stringify(next));
      }
      return { history: next };
    } catch {
      return {} as any;
    }
  }),
  reset: () => set({ rungs: [], selectedStart: null, status: "editing" }),
  computeEnd: (start) => {
    const { participants, rows, rungs } = get();
    return traverseLadder({ cols: participants.length, rows, rungs }, start);
  },
}));
