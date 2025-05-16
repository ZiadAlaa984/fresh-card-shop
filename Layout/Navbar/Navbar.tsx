"use client";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { CircleUser, Heart, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import BtnNavbar from "./BtnNavbar";
import DropdownMenuWithIcon from "@/components/dropdown-menu-02";

const Navbar = () => {
  let { wishlistIds, cartCount } = useUserContext();
  const { getToken } = useAuth();
  const token = getToken();

  return (
    <div className=" ">
      <nav className="h-16 bg-transparent backdrop-blur-2xl z-40 fixed w-full border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto  px-3">
          <Link href="/" className="flex items-center gap-1 md:text-xl">
            <ShoppingCart /> FreshCart
          </Link>
          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            {token && (
              <div className="hidden md:flex items-center gap-3">
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

            <DropdownMenuWithIcon token={token ?? ""} />

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
