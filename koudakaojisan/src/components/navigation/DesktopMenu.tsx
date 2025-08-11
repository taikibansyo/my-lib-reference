// components/navigation/DesktopMenu.tsx
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuItemLinkStyle,
} from "@/components/ui/navigation-menu";
import NavigationLink from "./NavigationLink";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

export default function DesktopMenu() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  return (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="flex flex-row gap-4">
        <NavigationMenuItem>
          <NavigationLink
            href="/"
            className={navigationMenuItemLinkStyle({
              desktop: true,
              active: pathname === "/",
            })}
          >
            Home
          </NavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationLink
            href="/about"
            className={navigationMenuItemLinkStyle({
              desktop: true,
              active: pathname === "/about",
            })}
          >
            About
          </NavigationLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationLink
            href="/blog"
            className={navigationMenuItemLinkStyle({
              desktop: true,
              active: pathname === "/blog",
            })}
          >
            Blog
          </NavigationLink>
        </NavigationMenuItem>
        {!user && (
          <NavigationMenuItem>
            <NavigationLink
              href="/register"
              className={navigationMenuItemLinkStyle({
                desktop: true,
                active: pathname === "/register",
              })}
            >
              会員登録
            </NavigationLink>
          </NavigationMenuItem>
        )}
        {user && (
          <NavigationMenuItem>
            <NavigationLink
              href="/mypage"
              className={navigationMenuItemLinkStyle({
                desktop: true,
                active: pathname === "/mypage",
              })}
            >
              マイページ
            </NavigationLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
