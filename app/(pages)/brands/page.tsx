import Header from "@/components/shared/Header";
import { getBrands } from "@/Service/brands";

import { Brand } from "@/types/brands";
import { BrandsCard } from "./BrandCard";

export default async function Brands() {
  const dataBra = await getBrands();
  const brands = dataBra?.data;
  console.log("🚀 ~ Brands ~ brands:", brands);

  return (
    <Header title={"Brands"}>
      <div className="container mx-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brands && brands.length > 0 ? (
            brands.map((brand: Brand, index: number) => (
              <BrandsCard key={index} brand={brand} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No brands found
            </p>  
          )}
        </div>
      </div>
    </Header>
  );
}
