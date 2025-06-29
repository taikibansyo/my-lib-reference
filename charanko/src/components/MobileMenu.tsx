"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMenuStore } from "@/store/useMenuStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { X as CloseIcon, User as UserIcon } from "lucide-react";

export default function MobileMenu() {
  const { menuOpen, closeMenu } = useMenuStore();
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
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
      
      <Link 
        href="/" 
        onClick={closeMenu} 
        className={cn(
          "text-lg font-medium opacity-60 hover:opacity-100 transition-opacity",
          pathname === "/" && "opacity-100 text-accent-foreground"
        )}
      >
        Home
      </Link>
      
      <Link 
        href="/about" 
        onClick={closeMenu} 
        className={cn(
          "text-lg font-medium opacity-60 hover:opacity-100 transition-opacity",
          pathname === "/about" && "opacity-100 text-accent-foreground"
        )}
      >
        About
      </Link>
      
      {!user && (
        <Link
          href="/register"
          onClick={closeMenu}
          className={cn(
            "text-lg font-medium opacity-60 hover:opacity-100 transition-opacity",
            pathname === "/register" && "opacity-100 text-accent-foreground"
          )}
        >
          会員登録
        </Link>
      )}
      
      {user && (
        <>
          <Link
            href="/mypage"
            onClick={closeMenu}
            className={cn(
              "text-lg font-medium opacity-60 hover:opacity-100 transition-opacity",
              pathname === "/mypage" && "opacity-100 text-accent-foreground"
            )}
          >
            マイページ
          </Link>
          <div className="flex items-center gap-2 text-lg font-medium">
            <UserIcon size={20} />
            <span>{user.name}</span>
          </div>
        </>
      )}
    </nav>
  );
}