import React from "react";
import AddressCard from "./address-card";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import { useAddresses } from "@/hooks/use-address";
import Loading from "@/app/loading";
import { useTranslations } from "next-intl";

export default function ShippingAddress({
  setStep,
  id,
  setId,
  setStreet,
  setPhone,
  setCity,
  setLat,
  setLong,
}: ShippingAddressProps) {
  //translations
  const t = useTranslations("shipping-address");

  // handle select address
  const handleSelectAddress = (address: Address) => {
    setId(address._id);
    setStreet(address.street);
    setPhone(address.phone);
    setCity(address.city);
    setLat(address.lat || "");
    setLong(address.long || "");
  };

  //states and queries
  const { data, isLoading, isError } = useAddresses();

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-80">
        <Loading />;
      </div>
    );

  if (isError)
    return (
      <p className="flex justify-center items-center text-maroon-600 text-lg py-5">
        Failed to load addresses. Please try again later.
      </p>
    );

  return (
    <div className="space-y-3">
      {/* title of component */}
      <h3 className="font-semibold text-3xl">{t("title")}</h3>
      {/* addresses list show */}
      <ul className="flex flex-col gap-3 h-80 overflow-y-auto hide-scrollbar ">
        {data?.addresses.map((address) => (
          <li key={address._id}>
            <button
              className="w-full"
              onClick={() => handleSelectAddress(address)}
            >
              {id === address._id.toString() ? (
                // if the address is selected show it with different style
                <AddressCard
                  selectedAddress={true}
                  city={address.city}
                  phone={address.phone}
                  street={address.street}
                />
              ) : (
                // if the address is not selected show it with default style
                <AddressCard
                  selectedAddress={false}
                  city={address.city}
                  phone={address.phone}
                  street={address.street}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
      {/* choise to add new address */}
      <div className="h-32">
        <div className="flex items-center">
          <span className="flex-1 h-0 border border-zinc-100"></span>
          <span className="text-lg font-semibold text-zinc-500 mx-2">
            {t("or")}
          </span>
          <span className="flex-1 h-0 border border-zinc-100"></span>
        </div>
        <Button className="bg-maroon-50 text-maroon-600 w-full text-base font-medium hover:text-white hover:bg-maroon-600 mt-2">
          {t("add-new")}
        </Button>
      </div>
      {/* next button for going to payment method */}
      <div className="flex justify-end">
        <Button
          onClick={() => setStep("payment_method")}
          className="w-40 font-semibold"
        >
          {t("next")}
          <MoveRight size={20} className="rtl:rotate-180" />
        </Button>
      </div>
    </div>
  );
}
