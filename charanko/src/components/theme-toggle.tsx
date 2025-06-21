// components/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button"; // shadcn/ui の Button

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

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
