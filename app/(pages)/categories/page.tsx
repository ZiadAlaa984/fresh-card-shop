"use client";
import Header from "@/components/shared/Header";
import { getCategorys } from "@/Service/categorys";
import { Category } from "@/types/Products";
import { CategoryCard } from "./CategoryCard";
import { useQuery } from "@tanstack/react-query";

export default function Categories() {
  const {
    data: categoryQuery,
    isLoading,
    isError,
  } = useQuery<any>({
    queryKey: ["categories"],
    queryFn: getCategorys,
  });

  const categories: Category[] = categoryQuery?.data || [];

  return (
    <Header title={"Categories"}>
      <div className="container mx-auto py-6">
        {isLoading ? (
          <p className="text-center">Loading...</p>
        ) : isError ? (
          <p className="text-center text-red-500">Failed to load categories</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
