"use client";

import React from "react";
import {
  Box,
  ClipboardList,
  CircleDollarSign,
  ReceiptText,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { useStatistics } from "../_hooks/use-get-statistics";
import AllCategories from "./all-categories";


export default function DashboardStats() {
  //translation
  const t = useTranslations();

  //hooks
  const { data , error } = useStatistics ();

  if (error || !data) {
    return (
      <div className="flex items-center justify-center p-4 w-[490px] h-[300px] text-red-500 font-medium">
        {t("error")}
      </div>
    );
  }

  const { overall } = data.statistics;

  //data configuration for stats cards
  const statsConfig = [
    {
      title: "Total products",
      value: overall.totalProducts,
      icon: <Box size={35} className="text-maroon-600" />,
      textColor: "text-[#991B1B]",
      bgColor: "bg-maroon-50",
    },
    {
      title: "Total orders",
      value: overall.totalOrders,
      icon: <ReceiptText size={35} className="text-blue-600" />,
      textColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total categories",
      value: overall.totalCategories,
      icon: <ClipboardList size={35} className="text-[#753CBF]" />,
      textColor: "text-[#753CBF]",
      bgColor: "bg-[#753CBF0D]",
    },
    {
      title: "Total revenue",
      value: overall.totalRevenue.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
      unit: t("product.currency"),
      icon: <CircleDollarSign size={35} className="text-emerald-600" />,
      textColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
  ];

  return (
    <div className="flex h-80 gap-6">

    <div className="grid grid-cols-2 gap-y-4 p-4 w-[490px]">
      {statsConfig.map((item, index) => (
        <div
          key={index}
          className={`${item.bgColor} p-4 rounded-md flex flex-col w-52 `}
        >
          {/* Icon */}
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2`}
          >
            {item.icon}
          </div>

          {/* Text Content */}
          <div>
            <div className="flex items-baseline gap-1">
              <span
                className={`text-2xl font-semibold tracking-tight ${item.textColor}`}
              >
                {item.value}
              </span>
              {item.unit && (
                <span className={`font-bold ${item.textColor} opacity-90`}>
                  {item.unit}
                </span>
              )}
            </div>
            <p className="text-zinc-800 font-medium mt-1">{item.title}</p>
          </div>
        </div>
      ))}
    </div>

    <AllCategories/>
    </div>

  );
}
