"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/Service/products";
import CarouselWithThumbs from "@/components/product/CarouselWithThumbs";
import ProductDetails from "@/components/product/ProductDetails";

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;

  // Fetch product data using React Query
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => getProductById(productId),
  });
  console.log("🚀 ~ ProductPage ~ product:", product);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-16 bg-gray-200 rounded mb-4"></div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg text-red-500">
          {error instanceof Error ? error.message : "Product not found"}
        </p>
      </div>
    );
  }

  const images = product.images || [product.imageCover];

  return (
    <div className="container mx-auto ">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-8">
        <CarouselWithThumbs images={images} />
        <ProductDetails product={product} />
      </div>
    </div>
  );
}
