import OccasionsTabs from "./occasions-tabs";
import ProductCard from "@/components/shared/product-card";
import { MoveRight } from "lucide-react";
import TitleOfSection from "@/components/shared/title-of-section";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { MostPopularProductsProps } from "@/lib/types/product";

export default function MostPopular({
  occasions,
  initialOccasion,
  initialProducts,
}: MostPopularProductsProps) {
  // translation
  const t = useTranslations("most-popular");

  return (
    <section className="flex flex-col gap-6 mt-14">
      <div className="flex justify-between items-center">
        <TitleOfSection
          title={""}
          subtitle={t("title")}
          className="py-0"
          subtitleClassName="text-3xl"
        />
        <div>
          <OccasionsTabs
            occasions={occasions}
            activeOccasion={initialOccasion}
          />
        </div>
      </div>

      {initialProducts.products.length === 0 ? (
        <p className="flex justify-center items-center text-maroon-600 text-lg py-5">
          {t("empty")}
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {initialProducts.products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
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
      )}
      {initialProducts.products.length !== 0 && (
        <Link
          href={`/products`}
          className="flex gap-2 justify-end text-maroon-700 font-bold"
        >
          {t("view-more")} <MoveRight />
        </Link>
      )}
    </section>
  );
}
