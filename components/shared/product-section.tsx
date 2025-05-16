import { PaginationMetadataType, Product } from "@/types/Products";
import Header from "@/components/shared/Header";
import { cn } from "@/lib/utils";
import PaginationNumberless from "@/app/(pages)/products/PaginationNumberless";
import ProductCard from "./ProductCard";
import LoadingCards from "./loadingCards";

export default function ProductSection({
  Products,
  className,
  gridClass,
  pagination = true,
  PaginationMetadata,
  setPage,
  page,
  isLoading,
  LoadingClassName,
  error,
}: {
  isLoading?: boolean;
  setPage: (page: number) => void;
  page: number;
  Products: Product[];
  className?: string;
  LoadingClassName?: string;
  gridClass?: string;
  pagination?: boolean;
  PaginationMetadata: PaginationMetadataType;
  error?: string;
}) {
  return (
    <Header className={className} title={"Products"}>
      {isLoading ? (
        <LoadingCards LoadingClassName={LoadingClassName} />
      ) : error ? (
        <p className="text-center text-destructive text-sm">
          {error || "Something went wrong while fetching products."}
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          <div
            className={cn(
              `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 lg:gap-6`,
              gridClass
            )}
          >
            {Products.length > 0 ? (
              Products.map((product: Product, index: number) => (
                <ProductCard product={product} key={index} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground">
                No Products found
              </p>
            )}
          </div>
          {pagination && Products.length > 0 && (
            <PaginationNumberless
              setPage={setPage}
              page={page}
              PaginationMetadata={PaginationMetadata}
            />
          )}
        </div>
      )}
    </Header>
  );
}
