"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import type { Category } from "@/types/categorys";
import type { ProductFilter } from "@/types/Products";

export default function FilterProducts({
  CategorysData,
  setfiltes,
  setPage,
}: {
  setPage: (value: number) => void;
  setfiltes: (value: ProductFilter) => void;
  CategorysData: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Apply filters
  const applyFilters = () => {
    // Create an empty filter object
    const filters: ProductFilter = {};

    // Only add category filter if a valid category is selected (not empty and not "all")
    if (selectedCategory && selectedCategory !== "all") {
      filters["category[in]"] = selectedCategory;
    }

    // Only add sort filter if a valid sort option is selected (not empty and not "default")
    if (sortOption && sortOption !== "default") {
      filters.sort = sortOption;
    }

    // Apply the filters
    setfiltes(filters);
    setPage(1);
    // Close the sheet on mobile after applying filters
    setIsSheetOpen(false);
  };

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("");
    setSortOption("");
    setPage(1);
    // Also reset the applied filters
    setfiltes({});
  };

  // Filter content that will be used in both desktop and mobile views
  const FilterContent = () => (
    <div className="space-y-4">
      {/* Category filter */}
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full" id="category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {CategorysData.map((category) => (
              <SelectItem key={category._id} value={category._id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sort options */}
      <div className="space-y-2">
        <Label htmlFor="sort">Sort By</Label>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-full" id="sort">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="+price">Price: Low to High</SelectItem>
            <SelectItem value="-price">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
            <SelectItem value="-name">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Action buttons */}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={resetFilters}>
          Reset
        </Button>
        <Button onClick={applyFilters}>Apply Filters</Button>
      </div>
    </div>
  );

  // Count active filters
  const activeFilterCount = [
    selectedCategory && selectedCategory !== "all",
    sortOption && sortOption !== "default",
  ].filter(Boolean).length;

  return (
    <>
      {/* Fixed Mobile Filter Button */}
      <div className="lg:hidden fixed left-0 top-1/2 -translate-y-1/2 z-50">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="default"
              className="h-auto py-3 px-2 rounded-r-md rounded-l-none shadow-lg flex flex-col items-center"
            >
              <SlidersHorizontal className="size-6" />
              {activeFilterCount > 0 && (
                <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {activeFilterCount}
                </div>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[350px]">
            <SheetHeader>
              <SheetTitle>Filter Products</SheetTitle>
            </SheetHeader>
            <div className="p-4">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="col-span-1 hidden lg:block sticky top-24 h-fit">
        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <CardHeader className="px-0">
              <CardTitle className="text-left">Filter Products</CardTitle>
            </CardHeader>
            <CardContent>
              <FilterContent />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
