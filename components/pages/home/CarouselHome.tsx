"use client";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { BannerItem } from "@/types/Banners";
import { useIsMounted } from "@/hooks/useIsMounted";
export default function CarouselHome({
  carousels,
}: {
  carousels: BannerItem[];
}) {
  const IsMounted = useIsMounted();
  const [dimention, setDimention] = React.useState<number>();
  const imgRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
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
    <Carousel>
      <CarouselContent>
        {carousels.map((item, index) => (
          <CarouselItem key={index} className="">
            <div
              key={index}
              ref={imgRef}
              className="flex aspect-[14/6]  rounded-xl overflow-hidden  items-center justify-center p-6 relative -m-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-xl overflow-hidden "
                priority
              />
              <div className="absolute w-1/3 left-6 md:left-32 top-1/2 transform -translate-y-1/2">
                <h2
                  className={"text-sm md:text-6xl font-bold mb-4 text-primary"}
                >
                  {item.title}
                </h2>
                <Button className="hidden md:block">
                  {item.buttonCaption}
                </Button>
              </div>
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
  );
}
