import Image from "next/image";
import { Star } from "lucide-react";
import { useTranslations } from "next-intl";

export default function OrderItemCard({ item }: OrderItemCardProps) {
  // Translation
  const t = useTranslations("orders");
  // Variables
  const { product, quantity, price } = item;
  const rating = product.rateAvg ?? 0;
  const ratingCount = product.rateCount ?? 0;

  return (
    <div>
      <div className="flex gap-4 bg-white rounded-md p-2 transition-shadow duration-200">
        {/* Product Image */}
        <div className="w-36 h-36 relative shrink-0">
          <Image
            src={product.imgCover}
            alt={product.title}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between flex-1">
          {/* Title */}
          <div className="">
            <h3 className="text-maroon-700 font-semibold text-lg line-clamp-1">
              {product.title}
            </h3>
            {/* Rating */}
            <div className="flex items-center gap-1 text-base">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span>
                <span className="font-medium">
                  {t("rating")}: {rating}/5{" "}
                </span>
                <span className="text-blue-600">
                  ({ratingCount} {t("ratings-count")})
                </span>
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-maroon-600 text-sm">(x{quantity})</span>

            <span className="font-bold text-lg text-zinc-800">{price}</span>

            <span className="text-sm text-zinc-500">{t("currency")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
