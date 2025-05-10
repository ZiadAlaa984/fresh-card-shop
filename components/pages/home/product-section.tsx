import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PaginationMetadataType, Product } from "@/types/Products";
import Header from "@/components/shared/Header";
import { TypographyP } from "@/components/shared/Text";
import { cn, renderStars } from "@/lib/utils";
import PaginationNumberless from "@/app/(pages)/products/PaginationNumberless";

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
  PaginationMetadata?: PaginationMetadataType;
}) {
  return (
    <Header className={className} title={"Products"}>
      {isLoading ? (
        <div className={`grid grid-cols-3 ${LoadingClassName} gap-8 w-full`}>
          {Array(4)
            .fill(0)
            .map((_, index: number) => (
              <div key={index} className="animate-pulse col-span-1">
                <div className="h-96 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex flex-col gap-8">
          <div
            className={cn(
              `grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`,
              gridClass
            )}
          >
            {Products.map((product: Product) => (
              <Card
                key={product._id}
                className="overflow-hidden gap-0   transition-transform duration-300 hover:scale-105  h-full"
              >
                <Link href={`/product/${product._id}`} className="block">
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.imageCover || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                    {product.quantity < 50 && (
                      <Badge className="absolute top-2 right-2 bg-red-500">
                        Low Stock
                      </Badge>
                    )}
                    {product.sold > 10000 && (
                      <Badge className="absolute top-2 left-2 bg-green-500">
                        Best Seller
                      </Badge>
                    )}
                  </div>
                </Link>
                <CardContent className="p-4">
                  <div className="flex justify-between gap-2 items-start mb-2">
                    <Link href={`/product/${product.id}`} className="block">
                      <TypographyP className=" line-clamp-1 hover:text-primary transition-colors">
                        {product?.title}
                      </TypographyP>
                    </Link>
                    <span className="font-semibold text-lg">
                      ${product?.price.toFixed(2)}
                    </span>
                  </div>
                  <TypographyP className="text-sm text-muted-foreground line-clamp-1 mb-2">
                    {product?.description}
                  </TypographyP>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {renderStars(product.ratingsAverage)}
                      <span className="text-xs ml-1 text-muted-foreground">
                        ({product.ratingsQuantity})
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {product.sold} sold
                    </span>
                  </div>
                  <Button className="w-full mt-4">Add to Cart</Button>
                </CardContent>
              </Card>
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
