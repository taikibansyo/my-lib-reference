import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="p-10 min-h-screen bg-background text-foreground space-y-4">
      <h1 className="text-2xl font-bold">テーマ切り替えテスト</h1>
      <Button>確認ボタン</Button>
      <div className="p-4 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>ようこそ MyApp へ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              ここにアプリの説明や操作ガイドを置くと、ぐっと見栄えが良くなります。
            </p>
            {/* ボタン例 */}
            <div className="flex gap-2">
              <Button>はじめる</Button>
              <Button variant="secondary">ヘルプ</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
