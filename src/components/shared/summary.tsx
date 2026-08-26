"use client";

import { Button } from "../ui/button";
import { TicketSlashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import type { Cart } from "@/lib/types/cart";

type SummaryProps = {
  cart?: Cart;
};

export default function Summary({ cart }: SummaryProps) {
  // translation
  const t = useTranslations("summary");
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");
      return response.json();
    },
    enabled: !cart,
  });

  const currentCart: Cart | undefined = cart ?? data?.cart;
  const subtotal = currentCart?.totalPrice ?? 0;
  const discount = currentCart?.discount ?? 0;
  const total = currentCart?.totalPriceAfterDiscount ?? 0;

  return (
    <div className="">
      <h3 className="text-3xl font-semibold mb-4">{t("title")}</h3>
      <div className="bg-zinc-50 p-4 rounded-xl shadow-sm space-y-3">
        {/* coupon field */}
        <form className="flex gap-2">
          <input
            type="text"
            placeholder={t("placeholder")}
            className="flex-1 border border-zinc-300 rounded-lg px-4 py-2 outline-none "
          />
          <Button type="submit">
            <TicketSlashIcon /> {t("apply")}
          </Button>
        </form>
        {/* box for show copouns */}
        <div className="h-60 text-zinc-400 border border-zinc-300 italic flex justify-center items-center rounded-md">
          {t("box")}
        </div>
        {/* Total */}
        <div className="p-3 text-zinc-800 ">
          <div className="flex justify-between items-center">
            <p className="text-lg font-medium">{t("subtotal")}</p>
            <p className="text-xl font-semibold">{subtotal} EGP</p>
          </div>
          <div className="flex items-center">
            <span className="flex-1 h-0 border border-zinc-300"></span>
            <span className="text-lg font-semibold text-zinc-800 mx-2">
              {discount}% Discount
            </span>
            <span className="flex-1 h-0 border border-zinc-300"></span>
          </div>
          <div className="flex justify-between items-center text-2xl font-bold">
            <p>{t("total")}</p>
            <p>{total} EGP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
