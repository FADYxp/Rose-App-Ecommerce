import React from "react";
import { Truck, ShieldCheck, RefreshCcw, Headset } from "lucide-react";

// dummy specifications data
const specs = [
  {
    icon: <Truck size={40} strokeWidth={1.5} />,
    title: "Free Delivery",
    sub: "For orders above 120 EGP",
  },
  {
    icon: <RefreshCcw size={40} strokeWidth={1.5} />,
    title: "Get Refund",
    sub: "Refunds within 30 days",
  },
  {
    icon: <ShieldCheck size={40} strokeWidth={1.5} />,
    title: "Safe Payment",
    sub: "100% Secure Payment",
  },
  {
    icon: <Headset size={40} strokeWidth={1.5} />,
    title: "24/7 Support",
    sub: "Contact us at any time",
  },
];

// component
export default function SpecificationsComponent() {
  // TODO: translation

  return (
    // TODO: colors to be changed
    <section className="w-full">
      <div className="bg-[#FDF0F0] dark:bg-zinc-700 rounded-xl p-10 flex items-center justify-between w-full">
        {specs.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 w-fit px-8 flex-1"
          >
            <div className="w-16 h-16 bg-[#A12525] dark:bg-pink-200 dark:text-red-900 rounded-full flex items-center justify-center text-white ">
              {item.icon}
            </div>

            <div className="flex flex-col gap-1">
              <h3 className="font-semibold text-[#A12525] dark:text-pink-200 text-xl">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-300">
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
