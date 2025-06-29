// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // shadcn/ui の Button
import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

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
      className="opacity-60 hover:opacity-100 transition-opacity"
    >
      {theme === "dark" ? (
        <Moon className="w-4 h-4" />
      ) : (
        <Sun className="w-4 h-4" />
      )}
    </Button>
  );
}
