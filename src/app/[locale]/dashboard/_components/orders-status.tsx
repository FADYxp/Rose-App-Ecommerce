import { getOrdersStatisticsAction } from "@/lib/actions/orders.actions";
import { OrdersPieChart } from "./orders-pie-chart";

export default async function OrdersStatus() {
  const orders = await getOrdersStatisticsAction();
  const status = orders?.statistics?.ordersByStatus || [];
  return (
    <div className="w-1/4">
      <OrdersPieChart status={status} />
    </div>
  );
}
