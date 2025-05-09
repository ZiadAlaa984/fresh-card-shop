import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/categorys";
import { TypographyH4 } from "@/components/shared/Text";

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link href={`/categories/${category.slug}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="relative h-72 w-full">
          <Image
            src={category.image || "/placeholder.svg?height=200&width=300"}
            alt={category.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <TypographyH4 className="font-semibold text-center text-lg truncate">
            {category.name}
          </TypographyH4>
        </CardContent>
      </Card>
    </Link>
  );
}
