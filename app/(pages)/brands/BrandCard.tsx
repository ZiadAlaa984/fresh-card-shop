import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyH4 } from "@/components/shared/Text";
import { Brand } from "@/types/brands";

export function BrandsCard({ brand }: { brand: Brand }) {
  return (
    <Link href={`/categories/${brand._id}`}>
      <Card className="overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-1">
        <div className="relative h-72 w-full">
          <Image
            src={brand.image || "/placeholder.svg?height=200&width=300"}
            alt={brand.name}
            fill
            className="object-cover"
          />
        </div>
        <CardContent className="p-4">
          <TypographyH4 className="font-semibold text-center text-lg truncate">
            {brand.name}
          </TypographyH4>
        </CardContent>
      </Card>
    </Link>
  );
}
