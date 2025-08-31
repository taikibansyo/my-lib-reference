"use client";
import { create } from "zustand";
import type { Task } from "@/lib/types";

type State = {
  tasks: Task[];
};

type Actions = {
  add: (t: Omit<Task, "id">) => void;
  reset: () => void;
};

export const useBoardStore = create<State & Actions>((set) => ({
  tasks: [
    { id: "t1", title: "朝の会", subject: "", period: 1 },
    { id: "t2", title: "算数 ドリル", subject: "算数", period: 2 },
  ],
  add: (t) => set((s) => ({ tasks: [...s.tasks, { id: crypto.randomUUID(), ...t }] })),
  reset: () => set({ tasks: [] }),
}));

