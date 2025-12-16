"use client";
import PlayerInput from "@/components/amida/PlayerInput";
import AmidaCanvas from "@/components/amida/AmidaCanvas";
import ResultView from "@/components/amida/ResultView";
import { useAmidaStore } from "@/store/useAmidaStore";
import { Button } from "@/components/ui/button";

export default function Page() {
  const reset = useAmidaStore((s) => s.reset);
  const selected = useAmidaStore((s) => s.selectedStart);
  const computeEnd = useAmidaStore((s) => s.computeEnd);
  const goals = useAmidaStore((s) => s.goals);

  const endLabel = selected != null ? goals[computeEnd(selected)] : undefined;

  return (
    <main className="mx-auto w-full max-w-3xl p-4 space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-bold">あみだくじ</h1>
        <p className="text-sm text-gray-500">参加者を入力 → 生成 → スタートを選択 → ゴールを決定</p>
      </header>

      <section className="rounded-lg border p-4">
        <PlayerInput />
      </section>

      <section className="rounded-lg border p-4">
        <AmidaCanvas />
        {endLabel && (
          <div className="mt-3 text-center text-sm"><span className="font-medium">結果:</span> {endLabel}</div>
        )}
        <div className="mt-3 text-center">
          <Button size="sm" variant="ghost" onClick={reset}>やり直す</Button>
        </div>
      </section>

      <section className="rounded-lg border p-4">
        <ResultView />
      </section>
    </main>
  );
}

