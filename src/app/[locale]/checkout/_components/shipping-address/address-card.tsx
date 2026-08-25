import { Card, CardFooter, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/tailwind-merge";
import { Phone } from "lucide-react";
import React from "react";

export default function AddressCard({
  selectedAddress,
  city,
  phone,
  street,
}: AddressCardProps) {
  return (
    <Card className={cn("p-4 pb-3", selectedAddress && "bg-maroon-600")}>
      <CardTitle className={cn("flex justify-between items-center mb-1")}>
        {/* City Name */}
        <h3
          className={cn(
            "font-semibold text-2xl",
            selectedAddress && "text-white"
          )}
        >
          {city}
        </h3>
        {/* Phone Number */}
        <div className={cn("flex gap-2")}>
          <span
            className={cn(
              "w-8 h-8 rounded-full bg-maroon-600 flex items-center justify-center",
              selectedAddress && "bg-white"
            )}
          >
            <Phone
              size={20}
              className={cn("text-white", selectedAddress && "text-maroon-600")}
            />
          </span>
          <p
            className={cn(
              "text-lg text-zinc-500",
              selectedAddress && "text-white"
            )}
          >
            {phone}
          </p>
        </div>
      </CardTitle>
      {/* Street Name */}
      <CardFooter
        className={cn(
          "mx-0 px-3 py-1 rounded-full w-fit font-medium  bg-zinc-100 text-zinc-800",
          selectedAddress && "text-zinc-50 bg-zinc-800"
        )}
      >
        {street}
      </CardFooter>
    </Card>
  );
}
