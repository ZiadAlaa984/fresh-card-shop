"use client";
import img1 from "@/public/img banner2.jpg";
import img2 from "@/public/banner11.jpg";
import img3 from "@/public/img banner2.jpg";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

export default function HeroSlider() {
  const images = [img1, img2, img3];

  return (
    <div className="max-w-full mx-auto">
      <div className="flex md:flex-row flex-col gap-4">
        <Carousel
          className="w-full"
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 2000,
              stopOnInteraction: true,
            }),
          ]}
        >
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={index}>
                <div>
                  <Card className="overflow-hidden  h-[570px]">
                    <CardContent className="flex aspect-video items-center justify-center p-0">
                      <Image
                        className="w-full h-full object-top "
                        src={image}
                        alt={`Slide ${index + 1}`}
                        priority={index === 0}
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-4 gap-2">
            <CarouselPrevious className="static translate-y-0 " />
            <CarouselNext className="static translate-y-0 " />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
