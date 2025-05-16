"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { Navbar } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import BtnNavbar from "./BtnNavbar";
import { Heart, ShoppingCart } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";

export const NavMenu = (props: NavigationMenuProps) => {
  const pathname = usePathname();
  const { getToken } = useAuth();
  const token = getToken();
  let { wishlistIds, cartCount } = useUserContext();
  // Filter navigation items based on auth status
  const filteredNavbar = Navbar.filter((item) => {
    if (item.token && !token) return false;
    return true;
  });

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {filteredNavbar.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={clsx(
                  "transition-colors text-sm font-medium hover:text-primary",
                  pathname === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {item.value}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}

        {token && (
          <div className="flex  items-center gap-3">
            <BtnNavbar
              name={"/cart"}
              icon={<ShoppingCart />}
              Count={cartCount}
            />
            <BtnNavbar
              name={"/withlist"}
              icon={<Heart />}
              Count={wishlistIds?.length}
            />
          </div>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
