// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // shadcn/ui の Button
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // クライアントマウントを検知
  useEffect(() => {
    setMounted(true);
  }, []);

  // マウント前は描画せず null を返す
  if (!mounted) return null;

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? "🌞 Light" : "🌜 Dark"}
    </Button>
  );
}
