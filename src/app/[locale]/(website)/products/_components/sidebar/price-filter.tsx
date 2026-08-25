"use client";

import React, { useEffect, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils/tailwind-merge";
import {
  PriceFormValues,
  priceSchema,
} from "@/lib/schemas/products-filter.schema";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const PriceFilter = forwardRef((_, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMin = searchParams.get("minPrice") || "";
  const currentMax = searchParams.get("maxPrice") || "";

  const {
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm<PriceFormValues>({
    resolver: zodResolver(priceSchema),
    defaultValues: {
      minPrice: currentMin,
      maxPrice: currentMax,
    },
  });

  useImperativeHandle(ref, () => ({
    resetLocal: () => reset({ minPrice: "", maxPrice: "" }),
  }));

  const watchedValues = watch();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (!errors.minPrice && !errors.maxPrice) {
        const params = new URLSearchParams(searchParams.toString());

        if (watchedValues.minPrice)
          params.set("minPrice", watchedValues.minPrice);
        else params.delete("minPrice");

        if (watchedValues.maxPrice)
          params.set("maxPrice", watchedValues.maxPrice);
        else params.delete("maxPrice");

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [
    watchedValues.minPrice,
    watchedValues.maxPrice,
    errors,
    router,
    pathname,
    searchParams,
  ]);

  const handleReset = () => {
    reset({ minPrice: "", maxPrice: "" });
    const params = new URLSearchParams(searchParams.toString());
    params.delete("minPrice");
    params.delete("maxPrice");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="space-y-4 py-6 border-t border-zinc-100">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xl font-medium text-zinc-900">Price</h3>
        {(watchedValues.minPrice || watchedValues.maxPrice) && (
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center gap-1 text-red-600 text-md cursor-pointer"
          >
            <X size={20} /> Reset
          </button>
        )}
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 space-y-1.5">
          <label className="text-sm text-zinc-600 ml-1">from</label>
          <Input
            {...register("minPrice")}
            placeholder="0"
            className={cn(
              "h-12 rounded-xl border-zinc-200 focus:ring-maroon-800",
              errors.minPrice && "border-red-500"
            )}
          />
        </div>

        <div className="flex-1 space-y-1.5">
          <label className="text-sm text-zinc-600 ml-1">to</label>
          <Input
            {...register("maxPrice")}
            placeholder="1000000"
            className={cn(
              "h-12 rounded-xl border-zinc-200 focus:ring-maroon-800",
              errors.maxPrice && "border-red-500"
            )}
          />
        </div>
      </div>

      {errors.maxPrice && (
        <p className="text-[10px] text-red-500 mt-1 italic font-medium">
          {errors.maxPrice.message}
        </p>
      )}
    </div>
  );
});

export default PriceFilter;
