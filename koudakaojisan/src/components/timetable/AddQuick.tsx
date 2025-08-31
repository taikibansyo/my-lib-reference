"use client";
import { useState } from "react";
import type { Task } from "@/lib/types";

type Props = {
  onAdd: (task: Omit<Task, "id">) => void;
};

export default function AddQuick({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [period, setPeriod] = useState(1);
  return (
    <div className="fixed right-4 bottom-4 md:right-8 md:bottom-8">
      <div className="rounded-xl border bg-background p-3 shadow-lg space-y-2">
        <div className="text-sm font-medium">クイック追加</div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="タイトル"
          className="w-64 border rounded px-2 py-1 text-sm"
        />
        <div className="flex items-center gap-2 text-sm">
          <label>校時:</label>
          <select
            className="border rounded px-2 py-1"
            value={period}
            onChange={(e) => setPeriod(parseInt(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>
        <button
          className="w-full rounded bg-primary text-primary-foreground text-sm py-1 disabled:opacity-50"
          disabled={!title}
          onClick={() => {
            onAdd({ title, period, subject: undefined, time: undefined });
            setTitle("");
            setPeriod(1);
          }}
        >
          追加
        </button>
      </div>
    </div>
  );
}

