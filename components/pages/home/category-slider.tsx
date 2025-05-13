"use client";
import Header from "@/components/shared/Header";
import LoadingCards from "@/components/shared/loadingCards";
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
          <LoadingCards LoadingClassName="h-[150px]  md:h-[320px]" />
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
                  className="basis-1/2 lg:basis-1/5"
                >
                  <div className="">
                    <Card>
                      <CardContent
                        ref={imgRef}
                        className="flex aspect-square  flex-col   items-center justify-center"
                      >
                        <Image
                          alt={Category.name}
                          className="rounded-t-xl h-[150px] md:h-[320px] object-cover"
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
