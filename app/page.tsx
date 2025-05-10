"use client";

import CategorySlider from "@/components/pages/home/category-slider";
import CarouselHome from "@/components/pages/home/CarouselHome";
import ProductSection from "@/components/pages/home/product-section";
import { getCategorys } from "@/Service/categorys";
import { getProducts } from "@/Service/products";
import { carousels } from "@/constant";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CategoryResponse } from "@/types/categorys";
import { ProductResponse } from "@/types/Products";

export default function Home() {
  const [page, setPage] = useState(1);

  const {
    data: categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery<any | CategoryResponse>({
    queryKey: ["categories"],
    queryFn: getCategorys,
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });

  const {
    data,
    isLoading: isLoadingProducts,
    isError: isErrorProducts,
  } = useQuery<any | ProductResponse>({
    queryKey: ["products", page],
    queryFn: () => getProducts(page, 10),
  });

  if (isErrorCategories || isErrorProducts) {
    return <div className="p-4 text-red-500">Something went wrong.</div>;
  }

  return (
    <main className="min-h-screen flex flex-col gap-4">
      <CarouselHome carousels={carousels} />
      <CategorySlider
        isLoadingCategories={isLoadingCategories}
        Categorys={categories?.data || []}
      />
      <ProductSection
        page={page}
        isLoading={isLoadingProducts}
        LoadingClassName={"grid-cols-4"}
        PaginationMetadata={data?.metadata}
        Products={data?.data || []}
        setPage={setPage}
      />
    </main>
  );
}
