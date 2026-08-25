import { cn } from "@/lib/utils/tailwind-merge";
import Image from "next/image";
import React from "react";

export default function PayMethod({
  index,
  image,
  title,
  description,
  selectedMethod,
}: PayMethodProps) {
  return (
    <div
      className={cn(
        "flex-1 border border-zinc-300 rounded-lg flex flex-col items-center justify-center h-full",
        selectedMethod && "bg-zinc-50"
      )}
      key={index}
    >
      <Image src={image} alt="Credit Card" width={195} height={195} />
      <p
        className={cn(
          "text-2xl font-semibold text-zinc-800",
          selectedMethod && "text-maroon-600"
        )}
      >
        {title}
      </p>
      <p className={cn("text-sm font-semibold text-zinc-500 text-center")}>
        {description}
      </p>
    </div>
  );
}
