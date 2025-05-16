"use client";

import CategorySlider from "@/components/pages/home/category-slider";
import CarouselHome from "@/components/pages/home/CarouselHome";
import { getCategorys } from "@/Service/categorys";
import { getProducts } from "@/Service/products";
import { carousels } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CategoryResponse } from "@/types/categorys";
import { PaginationMetadataType, ProductResponse } from "@/types/Products";
import ProductSection from "@/components/shared/product-section";

export default function Home() {
  const [page, setPage] = useState(1);

  // * fetch data
  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: getCategorys,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  const {
    data,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery<ProductResponse>({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, 10),
  });

  if (isErrorCategories || isErrorProducts) {
    return <div className="p-4 text-red-500">Something went wrong.</div>;
  }

  return (
    <main className="min-h-screen flex flex-col gap-4">
      {/* <CarouselHome carousels={carousels} /> */}
      <CategorySlider
        isLoadingCategories={isLoadingCategories}
        Categorys={categories?.data || []}
      />
      <ProductSection
        page={page}
        isLoading={isLoadingProducts}
        LoadingClassName="grid-cols-4"
        PaginationMetadata={data?.metadata || ({} as PaginationMetadataType)}
        Products={Array.isArray(data?.data) ? data?.data : []}
        setPage={setPage}
      />
    </main>
  );
}
