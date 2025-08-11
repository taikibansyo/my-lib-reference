// components/Header.tsx
"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { useMenuStore } from "@/store/useMenuStore";
import { useAuthStore } from "@/store/useAuthStore";
import DesktopMenu from "@/components/navigation/DesktopMenu";
import MobileMenu from "@/components/navigation/MobileMenu";
import { SearchBox } from "@/components/SearchBox";
import {
  Menu as MenuIcon,
  X as CloseIcon,
  User as UserIcon,
} from "lucide-react";

export default function Header() {
  const { menuOpen, toggleMenu, closeMenu } = useMenuStore();
  const { user } = useAuthStore();

  const handleSearch = (query: string) => {
    console.log('検索クエリ:', query);
    // 今後、検索機能を実装する際に使用
  };

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
        <DesktopMenu />

        {/* 検索窓 */}
        <div className="hidden md:block">
          <SearchBox 
            variant="compact" 
            onSearch={handleSearch}
            className="w-auto"
          />
        </div>

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
      <MobileMenu />
    </header>
  );
}
