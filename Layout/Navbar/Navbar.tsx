"use client";
import { Button } from "@/components/ui/button";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import { ShoppingCart } from "lucide-react";
import WithlistBtn from "./WithlistBtn";
import { useUserContext } from "@/app/context/UserContext";
import CartBtn from "./cartBtn";

const Navbar = () => {
  let { wishlistIds, cartCount } = useUserContext();
  return (
    <div className="">
      <nav className="h-16 bg-background border-b">
        <div className="h-full flex items-center justify-between max-w-screen-xl mx-auto  lg:px-3">
          <h1 className="flex items-center gap-1 text-xl">
            <ShoppingCart /> FreshCart
          </h1>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <CartBtn cartCount={cartCount} />
            <WithlistBtn wishlistCount={wishlistIds?.length} />
            <Button variant="outline" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button>Get Started</Button>

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
