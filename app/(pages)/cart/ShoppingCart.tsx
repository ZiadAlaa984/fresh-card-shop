"use client";

import Image from "next/image";
import { ArrowLeft, Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyP } from "@/components/shared/Text";
import { CartResponce } from "@/types/Cart";
import { removeCart, removeItemCart, updateItemCart } from "@/Service/cart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

interface Response {
  status: string;
}

export default function ShoppingCart({
  cart,
  refetchCart,
}: {
  cart: CartResponce;
  refetchCart: () => void;
}) {
  const { getToken } = useAuth();

  const clearCart = async () => {
    try {
      const res = (await removeCart(getToken())) as Response;
      refetchCart();
      toast(res.status);
    } catch {
      toast("error");
    }
  };

  const removeItem = async (id: string) => {
    try {
      const res = (await removeItemCart(getToken(), id)) as Response;
      refetchCart();
      toast(res.status);
    } catch {
      toast("error");
    }
  };
  const updateQuantity = async (id: string, count: number) => {
    try {
      const res = (await updateItemCart(getToken(), id, count)) as Response;
      refetchCart();
      toast(res.status);
    } catch {
      toast("error");
    }
  };

  return (
    <div className="w-full  bg-white rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary text-white primary/70"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <TypographyH3>Shop Cart</TypographyH3>
        </div>
        <TypographyP>
          Total Price : EGP {cart?.data?.totalCartPrice}
        </TypographyP>
      </div>

      {cart?.data?.products?.length > 0 ? (
        <div className="space-y-4">
          {cart?.data?.products?.map((item) => (
            <div
              key={item?._id}
              className="flex border rounded-md p-3 relative"
            >
              <div className="w-28 h-28 flex-shrink-0 bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={item?.product?.imageCover || "/placeholder.svg"}
                  alt={item?.product?.title}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-semibold ">{item?.product?.title}</h3>
                <div className="flex items-center mt-1">
                  <p className="text-sm">Rate :</p>
                  <div className="flex items-center ml-1">
                    <span className="text-yellow-400">★</span>
                    <span className="text-sm ml-1">
                      {item?.product?.ratingsAverage}
                    </span>
                  </div>
                </div>
                <p className="text-sm mt-1">Price : EGP {item?.price} </p>
                <p className="text-xs text-gray-500 mt-1">
                  {item?.product?.category?.name} |{" "}
                  {item?.product?.quantity ? (
                    <span className="text-green-500">Available</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </p>
              </div>
              <div className="flex flex-col justify-between items-end">
                <Button
                  size={"icon"}
                  onClick={() => removeItem(item?.product?.id)}
                  className="bg-destructive size-7 "
                >
                  <X />
                </Button>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-md border-gray-300"
                    onClick={() =>
                      updateQuantity(item?.product?.id, item?.count - 1)
                    }
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="w-6 text-center">{item?.count}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7 rounded-md border-gray-300"
                    onClick={() =>
                      updateQuantity(item?.product?.id, item?.count + 1)
                    }
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
                <div className="text-xs text-right">
                  <p>Total Price</p>
                  <p className="font-semibold">EGP {item?.price}</p>
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-end">
            <Button
              variant="destructive"
              size="sm"
              onClick={clearCart}
              className="bg-destructive"
            >
              Clear All Products
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}
    </div>
  );
}
