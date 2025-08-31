import type { Task } from "./types";

export function buildWeeklyReportMarkdown(tasks: Task[]): string {
  const lines: string[] = [];
  lines.push("# 週報");
  lines.push("");
  if (tasks.length === 0) {
    lines.push("- 今週の記録はありません。");
  } else {
    for (const t of tasks) {
      lines.push(`- ${t.period ?? "-"}校時 ${t.title}${t.subject ? `（${t.subject}）` : ""}`);
    }
  }
  lines.push("");
  lines.push("---");
  lines.push("先生コメント: よく頑張りました。");
  return lines.join("\n");
}

