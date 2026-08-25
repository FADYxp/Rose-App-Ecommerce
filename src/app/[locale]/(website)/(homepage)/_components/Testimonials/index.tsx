"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import TestimonialCard from "./testimonial-card";
import TitleOfSection from "@/components/shared/title-of-section";

type TestimonialsResponse = {
  // `TestimonialProps` type definition
  testimonials: TestimonialProps[];
};

export function Testimonials() {
  // translation hook
  const t = useTranslations("testimonials");
  const locale = useLocale(); // Get the current locale

  //hooks
  const [testimonialsData, setTestimonialsData] =
    React.useState<TestimonialsResponse | null>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  // create the autoplay plugin
  const autoplay = React.useRef(
    Autoplay({ delay: 1000, stopOnInteraction: false })
  );

  React.useEffect(() => {
    async function fetchTestimonials() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/testimonials/` // use the environment variable for the base URL
        );
        if (!res.ok) {
          throw new Error("Failed to fetch data"); // handle HTTP errors
        }
        const result = await res.json(); // parse JSON response
        setTestimonialsData(result); // set fetched data to state
      } catch (err: unknown) {
        const message = // handle fetch errors
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
      } finally {
        setLoading(false); // set loading to false after fetch is done
      }
    }
    fetchTestimonials(); // call the fetch function
  }, []);

  if (loading) {
    // display loading state
    return (
      <p className="text-center text-3xl font-bold py-5 text-red-500">
        Loading testimonials...
      </p>
    );
  }

  if (error) {
    // display error state
    return (
      <p className="text-center text-3xl font-bold py-5 text-red-500">
        {error}
      </p>
    );
  }

  return (
    <section>
      <TitleOfSection title={t("title")} subtitle={t("sub-title")} />
      <div className="bg-maroon-50 dark:bg-zinc-700 px-4 py-14 overflow-hidden">
        {/* carousel section */}
        <Carousel
          plugins={[autoplay.current]} // plugins for autoplay functionality
          onMouseEnter={() => autoplay.current.stop()} // stop autoplay on mouse enter
          onMouseLeave={() => autoplay.current.play()} // resume autoplay on mouse leave
          opts={{
            // carousel options
            align: "start",
            loop: true,
            direction: locale === "ar" ? "rtl" : "ltr",
            //  smooth scrolling settings
            dragFree: true,
            skipSnaps: false,
            duration: 300,
          }}
          className="container mx-auto"
        >
          <CarouselContent className="px-5">
            {/* map for testimonial card  */}
            {testimonialsData?.testimonials?.map((item, index) => (
              <CarouselItem
                key={index} // Add a unique key for each item
                className="basis-1/3"
              >
                <div className="p-0 h-full">
                  <div className="flex items-center justify-center">
                    {/* call dynamic testimonial card  */}
                    <TestimonialCard
                      _id={item._id}
                      user={item.user}
                      rating={item.rating}
                      content={item.content}
                      updatedAt={item.updatedAt}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
            {testimonialsData?.testimonials?.map((item, index) => (
              <CarouselItem
                key={index} // Add a unique key for each item
                className="basis-1/3"
              >
                <div className="p-0 h-full">
                  <div className="flex l items-center justify-center">
                    {/* call dynamic testimonial card  */}
                    <TestimonialCard
                      _id={item._id}
                      user={item.user}
                      rating={item.rating}
                      content={item.content}
                      updatedAt={item.updatedAt}
                    />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
