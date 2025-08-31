import TaskCard from "./TaskCard";
import type { Task } from "@/lib/types";

type Props = {
  tasks: Task[];
};

const hours = [1, 2, 3, 4, 5, 6];

export default function Timetable({ tasks }: Props) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-2">
        <div />
        {hours.map((h) => (
          <div key={h} className="text-center text-xs text-muted-foreground">
            {h}校時
          </div>
        ))}
        <div className="text-xs text-muted-foreground">今日</div>
        {hours.map((h) => (
          <div key={`cell-${h}`} className="min-h-[72px] border rounded-md p-2">
            {tasks
              .filter((t) => t.period === h)
              .map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

