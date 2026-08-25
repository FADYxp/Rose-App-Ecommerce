import { Suspense } from "react";
import ProductList from "./_components/product-list";
import ProductsSidebar from "./_components/sidebar";

export default async function page({ searchParams }: ProductSearchParamsProps) {
  return (
    <div className="grid grid-cols-12 px-20 py-10 gap-6">
      {/* #TODP: Sidebar */}
      <div className="col-span-3 ">
        <ProductsSidebar />
      </div>
      {/* Products */}
      <div className="col-span-9">
        <Suspense
          fallback={
            <div className="grid grid-cols-3 gap-4">
              <div className="h-68 bg-gray-200 rounded animate-pulse" />
              <div className="h-68 bg-gray-200 rounded animate-pulse" />
              <div className="h-68 bg-gray-200 rounded animate-pulse" />
            </div>
          }
        >
          <ProductList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
