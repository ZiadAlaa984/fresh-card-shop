import CategorySlider from "@/components/pages/home/category-slider";
import HeroSlider from "@/components/pages/home/HeroSlider";
import ProductSection from "@/components/pages/home/product-section";
import { getCategorys } from "@/Service/categorys";
import { getProducts } from "@/Service/products";

export default async function Home() {
  const dataCtg = await getCategorys();
  const dataPrd = await getProducts();
  return (
    <main className="min-h-screen flex flex-col gap-4">
      <HeroSlider />
      <CategorySlider Categorys={dataCtg?.data} />
      <ProductSection Products={dataPrd?.data} />
    </main>
  );
}
