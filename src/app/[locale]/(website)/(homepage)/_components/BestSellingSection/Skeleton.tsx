import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { BestSellingCarousel } from "./best-selling-carousel";

<div className="w-full">
  <Suspense
    fallback={
      <div className="grid grid-cols-3 gap-4">
        <Skeleton className="h-72 w-full rounded-md" />
        <Skeleton className="h-72 w-full rounded-md" />
        <Skeleton className="h-72 w-full rounded-md" />
      </div>
    }
  >
    <BestSellingCarousel />
  </Suspense>
</div>;
