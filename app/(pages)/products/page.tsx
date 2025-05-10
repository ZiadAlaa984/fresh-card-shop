"use client";
import React, {  useState } from "react";
import { getProducts } from "@/Service/products";
import ProductSection from "@/components/pages/home/product-section";
import { useQuery } from "@tanstack/react-query";
import FilterProducts from "./FilterProducts";
import { getCategorys } from "@/Service/categorys";

export default function Page() {
  const [page, setPage] = useState(1);
  const [filtes, setfiltes] = useState<any>({});
  const { data: categoryQuery } = useQuery<any>({
    queryKey: ["categories"],
    queryFn: getCategorys,
    staleTime: 1000 * 60 * 5,
  });
  const { data, isLoading } = useQuery<any>({
    queryKey: ["products", page, filtes],
    queryFn: () => getProducts(page, 10, filtes),
  });
  // products pages
  const CategorysData = categoryQuery?.data || [];

  return (
    <div className="grid gap-8 grid-cols-4">
      <FilterProducts setfiltes={setfiltes} CategorysData={CategorysData} />
      <ProductSection
        isLoading={isLoading}
        PaginationMetadata={data?.metadata}
        gridClass={"lg:grid-cols-3"}
        className={"col-span-3"}
        Products={data?.data || []}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
