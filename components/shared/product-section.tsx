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
}) {
  return (
    <Header className={className} title={"Products"}>
      {isLoading ? (
        <LoadingCards LoadingClassName={LoadingClassName} />
      ) : (
        <div className="flex flex-col gap-8">
          <div
            className={cn(
              `grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6`,
              gridClass
            )}
          >
            {Products.map((product: Product, index: number) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
          {pagination && (
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
