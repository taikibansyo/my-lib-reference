// components/navigation/NavigationLink.tsx
"use client";

import React from "react";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navigationMenuItemLinkStyle } from "@/components/ui/navigation-menu";

type AnchorProps = Omit<React.ComponentPropsWithoutRef<"a">, keyof LinkProps>;

export interface NavigationLinkProps extends LinkProps, AnchorProps {
  children: React.ReactNode;
}

export default function NavigationLink({
  href,
  children,
  className,
  ...props
}: NavigationLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href.toString();

  return (
    <Link
      href={href}
      data-active={isActive || undefined}
      className={cn(
        navigationMenuItemLinkStyle({ active: isActive }),
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
