"use client";
import React from "react";
import ProductSection from "@/components/shared/product-section";
import { PaginationMetadataType } from "@/types/Products";
import { useUserContext } from "@/app/context/UserContext";
import Header from "@/components/shared/Header";

export default function Page() {
  const { wishlist, isLoading } = useUserContext();
  return (
    <Header title="withlist">
      <ProductSection
        isLoading={isLoading}
        pagination={false}
        PaginationMetadata={{} as PaginationMetadataType}
        gridClass={"lg:grid-cols-4"}
        className={"col-span-3"}
        Products={Array.isArray(wishlist) ? wishlist : []}
        page={1}
        setPage={() => {}}
      />
    </Header>
  );
}
