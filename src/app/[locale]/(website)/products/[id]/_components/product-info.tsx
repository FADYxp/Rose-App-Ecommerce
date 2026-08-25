import { CURRENCY } from "@/lib/constants/global.constant";
import { HeartPlus, Package, ShoppingCart, Star } from "lucide-react";
import AddToCartButton from "@/components/shared/add-to-cart-button";
import { cn } from "@/lib/utils/tailwind-merge";
import { useTranslations } from "next-intl";
import { Product } from "@/lib/types/product";

type ProductInfoProps = {
  product?: Product;
};

export default function ProductInfo({ product }: ProductInfoProps) {
  const t = useTranslations();
  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <h2 className="text-zinc-800 text-3xl font-semibold">{product?.title}</h2>
      <div className="flex items-center mt-2">
        {/* Price */}
        <p className="text-3xl font-bold flex items-center gap-2 mt-1">
          <span className="text-zinc-300 line-through">{product?.price}</span>
          {product?.priceAfterDiscount} {CURRENCY}
        </p>
        {/* Stock */}
        <div
          className={cn(
            "flex items-center gap-2 mt-1 ms-3 font-medium text-sm  rounded-xl w-fit px-3 py-1.5 ",
            product && product.quantity > 0
              ? "bg-zinc-100 "
              : "bg-red-50 text-red-600"
          )}
        >
          <Package
            className={cn(
              product && product.quantity > 0 ? "text-zinc-400" : "text-red-600"
            )}
          />
          <span>
            {product && product.quantity > 0
              ? `${product.quantity} ${t("in-stock")}`
              : t("out-of-stock")}{" "}
          </span>
        </div>
      </div>
      {/* Rating */}
      <div className="flex border-y border-y-zinc-100 gap-2 py-4 ps-1 my-4">
        <p className="flex items-center text-black font-normal text-base">
          <Star
            className="border-none text-yellow-500 me-1"
            size={20}
            fill="#eab308 "
          />{" "}
          Rating :<span className="font-medium">{product?.rateAvg}/5</span>
        </p>
        <span className="text-blue-600 text-base font-medium">
          ({product?.rateCount} rating)
        </span>
      </div>
      {/* Description */}
      <p className="text-zinc-600 text-base leading-none font-normal max-h-48 overflow-y-auto hide-scrollbar ">
        {product?.description}
      </p>

      {/* Buttons  */}
      <div className="mt-auto flex items-center gap-4">
        <p className="bg-zinc-100 p-3 rounded-lg">
          <HeartPlus />
        </p>

        <AddToCartButton
          className="w-full"
          productId={product ? product?._id : ""}
          quantityInStock={product ? product.quantity : 0}
        >
          <ShoppingCart /> Add to Cart
        </AddToCartButton>
      </div>
    </div>
  );
}
