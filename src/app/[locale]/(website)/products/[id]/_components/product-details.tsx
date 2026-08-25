"use client";

import Image from "next/image";
import { useFetchProductDetails } from "../_hooks/use-fetch-product-details";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import ProductInfo from "./product-info";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/tailwind-merge";

export default function ProductDetails({ id }: { id: string }) {
  const t = useTranslations();
  const { productDetails, error } = useFetchProductDetails(id);
  const [mainImage, setMainImage] = useState(productDetails?.product?.imgCover);

  function ensureSixImages(images: string[]): string[] {
    if (!images.length) return [];

    const result = [...images];
    while (result.length < 6) {
      result.push(...images);
    }
    return result.slice(0, 6);
  }

  const allImages = [
    productDetails?.product?.imgCover,
    ...(productDetails?.product?.images || []),
  ].filter(Boolean) as string[];

  const carouselImages = ensureSixImages(allImages);

  useEffect(() => {
    if (productDetails?.product?.imgCover) {
      setMainImage(productDetails.product.imgCover);
    }
  }, [productDetails]);

  if (error) return <div>{t("product.error-loading-product-details")}</div>;

  return (
    <div className="grid grid-cols-2 gap-16 p-10 h-[32.7rem] w-[80rem] mx-auto mb-20">
      <div className="col-span-1 w-full max-h-full ">
        {/* Image */}
        {mainImage && (
          <Image
            src={mainImage}
            alt={productDetails?.product?.title || "Product Image"}
            width={300}
            height={300}
            className="w-full h-[400px] object-fill rounded-xl border"
          />
        )}

        {/* Carosel */}
        {
          <Carousel
            className=" "
            opts={{
              loop: true,
            }}
          >
            <CarouselContent className="flex gap-0.5 -ml-0 mt-2 w-full">
              {carouselImages.map((img, index) => (
                <CarouselItem
                  key={`${img}-${index}`}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 pl-0"
                >
                  <Image
                    src={img}
                    alt={`thumb-${index}`}
                    width={120}
                    height={120}
                    onClick={() => setMainImage(img)}
                    className={cn(
                      "w-[91px] h-[111px] object-cover rounded-xl border cursor-pointer",
                      mainImage === img && "border-maroon-600 border-2"
                    )}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        }
      </div>
      <div className="col-span-1 w-full max-h-full ">
        <ProductInfo product={productDetails?.product} />
      </div>
    </div>
  );
}
