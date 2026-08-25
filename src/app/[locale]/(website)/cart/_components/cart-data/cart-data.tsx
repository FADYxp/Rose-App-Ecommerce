"use client";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import CartGuestData from "../cart-guest-data/cart-guest-data";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import {
  Plus,
  Minus,
  Trash2,
  BrushCleaning,
  MoveLeft,
  Star,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCart } from "@/lib/actions/delete-cart.actions";
import { updateCartQuantity } from "@/lib/actions/update-quantity.action";
import { deleteProduct } from "@/lib/actions/remove-product.actions";
import PersonalCartCarousel from "../personal-cart-carousel/personal-cart-carousel";
import EmptyCartCard from "../empty-cart-card/empty-cart-card";
import type { AddToCartItem, CartItem } from "@/lib/types/cart";

export default function CartData() {
  // State
  const [guestCart, setGuestCart] = useState<AddToCartItem[]>([]);
  const { status } = useSession();

  // translations
  const t = useTranslations("cart");

  // display number of products in scroll
  const ITEMS_PER_LOAD = 3;
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const queryClient = useQueryClient();

  // Effects
  // guest → read from localStorage
  useEffect(() => {
    if (status === "unauthenticated") {
      const cart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
      setGuestCart(cart);
    }
  }, [status]);

  // functions
  // authenticated → fetch from backend
  const { data, isLoading, error } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await fetch("/api/cart");
      if (!res.ok) throw new Error("Failed to fetch cart");
      return res.json();
    },
    enabled: status === "authenticated",
  });

  // handler clear cart
  const handleClearCart = async () => {
    try {
      await deleteCart();
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error("Failed to clear cart:", err);
    }
  };

  // handle qunatity
  const handleQuantityChange = async (
    productId: string,
    newQuantity: number
  ) => {
    try {
      await updateCartQuantity(productId, newQuantity);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error("Failed to update quantity:", err);
    }
  };

  // handle delete product
  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId);
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    } catch (err) {
      console.error("Failed to delete product:", err);
    }
  };

  // infinite scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 20) {
      setVisibleCount((prev) => prev + ITEMS_PER_LOAD);
    }
  };

  // guest case
  if (status === "unauthenticated") {
    return (
      <div>
        {guestCart.length === 0 ? (
          <EmptyCartCard productCount={guestCart.length} />
        ) : (
          <CartGuestData />
        )}
      </div>
    );
  }

  // user login
  if (status === "loading" || isLoading) return <p> t('loading') </p>;
  if (error) return <p>Error loading cart</p>;

  // variables
  const cartItems: CartItem[] = data?.cart?.cartItems ?? [];
  const visibleItems = cartItems.slice(0, visibleCount);

  return (
    <>
      <div className="px-20">
        {data?.numOfCartItems === 0 ? (
          <EmptyCartCard productCount={data?.numOfCartItems ?? 0} />
        ) : (
          // in case cart is not empty
          <div className="w-[48rem]">
            {/* cart header */}
            <div className="cart-header flex justify-between items-center mb-4 w-full">
              <div className="text-5xl text-zinc-800 font-bold">
                {t("title")}
                <span className="text-zinc-500 font-normal text-base ms-2">
                  {data?.numOfCartItems} {t("products")}
                </span>
              </div>
              <Button
                variant="light"
                className="capitalize"
                onClick={handleClearCart}
              >
                <BrushCleaning size={20} /> {t("empty")}
              </Button>
            </div>

            {/* cart body */}
            <Card className="mb-6 w-full">
              <CardContent
                className="max-h-[32rem] overflow-y-auto hide-scrollbar"
                onScroll={handleScroll}
              >
                {visibleItems.map((item: CartItem) => (
                  <div
                    key={item._id}
                    className="flex justify-between items-center border-b py-4"
                  >
                    {/* card content */}
                    <div className="flex items-center gap-4">
                      {/* card image */}
                      <Image
                        src={item.product.imgCover}
                        alt={item.product.title}
                        width={100}
                        height={100}
                        className="rounded h-32 object-cover"
                      />

                      <div className="flex flex-col justify-between items-start h-32 ">
                        {/* card title and rating */}
                        <div>
                          <p className="font-semibold text-lg text-start text-maroon-600 capitalize pb-2">
                            {item.product.title}
                          </p>
                          <div className="font-normal text-start text-base flex items-center gap-1">
                            <Star
                              className="text-amber-500  fill-amber-500"
                              size={20}
                            />
                            {t("rating")}:
                            <span className="font-medium">
                              {item.product.rateAvg}
                            </span>
                            <span className="text-blue-600 font-medium text-base ms-2">
                              ({item.product.rateCount} {t("ratings")})
                            </span>
                          </div>
                        </div>

                        {/* product price */}
                        <p>
                          <span className="text-maroon-600 text-sm font-medium me-1">
                            (x{item?.quantity})
                          </span>
                          <span className="font-bold text-2xl">
                            {item.price * item.quantity} {t("currency")}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-end h-32">
                      {/* remove product */}
                      <Button
                        variant="destructive"
                        className="capitalize "
                        onClick={() => handleDeleteProduct(item.product._id)}
                      >
                        <Trash2 /> {t("remove-product")}
                      </Button>

                      {/* quantity */}
                      <div className="flex items-center gap-2 ">
                        {/* minus */}
                        <Button
                          variant="secondary"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity - 1
                            )
                          }
                        >
                          <Minus size={20} />
                        </Button>

                        {/* input value */}
                        <Input
                          type="number"
                          value={item.quantity}
                          className="w-24 text-center p-4 border border-zinc-300 rounded-[1rem]"
                          readOnly
                        />

                        {/* plus */}
                        <Button
                          variant="secondary"
                          onClick={() =>
                            handleQuantityChange(
                              item.product._id,
                              item.quantity + 1
                            )
                          }
                        >
                          <Plus size={20} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {/* loading on scroll */}
                {visibleCount < cartItems.length && (
                  <p className="text-center py-4 text-zinc-500">
                    {t("loading")}
                  </p>
                )}
              </CardContent>
            </Card>
            <div className="text-start py-6 w-full">
              <Button variant={"destructive"} className="capitalize">
                <MoveLeft size={20} />
                <Link href="/">{t("continue-shopping")}</Link>
              </Button>
            </div>
          </div>
        )}

        {/* Products you may like  */}
        <PersonalCartCarousel />
      </div>
    </>
  );
}
