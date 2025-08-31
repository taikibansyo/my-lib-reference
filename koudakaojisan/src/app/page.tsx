"use client";
import Timetable from "@/components/timetable/Timetable";
import AddQuick from "@/components/timetable/AddQuick";
import SenseiBubble from "@/components/common/SenseiBubble";
import { useBoardStore } from "@/store/useBoardStore";
import { randomSenseiMessage } from "@/lib/sensei";

export default function Page() {
  const tasks = useBoardStore((s) => s.tasks);
  const add = useBoardStore((s) => s.add);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">今日（時間割）</h1>
      <Timetable tasks={tasks} />
      <SenseiBubble message={randomSenseiMessage()} />
      <AddQuick onAdd={add} />
    </div>
  );
}
