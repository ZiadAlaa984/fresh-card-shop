"use client"

import { useUserContext } from "@/app/context/UserContext";
import ShoppingCart from "./ShoppingCart";

export default function page() {
  const { cart , refetchCart } = useUserContext();
  return (
    <div>
      <ShoppingCart refetchCart={refetchCart} cart={cart} />
    </div>
  );
}
