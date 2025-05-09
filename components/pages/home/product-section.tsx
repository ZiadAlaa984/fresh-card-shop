import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/Products";
import Header from "@/components/shared/Header";
import { TypographyP } from "@/components/shared/Text";
import { renderStars } from "@/lib/utils";

export default function ProductSection({ Products }: { Products: Product[] }) {
  return (
    <Header title={"Products"}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Products.map((product: Product) => (
          <Card
            key={product._id}
            className="overflow-hidden gap-0   transition-transform duration-300 hover:scale-105  h-full"
          >
            <Link href={`/product/${product.slug}`} className="block">
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
                    {product.title}
                  </TypographyP>
                </Link>
                <span className="font-semibold text-lg">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              <TypographyP className="text-sm text-muted-foreground line-clamp-1 mb-2">
                {product.description}
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
    </Header>
  );
}
