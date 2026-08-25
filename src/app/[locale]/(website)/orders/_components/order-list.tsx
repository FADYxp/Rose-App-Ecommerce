import OrderCard from "./order-card";
import { useTranslations } from "next-intl";
import { getOrders } from "@/lib/services/orders.service";

export default async function OrderList() {
  // Translation
  const t = useTranslations("orders");
  // States
  const data = await getOrders();

  if (!data?.orders?.length)
    return (
      <p className="flex justify-center items-center text-maroon-600 text-lg py-5">
        {t("no-orders-found")}
      </p>
    );
  return (
    <div className="space-y-4">
      {data.orders.map((order: Order) => (
        <OrderCard key={order._id} order={order} />
      ))}
    </div>
  );
}
