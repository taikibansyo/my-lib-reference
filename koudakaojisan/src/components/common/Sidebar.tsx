import Link from "next/link";
import clsx from "clsx";

type Props = { className?: string };

export default function Sidebar({ className }: Props) {
  return (
    <aside className={clsx("border-r p-4", className)}>
      <div className="text-xs uppercase text-muted-foreground mb-2">メニュー</div>
      <ul className="space-y-1 text-sm">
        <li><Link className="hover:underline" href="/">今日（時間割）</Link></li>
        <li><Link className="hover:underline" href="/materials">資料</Link></li>
        <li><Link className="hover:underline" href="/journal">学級日誌</Link></li>
        <li><Link className="hover:underline" href="/report">週報</Link></li>
        <li><Link className="hover:underline" href="/settings">設定</Link></li>
      </ul>
    </aside>
  );
}

