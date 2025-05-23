"use client";
import Header from "@/components/shared/Header";
import { getCategorys } from "@/Service/categorys";
import { Category } from "@/types/Products";
import { CategoryCard } from "./CategoryCard";
import { useQuery } from "@tanstack/react-query";
import { CategoryResponse } from "@/types/categorys";
import LoadingCards from "@/components/shared/loadingCards";

export default function Categories() {
  const {
    data: categoryQuery,
    isLoading,
    isError,
  } = useQuery<CategoryResponse>({
    queryKey: ["categories"],
    queryFn: getCategorys,
  });

  const categories: Category[] = categoryQuery?.data || [];

  return (
    <Header title={"Categories"}>
      <div className="container mx-auto py-6">
        {isLoading ? (
          <LoadingCards />
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load categories</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6 ">
            {categories.length > 0 ? (
              categories.map((category: Category, index: number) => (
                <CategoryCard key={index} category={category} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No categories found
              </p>
            )}
          </div>
        )}
      </div>
    </Header>
  );
}
