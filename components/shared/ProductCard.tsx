"use client";
import { Product } from "@/types/Products";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypographyP } from "@/components/shared/Text";
import { cn, renderStars } from "@/lib/utils";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import { addWithlist, removeWithlist } from "@/Service/wthlist";
import { addCart } from "@/Service/cart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ApiResponse } from "@/types/withlist";
import { AddCartResponce } from "@/types/Cart";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlistIds, setWithlistIds, refetchWithlist, refetchCart } =
    useUserContext();
  const { getToken } = useAuth();
  //  *   add in withlist message true  ==> toast refetch withlistIds
  // ^ withlist function

  const handleToggleWishlist = async (id: string) => {
    // ! check if he in withlist
    if (wishlistIds.includes(id)) {
      // * exist => remove
      removeFromWithlist(id);
    } else {
      // * notExist => add
      addInWithlist(id);
    }
  };

  const addInWithlist = async (id: string) => {
    try {
      const response = (await addWithlist(getToken(), id)) as ApiResponse;
      setWithlistIds(response.data);

      toast(response?.message);
    } catch (error) {
      console.log(error);
    }
  };
  const removeFromWithlist = async (id: string) => {
    try {
      const response = (await removeWithlist(getToken(), id)) as ApiResponse;
      refetchWithlist();
      toast(response?.message);
    } catch (error) {
      console.log(error);
    }
  };
  // ^ cart function

  const handleToggleCart = async (id: string) => {
    // // ! check if he in withlist
    // if (wishlistIds.includes(id)) {
    //   // * exist => remove
    //   // removeFromCart(id);
    // } else {
    // * notExist => add
    addInCart(id);
    // }
  };

  const addInCart = async (id: string) => {
    try {
      const response = (await addCart(getToken(), id)) as AddCartResponce;
      refetchCart();
      toast(response?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      key={product._id}
      className="overflow-hidden gap-0 transition-transform duration-300 hover:scale-105 h-full"
    >
      <Link href={`/product/${product._id}`} className="block">
        <div className="relative h-64 overflow-hidden">
          <Image
            src={product.imageCover || "/placeholder.svg"}
            alt={product.title}
            fill
            className="object-cover"
          />
          {product.quantity < 50 && (
            <Badge className="absolute top-2 right-2 bg-red-500">
              Low Stock
            </Badge>
          )}
          {product.sold > 10000 && (
            <Badge className="absolute top-2 left-2 bg-green-500">
              Best Seller
            </Badge>
          )}
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between gap-2 items-start mb-2">
          <Link href={`/product/${product._id}`} className="block">
            <TypographyP className="line-clamp-1 hover:text-primary transition-colors">
              {product?.title}
            </TypographyP>
          </Link>
          <span className="font-semibold text-lg">
            ${product?.price.toFixed(2)}
          </span>
        </div>
        <TypographyP className="text-sm text-muted-foreground line-clamp-1 mb-2">
          {product?.description}
        </TypographyP>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {renderStars(product.ratingsAverage)}
            <span className="text-xs ml-1 text-muted-foreground">
              ({product.ratingsQuantity})
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {product.sold} sold
          </span>
        </div>
        <div className="flex flex-col mt-4 sm:flex-row gap-2">
          <Button
            className="gap-1 flex-1"
            onClick={() => handleToggleCart(product._id)}
          >
            <ShoppingCart className="size-5" />
            Add to Cart
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => handleToggleWishlist(product._id)}
          >
            {false ? (
              <Loader className="animate-spin h-5 w-5" />
            ) : (
              <Heart
                className={cn("!h-5 !w-5", {
                  "fill-rose-600 stroke-rose-600": wishlistIds.includes(
                    product._id
                  ),
                })}
              />
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
