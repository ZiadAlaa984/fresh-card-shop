"use client";
import React, { useState } from "react";
import { getProducts } from "@/Service/products";
import { useQuery } from "@tanstack/react-query";
import FilterProducts from "./FilterProducts";
import { getCategorys } from "@/Service/categorys";
import ProductSection from "@/components/shared/product-section";
import { CategoryResponse } from "@/types/categorys";
import {
  PaginationMetadataType,
  ProductFilter,
  ProductResponse,
} from "@/types/Products";

export default function Page() {
  const [page, setPage] = useState(1);
  const [filtes, setfiltes] = useState<ProductFilter>({});
  const { data: categoryQuery } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: getCategorys,
    staleTime: 1000 * 60 * 5,
  });
  const { data, isLoading } = useQuery<ProductResponse>({
    queryKey: ["products", page, filtes],
    queryFn: () => getProducts(page, 10, filtes),
  });
  // products pages
  const CategorysData = categoryQuery?.data || [];
  console.log(data?.metadata);

  return (
    <div className="grid gap-8 grid-cols-4">
      <FilterProducts
        setPage={setPage}
        setfiltes={setfiltes}
        CategorysData={CategorysData}
      />
      <ProductSection
        isLoading={isLoading}
        PaginationMetadata={data?.metadata || ({} as PaginationMetadataType)}
        gridClass={"lg:grid-cols-3"}
        LoadingClassName={"lg:grid-cols-3"}
        className={"col-span-4 lg:col-span-3"}
        Products={Array.isArray(data?.data) ? data?.data : []}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
