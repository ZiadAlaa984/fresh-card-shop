"use client";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Arrow() {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Button
      onClick={scrollToTop}
      disabled={atTop}
      variant="outline"
      size="icon"
      className="fixed z-50 left-4 bottom-4"
    >
      <ArrowUp className={`${!atTop ? "animate-bounce" : ""} size-5`} />
    </Button>
  );
}
