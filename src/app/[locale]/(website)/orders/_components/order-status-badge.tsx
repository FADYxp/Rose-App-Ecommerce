import { useTranslations } from "next-intl";

const statusStyles: Record<OrderState, string> = {
  pending: "bg-blue-500",
  done: "bg-emerald-500",
  cancelled: "bg-red-600",
};

export default function OrderStatusBadge({ state }: OrderStatusBadgeProps) {
  // Translation
  const t = useTranslations("orders");
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm capitalize ${
        statusStyles[state]
      }`}
    >
      {t(`order-status.${state}`)}
    </span>
  );
}
