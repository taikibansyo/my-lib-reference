"use client";
import { usePrefStore } from "@/store/usePrefStore";

export default function Page() {
  const personality = usePrefStore((s) => s.senseiPersonality);
  const level = usePrefStore((s) => s.level);
  const setPersonality = usePrefStore((s) => s.setPersonality);
  const setLevel = usePrefStore((s) => s.setLevel);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">設定</h1>
      <div className="grid gap-4 md:max-w-md">
        <div className="border rounded p-3">
          <div className="text-sm font-medium mb-2">先生の性格</div>
          <select
            value={personality}
            onChange={(e) => setPersonality(e.target.value as any)}
            className="border rounded px-2 py-1 text-sm"
          >
            <option value="gentle">やさしい</option>
            <option value="cheerful">げんき</option>
            <option value="strict">きびしい</option>
          </select>
        </div>
        <div className="border rounded p-3">
          <div className="text-sm font-medium mb-2">レベル</div>
          <input
            type="range"
            min={1}
            max={3}
            step={1}
            value={level}
            onChange={(e) => setLevel(parseInt(e.target.value) as any)}
          />
          <div className="text-xs text-muted-foreground mt-1">現在: {level}</div>
        </div>
      </div>
    </div>
  );
}

