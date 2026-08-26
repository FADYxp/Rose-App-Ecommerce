"use client";

import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Search, Loader2, Star } from "lucide-react";
import { getProducts } from "@/lib/services/products.service";
import { useSession } from "next-auth/react";
import { getPersonalizedRecommendations } from "@/lib/services/personalized-rec.service";
import { Product } from "@/lib/types/product";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "@/i18n/navigation";

export default function SearchModule() {
  const router = useRouter();
  const { data: session, status } = useSession(); // Auth status

  // States
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState<(Product | Recommendation)[]>([]);
  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch Recommendations
  const fetchRecommendations = async () => {
    if (status !== "authenticated") {
      setProducts([]);
      setHasMore(false);
      return;
    }

    setLoading(true);
    try {
      const userId = session?.user?._id;
      const data: RecommendationsResponse =
        await getPersonalizedRecommendations(userId);

      setProducts(data?.recommendations || []);
      setHasMore(false);
    } catch (err) {
      console.error(err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  //  Fetch Search Products
  const fetchSearchData = async (isNewSearch = false) => {
    const currentPage = isNewSearch ? 1 : page;
    try {
      const res = await getProducts({
        limit: 5,
        page: currentPage,
        search: keyword.trim(),
      });

      const newItems = res.products || [];
      setProducts((prev) => (isNewSearch ? newItems : [...prev, ...newItems]));

      const total = res.metadata?.totalItems || 0;
      setHasMore(
        products.length + newItems.length < total && newItems.length > 0
      );
      if (!isNewSearch) setPage((p) => p + 1);
    } catch (err) {
      console.error(err);
      setHasMore(false);
    }
  };

  // Debounce search & fetch recommendations on open
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (keyword.trim()) {
        setPage(1);
        fetchSearchData(true);
      } else if (isOpen) {
        fetchRecommendations();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [keyword, isOpen, status]);

  const handleFocus = () => setIsOpen(true);

  return (
    <div ref={searchRef} className="relative w-full flex flex-col items-center">
      {/* Search Input */}
      <div className="w-full relative">
        <Input
          className="w-full h-12 pl-10 pr-4 rounded-lg border-maroon-700 focus-visible:ring-maroon-700"
          placeholder="What awesome gift are you looking for?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onFocus={handleFocus}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
      </div>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white rounded-b-2xl shadow-xl border border-zinc-200 z-[999] overflow-hidden">
          <div className="p-3 border-b border-zinc-100 bg-zinc-50">
            <h4 className="text-maroon-700 font-bold text-sm">
              {keyword
                ? `Results for "${keyword}"`
                : status === "authenticated"
                  ? "Recommended for you:"
                  : "No recommendations available"}
            </h4>
          </div>

          <div
            id="scrollableDiv"
            className="h-[450px] overflow-y-auto custom-scrollbar p-2"
          >
            <InfiniteScroll
              dataLength={products.length}
              next={() => fetchSearchData(false)}
              hasMore={keyword !== "" && hasMore}
              loader={
                <div className="flex justify-center p-4">
                  <Loader2 className="animate-spin text-maroon-700 w-6 h-6" />
                </div>
              }
              scrollableTarget="scrollableDiv"
              endMessage={
                products.length > 0 && (
                  <p className="text-center text-zinc-400 text-xs py-4">
                    <b>No more products to show</b>
                  </p>
                )
              }
            >
              <div className="flex flex-col gap-2">
                {products.map((product, index) => (
                  <div
                    key={`${product._id}-${index}`}
                    onClick={() => {
                      router.push(`/products/${product._id}`);
                      setIsOpen(false);
                    }}
                    className="flex items-center justify-between p-2 hover:bg-zinc-50 rounded-lg cursor-pointer transition-colors border-b border-zinc-50 last:border-0 group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-zinc-100 flex-shrink-0 shadow-sm">
                        <Image
                          src={product.imgCover || "/placeholder.png"}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div className="min-w-0">
                        <h5 className="text-sm font-semibold text-zinc-800 truncate max-w-[150px] md:max-w-[250px]">
                          {product.title}
                        </h5>
                        <div className="flex items-baseline gap-1">
                          <p className=" font-bold text-sm">
                            {product.priceAfterDiscount || product.price}
                          </p>
                          <span className="text-[10px] text-zinc-500 font-medium">
                            EGP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end flex-shrink-0">
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 fill-orange-400 text-orange-400" />
                        <span className="  text-zinc-800">
                          Rating:{product.rateAvg}/5
                        </span>
                        <span className="text-blue-600 text-[10px]">
                          ({product.rateCount} ratings)
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </InfiniteScroll>

            {!loading && products.length === 0 && (
              <div className="text-center py-10 text-zinc-400">
                {keyword ? "No products found." : "Start searching for gifts!"}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
