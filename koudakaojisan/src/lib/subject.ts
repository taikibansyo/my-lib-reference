import type { Subject } from "./types";

export const SUBJECTS: Subject[] = [
  { id: "jp", name: "国語", color: "#f59e0b" },
  { id: "math", name: "算数", color: "#3b82f6" },
  { id: "sci", name: "理科", color: "#10b981" },
  { id: "soc", name: "社会", color: "#ef4444" },
  { id: "eng", name: "英語", color: "#8b5cf6" },
];

export function getSubjectName(id?: string) {
  return SUBJECTS.find((s) => s.id === id)?.name ?? "";
}

