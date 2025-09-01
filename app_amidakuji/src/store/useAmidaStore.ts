"use client";
import { create } from "zustand";

export type Rung = { row: number; col: number };

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
  saveHistory: (mapping: Record<string, string>) => void;
  reset: () => void;
  computeEnd: (start: number) => number;
};

function createRungs(cols: number, rows: number): Rung[] {
  const rungs: Rung[] = [];
  for (let r = 0; r < rows; r++) {
    if (Math.random() < 0.6) {
      const possible: number[] = [];
      for (let c = 0; c < cols - 1; c++) {
        if (!rungs.some((x) => x.row === r && (x.col === c || x.col === c - 1 || x.col === c + 1))) {
          possible.push(c);
        }
      }
      if (possible.length) {
        const c = possible[Math.floor(Math.random() * possible.length)];
        rungs.push({ row: r, col: c });
      }
    }
  }
  return rungs.sort((a, b) => a.row - b.row);
}

export const useAmidaStore = create<State & Actions>((set, get) => ({
  participants: ["Aさん", "Bさん", "Cさん"],
  goals: ["景品1", "景品2", "景品3"],
  rows: 16,
  rungs: [],
  selectedStart: null,
  status: "editing",
  history: [],
  setParticipants: (names) => set((s) => ({
    participants: names.filter((n) => n.trim() !== ""),
    goals: (() => {
      const len = names.filter((n) => n.trim() !== "").length;
      const g = [...s.goals];
      if (g.length < len) {
        for (let i = g.length; i < len; i++) g.push(`ゴール${i + 1}`);
      }
      return g.slice(0, len);
    })(),
    status: "editing",
  })),
  setGoals: (labels) => set({ goals: labels, status: "editing" }),
  generate: () => set((s) => ({
    rungs: createRungs(s.participants.length, s.rows),
    selectedStart: null,
    status: "ready",
  })),
  pickStart: (index) => set({ selectedStart: index, status: "animating" }),
  setStatus: (status) => set({ status }),
  saveHistory: (mapping) => set((s) => {
    try {
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
    const cols = participants.length;
    let c = start;
    for (let r = 0; r < rows; r++) {
      if (rungs.some((x) => x.row === r && x.col === c)) {
        c = Math.min(c + 1, cols - 1);
      } else if (rungs.some((x) => x.row === r && x.col === c - 1)) {
        c = Math.max(c - 1, 0);
      }
    }
    return c;
  },
}));

