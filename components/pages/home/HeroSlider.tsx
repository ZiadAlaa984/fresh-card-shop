"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Fashion Sale",
    subtitle: "Fall/winter 2023 collection",
    discount: "40% off",
    promoCode: "FREE50FW",
    image: "/placeholder.svg?height=600&width=1200",
    bgColor: "bg-[#f5f0e8]",
    textColor: "text-[#0d3b3f]",
  },
  {
    id: 2,
    title: "Black Friday",
    subtitle: "Super Sale",
    discount: "Up to 50% off",
    promoCode: "BLACK50",
    image: "/placeholder.svg?height=600&width=1200",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    id: 3,
    title: "Summer Collection",
    subtitle: "New arrivals",
    discount: "30% off",
    promoCode: "SUMMER30",
    image: "/placeholder.svg?height=600&width=1200",
    bgColor: "bg-[#e0f2f1]",
    textColor: "text-[#00695c]",
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className={`min-w-full h-full flex items-center ${slide.bgColor} ${slide.textColor} relative`}
          >
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center h-full">
              <div className="z-10 space-y-4">
                <div className="space-y-2">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                    {slide.title}
                  </h1>
                  <p className="text-xl">{slide.subtitle}</p>
                </div>
                <div className="inline-block rounded-full border-4 border-current p-6 text-center">
                  <span className="text-2xl font-bold">{slide.discount}</span>
                </div>
                <div className="pt-4">
                  <p className="text-sm mb-2">Use promo code:</p>
                  <Button
                    variant="outline"
                    className="border-2 rounded-full px-6"
                  >
                    {slide.promoCode}
                  </Button>
                </div>
              </div>
              <div className="relative h-full hidden md:block">
                <Image
                  src={slide.image || "/placeholder.svg"}
                  alt={slide.title}
                  fill
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? "bg-primary" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}
