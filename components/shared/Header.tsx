import React from "react";
import { TypographyH2 } from "./Text";

export default function Header({
  children,
  title,
}: {
  children: React.ReactElement;
  title: string;
}) {
  return (
    <div className=" flex flex-col gap-4">
      <TypographyH2>{title}</TypographyH2>
      <div>{children}</div>
    </div>
  );
}
