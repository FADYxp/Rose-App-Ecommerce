"use client";

import React, { forwardRef, useImperativeHandle, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/tailwind-merge";
import { useOccasions } from "@/hooks/use-occasions";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

const IMAGE_BASE_URL = "https://flower.elevateegy.com/uploads/";

const ProductFilters = forwardRef((_, ref) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Queries
  const { data: occasionsData, isLoading, isError } = useOccasions();

  // Single selection state
  const [selectedOccasion, setSelectedOccasion] = useState(
    searchParams.get("occasion") || null
  );

  // Update URL helper
  const updateUrl = (occasionId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (occasionId) params.set("occasion", occasionId);
    else params.delete("occasion");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Handle selection
  const handleSelect = (id: string) => {
    if (selectedOccasion === id) {
      // Deselect if already selected
      setSelectedOccasion(null);
      updateUrl(null);
    } else {
      setSelectedOccasion(id);
      updateUrl(id);
    }
  };

  // Reset all
  const resetOccasions = () => {
    setSelectedOccasion(null);
    updateUrl(null);
  };

  // Expose resetLocal for parent
  useImperativeHandle(ref, () => ({
    resetLocal: resetOccasions,
  }));

  if (isError)
    return <div className="p-4 text-red-500">Error loading filters.</div>;

  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg text-zinc-900">Occasion</h3>
        {selectedOccasion && (
          <button
            onClick={resetOccasions}
            className="flex items-center gap-1 text-red-600 text-md cursor-pointer"
          >
            <X size={20} />
            Reset
          </button>
        )}
      </div>

      <div className="w-full bg-white max-h-80 overflow-auto hide-scrollbar">
        <div className="grid grid-cols-2 gap-x-5 gap-y-2">
          {isLoading
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="bg-zinc-100 h-20 rounded-xl animate-pulse"
                  />
                ))
            : occasionsData?.occasions.map((occasion) => {
                const isActive = selectedOccasion === occasion._id;
                return (
                  <div
                    key={occasion._id}
                    onClick={() => handleSelect(occasion._id)}
                    className={cn(
                      "group relative h-20 rounded-xl overflow-hidden cursor-pointer border-2 border-transparent transition-all active:scale-95",
                      isActive && "border-maroon-600"
                    )}
                  >
                    <Image
                      src={`${IMAGE_BASE_URL}${occasion.image}`}
                      alt={occasion.name}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 flex items-center justify-center p-2 text-center transition-all duration-300",
                        !isActive && "bg-black/40 group-hover:bg-black/20",
                        isActive &&
                          "bg-gradient-to-t from-maroon-800/90 to-maroon-800/0"
                      )}
                    >
                      <span className="text-zinc-50">{occasion.name}</span>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
});

ProductFilters.displayName = "ProductFilters";
export default ProductFilters;
