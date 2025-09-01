"use client";
import { useMemo, useState } from "react";
import { useAmidaStore } from "@/store/useAmidaStore";
import { Button } from "@/components/ui/button";

export default function ResultView() {
  const { participants, goals, computeEnd, status, selectedStart } = useAmidaStore();
  const [copied, setCopied] = useState(false);

  const lines = useMemo(() => {
    return participants.map((p, i) => {
      const e = computeEnd(i);
      return `${p} → ${goals[e] ?? `ゴール${e + 1}`}`;
    });
  }, [participants, goals, computeEnd]);

  const highlight = selectedStart != null ? computeEnd(selectedStart) : null;

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">結果</div>
        <Button size="sm" onClick={onCopy}>{copied ? "コピーしました" : "テキストをコピー"}</Button>
      </div>
      <ul className="text-sm divide-y rounded-md border">
        {participants.map((p, i) => {
          const e = computeEnd(i);
          const g = goals[e] ?? `ゴール${e + 1}`;
          const active = status !== "editing" && selectedStart != null && i === selectedStart;
          return (
            <li key={i} className={`flex items-center justify-between px-3 py-2 ${active ? "bg-emerald-50" : ""}`}>
              <span className="text-gray-900">{p}</span>
              <span className={`text-gray-500 ${highlight === e && active ? "text-emerald-600 font-medium" : ""}`}>→ {g}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

