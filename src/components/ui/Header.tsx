// components/Header.tsx
"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Header() {
  return (
    <header className="border-b">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          Charanko
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-row gap-4">
            <NavigationMenuItem>
              <Link href="/" className="text-muted-foreground hover:underline">
                Home
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link
                href="/about"
                className="text-muted-foreground hover:underline"
              >
                About
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <ThemeToggle />
      </div>
    </header>
  );
}
