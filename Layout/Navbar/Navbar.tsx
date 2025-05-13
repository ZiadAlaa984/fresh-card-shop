"use client";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { CircleUser, Heart, LogIn, LogOut, ShoppingCart } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import BtnNavbar from "./BtnNavbar";

const Navbar = () => {
  let { wishlistIds, cartCount } = useUserContext();
  const { getToken } = useAuth();
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
            {getToken() ? (
              <>
                {" "}
                <BtnNavbar icon={<CircleUser />} />
                <BtnNavbar icon={<ShoppingCart />} Count={cartCount} />
                <BtnNavbar icon={<Heart />} Count={wishlistIds?.length} />
                <Button className="inline-flex font-medium items-center text-[10px] md:gap-1">
                  Sign Out <LogOut className="size-3" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  className="hidden  sm:inline-flex items-center gap-1"
                >
                  Sign In <LogIn />
                </Button>
              </>
            )}

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
