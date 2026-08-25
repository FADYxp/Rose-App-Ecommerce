import React, { Suspense } from "react";
import ProductDetails from "./_components/product-details";
import ProductDetailsSkeleton from "./_components/product-details-skeleton";
import ProductReviews from "../_components/product-review/product-review";
import RelatedProductsSection from "../_components/related-prod/related-product";

export default function page({ params }: { params: { id: string } }) {
  return (
    <>
      {/* Product Details */}
      <Suspense fallback={<ProductDetailsSkeleton />}>
        <ProductDetails id={params.id} />
      </Suspense>

      <div className="container mx-auto px-20">
        {/* Reviews */}
        <ProductReviews productId={params.id} />

        {/* Related Products */}
        <RelatedProductsSection productId={params.id} />
      </div>
    </>
  );
}
