import { Suspense } from "react";
import { useTranslations } from "next-intl";
import OrderList from "../../_components/order-list";
import OrdersSkeleton from "../../_components/orders-skeleton";

export default function MyOrdersPage() {
  const t = useTranslations("orders");

  return (
    <main className="px-16 py-8">
      <h1 className="font-bold text-4xl text-zinc-800 mb-6">{t("title")}</h1>
      <Suspense fallback={<OrdersSkeleton />}>
        <OrderList />
      </Suspense>
    </main>
  );
}
