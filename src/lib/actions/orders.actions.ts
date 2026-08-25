"use server";

import { getToken } from "@/lib/utils/manage-token";
import { DashboardStatisticsResponse } from "../types/dashboard/orders";

export async function getOrdersStatisticsAction(): Promise<
  DashboardStatisticsResponse | undefined
> {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;
  try {
    const res = await fetch(
      "https://flower.elevateegy.com/api/v1/statistics/orders",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to get orders statistics`);
    }
    const statistics: DashboardStatisticsResponse = await res.json();
    return statistics;
  } catch (err) {
    console.log(err);
    return;
  }
}
