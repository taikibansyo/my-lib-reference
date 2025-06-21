"use client";
import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex gap-2">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        onClick={() => setTheme("light")}
      >
        <Sun className="w-4 h-4" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        onClick={() => setTheme("dark")}
      >
        <Moon className="w-4 h-4" />
      </Button>
    </div>
  );
}
