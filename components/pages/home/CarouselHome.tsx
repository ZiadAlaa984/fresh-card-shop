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
export default function CarouselHome({
  carousels,
}: {
  carousels: BannerItem[];
}) {
  return (
    <Carousel>
      <CarouselContent>
        {carousels.map((item, index) => (
          <CarouselItem key={index} className="">
            <div
              key={index}
              className="flex aspect-[14/6]  rounded-xl overflow-hidden  items-center justify-center p-6 relative -m-1"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover rounded-xl overflow-hidden "
                priority
              />
              <div className="absolute w-1/3 left-16 md:left-32 top-1/2 transform -translate-y-1/2">
                <h2
                  className={"text-xl md:text-6xl font-bold mb-4 text-primary"}
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
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
