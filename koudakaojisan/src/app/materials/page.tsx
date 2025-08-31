"use client";
import { useMaterialStore } from "@/store/useMaterialStore";
import Empty from "@/components/common/Empty";

export default function Page() {
  const list = useMaterialStore((s) => s.materials);
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">資料</h1>
      {list.length === 0 ? (
        <Empty title="資料がありません" description="右下のクイック追加から登録" />
      ) : (
        <ul className="space-y-2">
          {list.map((m) => (
            <li key={m.id} className="border rounded p-3">
              <div className="font-medium">{m.title}</div>
              {m.url && <a className="text-xs text-blue-600 underline" href={m.url}>{m.url}</a>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

