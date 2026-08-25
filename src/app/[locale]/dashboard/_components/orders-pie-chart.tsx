"use client";

import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { DashboardOrderStatusStat } from "@/lib/types/dashboard/orders";
import StatusPercentage from "./status-percentage";

type OrdersPieChartProps = {
  status: DashboardOrderStatusStat[];
};

export function OrdersPieChart({ status }: OrdersPieChartProps) {
  const statusMap = Object.fromEntries(status.map((s) => [s._id, s.count]));

  const chartData = [
    {
      label: "Completed",
      value: statusMap.completed,
      fill: "#00BC7D",
    },
    {
      label: "InProgress",
      value: statusMap.inProgress,
      fill: "#2B7FFF",
    },
    {
      label: "Canceled",
      value: statusMap.canceled,
      fill: "#DC2626",
    },
    {
      label: "Pending",
      value: statusMap.pending,
      fill: "#eab308",
    },
  ];

  const totalOrders = chartData.reduce((acc, curr) => acc + curr.value, 0);

  const chartConfig: ChartConfig = {
    value: {
      label: "status",
    },
    Completed: {
      label: "Completed",
    },
    InProgress: {
      label: "In Progress",
    },
    Canceled: {
      label: "Canceled",
    },
    Pending: {
      label: "Pending",
    },
  };

  return (
    <Card className="flex flex-col mr-10 ">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-zinc-800 text-2xl font-semibold">
          Orders Status
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={40}
              outerRadius={90}
              label={StatusPercentage}
              labelLine={false}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <ul>
          {chartData.map((item) => (
            <li
              key={item.label}
              className="w-full flex items-center gap-2 text-xs my-1"
            >
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.fill }}
              ></span>
              <span className="flex items-center gap-20">
                <span className="font-semibold">{item.label}</span>
                <span className="font-bold">
                  {item.value} ({((item.value / totalOrders) * 100).toFixed(0)}
                  %)
                </span>
              </span>
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}
