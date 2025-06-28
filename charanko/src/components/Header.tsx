// components/Header.tsx
"use client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMenuStore } from "@/store/useMenuStore";
import { useAuthStore } from "@/store/useAuthStore";
import { Menu as MenuIcon, X as CloseIcon, User as UserIcon } from "lucide-react";

export default function Header() {
  const { menuOpen, toggleMenu, closeMenu } = useMenuStore();
  const { user } = useAuthStore();

  return (
    <header className="border-b relative">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        {/* モバイル用ハンバーガー */}
        <button
          onClick={toggleMenu}
          aria-label="メニュー切替"
          className="md:hidden"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>

        <Link href="/" className="text-2xl font-bold text-primary">
          Charanko
        </Link>

        {/* デスクトップメニュー */}
        <NavigationMenu className="hidden md:block">
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
            {!user && (
              <NavigationMenuItem>
                <Link
                  href="/register"
                  className="text-muted-foreground hover:underline"
                >
                  会員登録
                </Link>
              </NavigationMenuItem>
            )}
            {user && (
              <NavigationMenuItem>
                <Link
                  href="/mypage"
                  className="text-muted-foreground hover:underline"
                >
                  マイページ
                </Link>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center gap-2">
          {user && (
            <div className="flex items-center gap-2 text-sm">
              <UserIcon size={16} />
              <span>{user.name}</span>
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* オーバーレイ：メニュー以外の領域をクリックガード */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden z-40"
          onClick={closeMenu}
        />
      )}

      {/* モバイルメニュー（常時レンダリング） */}
      <nav
        className={`
            fixed inset-0 bg-white p-6 flex flex-col space-y-4 md:hidden z-50
            transform transition-transform duration-300 ease-in-out w-5/6
            ${menuOpen ? "translate-x-0" : "-translate-x-full"}
            dark:bg-gray-800
          `}
      >
        <button
          onClick={closeMenu}
          aria-label="メニューを閉じる"
          className="absolute top-4 right-4"
        >
          <CloseIcon />
        </button>
        <Link href="/" onClick={closeMenu} className="text-lg font-medium">
          Home
        </Link>
        <Link href="/about" onClick={closeMenu} className="text-lg font-medium">
          About
        </Link>
        {!user && (
          <Link href="/register" onClick={closeMenu} className="text-lg font-medium">
            会員登録
          </Link>
        )}
        {user && (
          <>
            <Link href="/mypage" onClick={closeMenu} className="text-lg font-medium">
              マイページ
            </Link>
            <div className="flex items-center gap-2 text-lg font-medium">
              <UserIcon size={20} />
              <span>{user.name}</span>
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
