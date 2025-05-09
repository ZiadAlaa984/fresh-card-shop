"use client";
import React from "react";
import SwirlingEffectSpinner from "@/components/spinner-06";

const Loading = () => {
  return (
    <div className="flex h-screen justify-center items-center flex-col gap-6">
      <h2 className="flex items-center animate-pulse  gap-1 text-3xl  lg:text-4xl font-normal">
        FreshCart
      </h2>{" "}
      <SwirlingEffectSpinner />
    </div>
  );
};
export default Loading;
