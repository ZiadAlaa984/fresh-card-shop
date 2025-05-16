"use client";

import { useState } from "react";
import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/Products";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [addedToCart, setAddedToCart] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

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
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          className=" gap-2"
          size="lg"
          onClick={() => setAddedToCart(true)}
          disabled={!product.quantity || addedToCart}
        >
          {addedToCart ? (
            <>
              <Check className="h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </Button>

        <Button
          variant={inWishlist ? "default" : "outline"}
          size="lg"
          className={` gap-2 ${
            inWishlist ? "bg-pink-600 hover:bg-pink-700" : ""
          }`}
          onClick={() => setInWishlist(!inWishlist)}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
          {inWishlist ? "In Wishlist" : "Add to Wishlist"}
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
    </div>
  );
}
