import { getProducts } from "@/lib/services/products.service";
import ProductCard from "@/components/shared/product-card";
import PaginationWrapper from "@/components/ui/paginationWrapper";
import { Product } from "@/lib/types/product";

export default async function ProductList({
  searchParams,
}: ProductSearchParamsProps) {
  const data = await getProducts({
    category: searchParams.category,
    occasion: searchParams.occasion,
    "price[gte]": searchParams.maxPrice,
    "price[lte]": searchParams.maxPrice,
    rateAvg: searchParams.rateCount,
    page: searchParams.page,
    limit: 12,
  });

  const products = data?.products || [];
  const metadata = data?.metadata;

  return (
    <>
      {products.length === 0 ? (
        <div className="py-10 text-center text-zinc-500 text-lg">
          No products found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-3 gap-5 mt-2">
            {products.map((product: Product) => (
              <ProductCard
                id={product._id}
                key={product._id}
                img={product.imgCover}
                title={product.title}
                price={product.price}
                priceAfterDiscount={product.priceAfterDiscount}
                quantity={product.quantity}
                sold={product.sold}
                rateAvg={product.rateAvg}
              />
            ))}
          </div>

          {/* Pagination only if more than 1 page */}
          {metadata && metadata.totalPages > 1 && (
            <div className="flex mt-12 col-span-9">
              <PaginationWrapper
                totalPages={metadata.totalPages}
                searchParams={{ page: String(searchParams.page ?? 1) }}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
