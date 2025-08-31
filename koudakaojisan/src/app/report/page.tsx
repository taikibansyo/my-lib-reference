"use client";
import { useBoardStore } from "@/store/useBoardStore";
import { buildWeeklyReportMarkdown } from "@/lib/report";
import { useMemo } from "react";

export default function Page() {
  const tasks = useBoardStore((s) => s.tasks);
  const md = useMemo(() => buildWeeklyReportMarkdown(tasks), [tasks]);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(md);
      alert("週報をコピーしました");
    } catch {
      // ignore
    }
  };
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">週報（表示・コピー）</h1>
      <div className="flex gap-2">
        <button className="rounded bg-primary text-primary-foreground text-sm px-3 py-1" onClick={copy}>コピー</button>
      </div>
      <pre className="border rounded p-3 overflow-auto text-sm whitespace-pre-wrap">{md}</pre>
    </div>
  );
}

