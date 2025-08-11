"use client";

import NavigationLink from "./NavigationLink";
import { usePathname } from "next/navigation";
import { useMenuStore } from "@/store/useMenuStore";
import { useAuthStore } from "@/store/useAuthStore";
import { cn } from "@/lib/utils";
import { X as CloseIcon, User as UserIcon } from "lucide-react";
import { navigationMenuItemLinkStyle } from "@/components/ui/navigation-menu";
import { SearchBox } from "@/components/SearchBox";

export default function MobileMenu() {
  const { menuOpen, closeMenu } = useMenuStore();
  const { user } = useAuthStore();
  const pathname = usePathname();

  const handleSearch = (query: string) => {
    console.log('検索クエリ:', query);
    closeMenu();
    // 今後、検索機能を実装する際に使用
  };

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

      {/* モバイル検索窓 */}
      <div className="mb-4">
        <SearchBox 
          onSearch={handleSearch}
          placeholder="記事を検索..."
          className="w-full"
        />
      </div>

      <NavigationLink
        href="/"
        onClick={closeMenu}
        className={navigationMenuItemLinkStyle({
          mobile: true,
          active: pathname === "/",
        })}
      >
        Home
      </NavigationLink>

      <NavigationLink
        href="/about"
        onClick={closeMenu}
        className={navigationMenuItemLinkStyle({
          mobile: true,
          active: pathname === "/about",
        })}
      >
        About
      </NavigationLink>

      <NavigationLink
        href="/blog"
        onClick={closeMenu}
        className={navigationMenuItemLinkStyle({
          mobile: true,
          active: pathname === "/blog",
        })}
      >
        Blog
      </NavigationLink>

      {!user && (
        <NavigationLink
          href="/register"
          onClick={closeMenu}
          className={navigationMenuItemLinkStyle({
            mobile: true,
            active: pathname === "/register",
          })}
        >
          会員登録
        </NavigationLink>
      )}

      {user && (
        <>
          <NavigationLink
            href="/mypage"
            onClick={closeMenu}
            className={navigationMenuItemLinkStyle({
              mobile: true,
              active: pathname === "/mypage",
            })}
          >
            マイページ
          </NavigationLink>
          <div className="flex items-center gap-2 text-lg font-medium">
            <UserIcon size={20} />
            <span>{user.name}</span>
          </div>
        </>
      )}
    </nav>
  );
}
