import { getOrdersStatisticsAction } from "@/lib/actions/orders.actions";
import { RevenueChart } from "./revenue-chart";

export default async function Revenue() {
  const orders = await getOrdersStatisticsAction();
  return (
    <div className="w-[49.6rem] max-h-96 mx-auto ">
      {orders?.statistics?.monthlyRevenue && (
        <RevenueChart
          dailyRevenue={orders?.statistics?.dailyRevenue}
          monthlyRevenue={orders.statistics.monthlyRevenue}
        />
      )}
    </div>
  );
}
