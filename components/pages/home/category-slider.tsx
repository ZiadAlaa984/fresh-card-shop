"use client";
import Header from "@/components/shared/Header";
import { TypographyP } from "@/components/shared/Text";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Category } from "@/types/categorys";
import Image from "next/image";

export default function CategorySlider({
  Categorys,
}: {
  Categorys: Category[];
}) {
  return (
    <>
      <Header title="Categorys">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {Categorys.map((Category: Category) => (
              <CarouselItem
                key={Category._id}
                className="md:basis-1/2 lg:basis-1/5"
              >
                <div className="">
                  <Card>
                    <CardContent className="flex aspect-square  flex-col   items-center justify-center">
                      <Image
                        alt="cate"
                        className="rounded-t-xl h-[320px] object-cover"
                        width={300}
                        height={300}
                        src={Category.image}
                      />
                      <TypographyP className="py-1">
                        {Category.name}
                      </TypographyP>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Header>
    </>
  );
}
