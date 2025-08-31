import type { Task } from "@/lib/types";

type Props = {
  task: Task;
};

export default function TaskCard({ task }: Props) {
  return (
    <div className="rounded-md border bg-background p-2 text-sm shadow-sm">
      <div className="font-medium">{task.title}</div>
      {task.subject && (
        <div className="text-xs text-muted-foreground">{task.subject}</div>
      )}
      {task.time && (
        <div className="text-xs mt-1">{task.time}</div>
      )}
    </div>
  );
}

