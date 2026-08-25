"use client";

import { forwardRef, useImperativeHandle, useState } from "react";
import { useSearchParams } from "next/navigation";
import { updateSearchParams } from "@/lib/utils/url";
import { Star, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

const MAX_RATING = 5;

const RatingFilter = forwardRef((props, ref) => {
  // Translation
  const t = useTranslations("rating-filter");

  // Navigation
  const router = useRouter();
  const searchParams = useSearchParams();
  const rateParam = searchParams.get("rateCount");

  // States
  const [selectedRate, setSelectedRate] = useState<number>(
    rateParam ? Number(rateParam) : 0
  );

  // Functions
  const handleSelect = (rate: number) => {
    setSelectedRate(rate);

    const newUrl = updateSearchParams(searchParams, {
      rateCount: rate.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  const handleReset = () => {
    setSelectedRate(0);

    const newUrl = updateSearchParams(searchParams, {
      rateCount: null,
    });

    router.push(newUrl, { scroll: false });
  };

  // Expose resetLocal for Reset All
  useImperativeHandle(ref, () => ({
    resetLocal: () => {
      setSelectedRate(0);
    },
  }));

  return (
    <div>
      {/* Header */}
      <header className="flex justify-between items-end mb-3">
        <h2 className="text-zinc-900 text-xl font-medium">{t("title")}</h2>

        {/* Reset rating filter */}
        {selectedRate > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 text-red-600 text-md cursor-pointer"
          >
            <X size={16} />
            {t("reset")}
          </button>
        )}
      </header>

      {/* Rating stars */}
      <div className="flex gap-2">
        {Array.from({ length: MAX_RATING }).map((_, index) => {
          const starIndex = index + 1;
          const isFilled = starIndex <= selectedRate;

          return (
            <Star
              key={starIndex}
              size={28}
              onClick={(e) => {
                e.preventDefault();
                handleSelect(starIndex);
              }}
              className={`cursor-pointer transition-colors ${
                isFilled ? "fill-amber-500 text-amber-500" : "text-amber-500"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
});

RatingFilter.displayName = "RatingFilter";
export default RatingFilter;
