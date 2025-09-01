"use client";
import { useState, useEffect } from "react";
import { useAmidaStore } from "@/store/useAmidaStore";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function PlayerInput() {
  const participants = useAmidaStore((s) => s.participants);
  const goals = useAmidaStore((s) => s.goals);
  const setParticipants = useAmidaStore((s) => s.setParticipants);
  const setGoals = useAmidaStore((s) => s.setGoals);
  const generate = useAmidaStore((s) => s.generate);

  const [namesText, setNamesText] = useState(participants.join("\n"));
  const [goalsText, setGoalsText] = useState(goals.join("\n"));

  useEffect(() => setNamesText(participants.join("\n")), [participants]);
  useEffect(() => setGoalsText(goals.join("\n")), [goals]);

  const onApply = () => {
    const names = namesText.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
    const labels = goalsText.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
    while (labels.length < names.length) labels.push(`ゴール${labels.length + 1}`);
    setParticipants(names);
    setGoals(labels.slice(0, names.length));
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <div className="space-y-2">
        <div className="text-sm font-medium">参加者（改行区切り）</div>
        <Textarea value={namesText} onChange={(e) => setNamesText(e.target.value)} rows={5} />
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium">ゴールのラベル（改行区切り）</div>
        <Textarea value={goalsText} onChange={(e) => setGoalsText(e.target.value)} rows={5} />
      </div>
      <div className="md:col-span-2 flex gap-2">
        <Button onClick={onApply} className="px-4">適用</Button>
        <Button onClick={generate} className="px-4" variant="secondary">あみだくじを生成</Button>
      </div>
    </div>
  );
}

