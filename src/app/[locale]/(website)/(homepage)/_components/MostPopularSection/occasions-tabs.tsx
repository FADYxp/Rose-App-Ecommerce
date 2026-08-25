"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { MostPopularTabsProps, Occasion } from "@/lib/types/occasion";
import clsx from "clsx";

export default function OccasionsTabs({
  occasions,
  activeOccasion,
}: MostPopularTabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("occasion", id);

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex gap-6">
      {occasions.map((occasion: Occasion) => (
        <button
          key={occasion._id}
          onClick={() => handleClick(occasion._id)}
          className={clsx(
            "text-md font-medium",
            activeOccasion === occasion._id
              ? "text-maroon-600"
              : "text-zinc-700"
          )}
        >
          {occasion.name}
        </button>
      ))}
    </div>
  );
}
