import React from "react";
import { TypographyH2 } from "./Text";
import { cn } from "@/lib/utils";

export default function Header({
  children,
  title,
  className,
}: {
  className?: string;
  children: React.ReactElement;
  title: string;
}) {
  return (
    <div className={cn(" flex flex-col gap-4", className)}>
      <TypographyH2>{title}</TypographyH2>
      <div>{children}</div>
    </div>
  );
}
