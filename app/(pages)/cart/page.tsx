"use client";

import { useUserContext } from "@/app/context/UserContext";
import ShoppingCart from "./ShoppingCart";
import CheckOut from "./CheckOut";

export default function page() {
  const { cart, refetchCart } = useUserContext();
  return (
    <div>
      <ShoppingCart refetchCart={refetchCart} cart={cart} />
      <CheckOut
        refetchCart={refetchCart}
        cartOwner={cart?.cartId}
        totalPrice={cart?.data?.totalCartPrice}
      />
    </div>
  );
}
