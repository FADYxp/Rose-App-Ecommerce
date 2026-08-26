import React from "react";
import { ArrowLeft, MoveRight } from "lucide-react";
import PayMethod from "./pay-method";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useCheckout } from "@/hooks/use-checkout";
import { useToast } from "@/hooks/use-toast";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

type PaymentMethodProps = CheckoutStep & CheckoutPayload;
type PaymentMethodOption = {
  image: string;
  title: string;
  description: string;
  method: "cash" | "credit";
};

export default function PaymentMethod({
  setStep,
  street,
  phone,
  city,
  lat,
  long,
}: PaymentMethodProps) {
  // translation
  const t = useTranslations("payment-method");
  const locale = useLocale();
  const router = useRouter();
  // state
  const [selectedMethod, setSelectedMethod] = React.useState<"cash" | "credit">(
    "credit"
  );

  // for Test
  const list: PaymentMethodOption[] = [
    {
      image: "/assets/cash.png",
      title: t("cash"),
      description: t("cash-description"),
      method: "cash",
    },
    {
      image: "/assets/credit.png",
      title: t("card"),
      description: t("card-description"),
      method: "credit",
    },
  ];

  const { checkoutAsync, isPending } = useCheckout();
  const { toast } = useToast();

  const handleCheckout = async () => {
    try {
      const payload = await checkoutAsync({
        values: { street, phone, city, lat, long },
        method: selectedMethod,
        paymentUrl: `${window.location.origin}/${locale}/orders/myOrders/allOrders`,
      });

      if (selectedMethod === "credit") {
        const paymentUrl = payload?.session?.url ?? payload?.url;
        if (!paymentUrl) throw new Error("Payment URL was not returned");
        window.location.assign(paymentUrl);
        return;
      }

      toast({
        title: t("success"),
        variant: "success",
      });
      router.push("/orders/myOrders/allOrders");
    } catch (error) {
      toast({
        title: error instanceof Error ? error.message : t("error"),
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setStep("shipping_address")}
          className="bg-zinc-100 text-zinc-00 p-2 rounded-lg flex items-center gap-1 "
        >
          <ArrowLeft size={20} strokeWidth={1.5} className="rtl:rotate-180" />
          {t("back")}
        </button>
        <h3 className="font-semibold text-3xl">{t("title")}</h3>
      </div>
      {/* Methods List */}
      <ul className="p-3 flex gap-4 h-80">
        {list.map((item, index) => (
          <li key={index} className="flex-1 h-full">
            <button
              className="w-full h-full"
              onClick={() => setSelectedMethod(item.method)}
            >
              {selectedMethod === item.method ? (
                // if the method is selected
                <PayMethod
                  index={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  selectedMethod={true}
                />
              ) : (
                // if the method is not selected
                <PayMethod
                  index={index}
                  image={item.image}
                  title={item.title}
                  description={item.description}
                  selectedMethod={false}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex justify-end mt-6">
        <Button
          className="w-40 font-semibold"
          onClick={handleCheckout}
          disabled={isPending}
        >
          {isPending ? "..." : t("checkout")}{" "}
          <MoveRight size={20} className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
