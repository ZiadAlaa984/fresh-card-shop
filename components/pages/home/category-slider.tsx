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
import { useIsMounted } from "@/hooks/useIsMounted";

import { Category } from "@/types/categorys";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CategorySlider({
  Categorys,
  isLoadingCategories,
}: {
  isLoadingCategories: boolean;
  Categorys: Category[];
}) {
  const IsMounted = useIsMounted();
  const [dimention, setDimention] = useState<number>();
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (imgRef.current) {
        setDimention(imgRef.current.getBoundingClientRect().height);
      }
    };
    setTimeout(() => {
      if (!IsMounted) return;

      updateDimensions(); // Set initial dimensions
    }, 500);

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
    };
  }, [IsMounted]);

  return (
    <>
      <Header title="Categorys">
        {isLoadingCategories ? (
          <div className="grid grid-cols-3 gap-8 w-full">
            {Array(3)
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
                      <CardContent
                        ref={imgRef}
                        className="flex aspect-square  flex-col   items-center justify-center"
                      >
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
            <CarouselPrevious
              style={{
                top: `${dimention && dimention / 2}px`,
              }}
              className="absolute top-0  -translate-x-1/2 left-0 shadow   size-6 xl:size-8 "
            />
            <CarouselNext
              style={{
                top: `${dimention && dimention / 2}px`,
              }}
              className="absolute top-0  translate-x-1/2  right-0 shadow   size-6 xl:size-8 "
            />
          </Carousel>
        )}
      </Header>
    </>
  );
}
