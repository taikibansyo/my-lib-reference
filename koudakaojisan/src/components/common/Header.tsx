"use client";
import Link from "next/link";
import clsx from "clsx";

type Props = { className?: string };

export default function Header({ className }: Props) {
  return (
    <header className={clsx("border-b bg-background/80 backdrop-blur", className)}>
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl">Koudakaojisan</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link className="hover:underline" href="/">今日</Link>
          <Link className="hover:underline" href="/materials">資料</Link>
          <Link className="hover:underline" href="/journal">学級日誌</Link>
          <Link className="hover:underline" href="/report">週報</Link>
          <Link className="hover:underline" href="/settings">設定</Link>
        </nav>
      </div>
    </header>
  );
}

