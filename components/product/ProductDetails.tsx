"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/Products";
import { useUserContext } from "@/app/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { addCart } from "@/Service/cart";
import { AddCartResponce, ApiResponse } from "@/types/Cart";
import { addWithlist, removeWithlist } from "@/Service/wthlist";
import { cn } from "@/lib/utils";
import { AuthModal } from "../shared/auth-model";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { wishlistIds, setWithlistIds, refetchWithlist, refetchCart } =
    useUserContext();
  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCard, setIsLoadingCard] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  console.log("🚀 ~ ProductDetails ~ showAuthModal:", showAuthModal);
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
    <div className="flex flex-col gap-2 pt-6 md:pt-0  justify-between  col-span-2">
      <div>
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <div className="flex items-center mt-2 space-x-4">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.ratingsAverage || 0)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">
              {product.ratingsAverage || 0} ({product.ratingsQuantity || 0}{" "}
              reviews)
            </span>
          </div>

          {product.quantity > 0 ? (
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              In Stock ({product.quantity})
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-red-50 text-red-700 border-red-200"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </div>

      <div className="text-2xl font-bold">
        ${(product.price || 0).toFixed(2)}
      </div>

      {product.brand && (
        <div>
          <span className="text-sm text-gray-500">Brand:</span>
          <span className="ml-2">{product.brand}</span>
        </div>
      )}

      <div>
        <span className="text-sm text-gray-500">Category:</span>
        <span className="ml-2">
          {product.category?.name || "Uncategorized"}
        </span>
        {product.subcategory?.length > 0 && (
          <span className="ml-2 text-gray-500">
            /{" "}
            {product.subcategory
              .map((sub: { name: string }) => sub.name)
              .join(", ")}
          </span>
        )}
      </div>

      <div>
        <h3 className="text-lg font-medium mb-2">Description</h3>
        <p className="text-gray-700">
          {product.description || "No description available"}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-row gap-2 lg:gap-4">
        <Button
          className="md:gap-1 flex-1 text-[10px] md:text-[12px] "
          onClick={(e) => {
            e.preventDefault();
            addInCart(product._id);
          }}
        >
          {isLoadingCard ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <>
              <ShoppingCart className="md:size-5 size-3" />
              Add to Cart
            </>
          )}
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="shadow-xl border"
          onClick={(e) => {
            e.preventDefault();
            handleToggleWishlist(product._id);
          }}
        >
          {isLoading ? (
            <Loader className="animate-spin h-5 w-5" />
          ) : (
            <Heart
              className={cn(" size-5", {
                "fill-rose-600 stroke-rose-600": wishlistIds.includes(
                  product._id
                ),
              })}
            />
          )}
        </Button>
      </div>

      {/* Additional Info */}
      <Card className="p-4 bg-gray-50">
        <div className="text-sm text-gray-600">
          <p>• Free shipping on orders over $50</p>
          <p>• 30-day money-back guarantee</p>
          <p>• Sold: {product.sold || 0} units</p>
        </div>
      </Card>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
