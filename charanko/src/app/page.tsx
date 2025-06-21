import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Page() {
  return (
    <main className="p-10 min-h-screen bg-background text-foreground space-y-4">
      <h1 className="text-2xl font-bold">テーマ切り替えテスト</h1>
      <ThemeToggle />
      <Button>確認ボタン</Button>
    </main>
  );
}
