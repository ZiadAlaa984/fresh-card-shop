"use client";
import type { Product } from "@/types/Products";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TypographyH4, TypographyP } from "@/components/shared/Text";
import { cn, renderStars } from "@/lib/utils";
import { Heart, Loader, ShoppingCart } from "lucide-react";
import { useUserContext } from "@/app/context/UserContext";
import { addWithlist, removeWithlist } from "@/Service/wthlist";
import { addCart } from "@/Service/cart";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import type { ApiResponse } from "@/types/withlist";
import type { AddCartResponce } from "@/types/Cart";
import { AuthModal } from "./auth-model";

export default function ProductCard({ product }: { product: Product }) {
  const { wishlistIds, setWithlistIds, refetchWithlist, refetchCart } =
    useUserContext();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = getToken();
    if (!token) {
      setShowAuthModal(true);
      return false;
    }
    return true;
  };

  const handleToggleWishlist = async (id: string) => {
    if (!isAuthenticated()) return;

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
      setIsLoading(true);
      const response = (await addWithlist(getToken(), id)) as ApiResponse;
      setWithlistIds(response.data);
      toast(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWithlist = async (id: string) => {
    try {
      setIsLoading(true);
      const response = (await removeWithlist(getToken(), id)) as ApiResponse;
      refetchWithlist();
      toast(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ^ cart function
  const addInCart = async (id: string) => {
    if (!isAuthenticated()) return;

    try {
      setIsLoadingCard(true);
      const response = (await addCart(getToken(), id)) as AddCartResponce;
      refetchCart();
      toast(response?.message);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingCard(false);
    }
  };

  return (
    <>
      <Card
        key={product._id}
        className="overflow-hidden gap-0 transition-transform duration-300 md:hover:scale-105 h-full"
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

          <CardContent className="p-2 md:p-4">
            <div className="flex justify-between gap-1 md:gap-2 items-center md:mb-2">
              <Link href={`/product/${product._id}`} className="block">
                <TypographyH4 className="line-clamp-1 hover:text-primary transition-colors">
                  {product?.title}
                </TypographyH4>
              </Link>
              <span className="font-semibold text-[12px] md:text-lg">
                ${product?.price.toFixed(2)}
              </span>
            </div>
            <TypographyP className="text-sm text-muted-foreground line-clamp-1 mb-2">
              {product?.description}
            </TypographyP>
            <div className="flex items-center gap-1 justify-between">
              <div className="flex text-[6px] items-center">
                {renderStars(product.ratingsAverage)}
                <span className="text-xs ml-1 text-muted-foreground">
                  ({product.ratingsQuantity})
                </span>
              </div>
              <span className="text-[8px] md:text-xs line-clamp-1 text-muted-foreground">
                {product.sold} sold
              </span>
            </div>
            <div className="flex  flex-row mt-2 gap-1 justify-between md:mt-4   md:gap-2">
              <Button
                className="md:gap-1 flex-1 text-[8px] md:text-sm "
                onClick={(e) => {
                  e.preventDefault();
                  addInCart(product._id);
                }}
              >
                {isLoadingCard ? (
                  <Loader className="animate-spin size-3 md:size-5" />
                ) : (
                  <>
                    <ShoppingCart className=" size-3" />
                    Add to Cart
                  </>
                )}
              </Button>
              <Button
                size="icon"
                variant="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  handleToggleWishlist(product._id);
                }}
              >
                {isLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  <Heart
                    className={cn("md:h-5 md:w-5 size-3", {
                      "fill-rose-600 stroke-rose-600": wishlistIds.includes(
                        product._id
                      ),
                    })}
                  />
                )}
              </Button>
            </div>
          </CardContent>
        </Link>
      </Card>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
