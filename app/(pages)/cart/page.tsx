"use client";

import { useUserContext } from "@/app/context/UserContext";
import ShoppingCart from "./ShoppingCart";
import CheckOut from "./CheckOut";

export default function CartPage() {
  const { cart, refetchCart } = useUserContext();
  return (
    <div>
      <ShoppingCart refetchCart={refetchCart} cart={cart} />
      {cart?.data?.products?.length > 0 && (
        <CheckOut
          refetchCart={refetchCart}
          cartOwner={cart?.cartId}
          totalPrice={cart?.data?.totalCartPrice}
        />
      )}
    </div>
  );
}
