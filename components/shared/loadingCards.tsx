import { cn } from "@/lib/utils";
import React from "react";

export default function LoadingCards({
  LoadingClassName,
}: {
  LoadingClassName?: string;
}) {
  return (
    <div
      className={cn(
        `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-2 md:gap-6 w-full`,
        LoadingClassName
      )}
    >
      {Array(8)
        .fill(0)
        .map((_, index: number) => (
          <div key={index} className="animate-pulse col-span-1">
            <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          </div>
        ))}
    </div>
  );
}
