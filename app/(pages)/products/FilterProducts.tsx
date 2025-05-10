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
  // const [searchName, setSearchName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

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
  };

  // Reset filters
  const resetFilters = () => {
    // setSearchName("");
    setSelectedCategory("");
    setSortOption("");
    setPage(1);
    // Also reset the applied filters
    setfiltes({});
  };

  return (
    <div className="col-span-1 sticky top-3 h-fit">
      <div className="flex flex-col gap-6">
        <Card className="p-5">
          <CardHeader className="px-0">
            <CardTitle className="text-left ">Filter Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Search by name */}
            {/* <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <Input
                id="search"
                placeholder="Search products..."
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
            </div> */}

            {/* Category filter */}
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
