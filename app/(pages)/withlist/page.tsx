"use client";
import React from "react";
import ProductSection from "@/components/shared/product-section";
import { PaginationMetadataType } from "@/types/Products";
import { useUserContext } from "@/app/context/UserContext";

export default function Page() {
  const { wishlist } = useUserContext();

  return (
    <div className="grid gap-8 grid-cols-4">
      <ProductSection
        PaginationMetadata={{} as PaginationMetadataType}
        gridClass={"lg:grid-cols-3"}
        className={"col-span-3"}
        Products={Array.isArray(wishlist) ? wishlist : []}
        page={1}
        setPage={() => {}}
      />
    </div>
  );
}
