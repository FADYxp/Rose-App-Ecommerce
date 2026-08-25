"use client";

import Image from "next/image";
import logo from "@public/images/logo1.svg";
import { Heart, MapPinPen, ShoppingCart, User } from "lucide-react";
import Navbar from "./navbar";
import { cn } from "@/lib/utils/tailwind-merge";
import Notifications from "@/components/skeletons/notifications/Notifications";
import ToggleLanguage from "@/components/features/toggle-language";
import LoginPopup from "@/components/skeletons/login-popup/login-popup";
import { useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { useGetCart } from "../../products/[id]/_hooks/use-get-cart";
import { DeliveryLocationDialog } from "@/app/[locale]/checkout/_components/address-dialog";
import { Address } from "@/lib/types/address";
import { useTranslations } from "next-intl";
import SearchModule from "./search-component/module";
import { useSession } from "next-auth/react";

export default function Header() {
  const t = useTranslations();
  const { cart } = useGetCart();

  // State for location dialog
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState("Cairo");
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const { data: session } = useSession();
  const isLoggedIn = !!session;

  const headerList = [
    {
      icons: [
        <User
          key="user-icon"
          className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50"
          width={24}
          height={24}
        />,
      ],
      text: isLoggedIn ? "profile" : "login",
      link: isLoggedIn ? "/profile" : "/login",
    },
    {
      icons: [
        <Heart
          key="heart-icon"
          className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50"
          width={24}
          height={24}
        />,
        <div className="relative" key="cart">
          <Link href="/cart">
            <ShoppingCart
              key="cart-icon"
              className="text-zinc-700 text-sm font-normal cursor-pointer dark:text-zinc-50 mx-2"
              width={24}
              height={24}
            />
          </Link>
          <p className="absolute w-5 h-5 rounded-full bg-red-600 text-center text-white -top-[0.82rem] right-0">
            {cart?.numOfCartItems}
          </p>
        </div>,
        <Notifications key="notifications" />,
      ],
    },
  ];
  useEffect(() => {
    const saved = localStorage.getItem("selectedAddress");
    if (saved) {
      const parsed = JSON.parse(saved);
      setSelectedAddress(parsed);
      setCurrentCity(parsed.city);
    }
  }, []);

  // Handle address selection
  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
    setCurrentCity(address.city);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  // state to manage login popup visibility
  const [isLoginHovered, setIsLoginHovered] = useState(false);

  return (
    <>
      <header className="px-5 flex items-center justify-between py-2 text-sm">
        <div className="logo mr-2">
          <Image src={logo} alt="Rose Logo" width={85} height={80} />
        </div>

        {/* Delivery Location Trigger */}
        <div className="ms-4 mr-4">
          <div
            className="flex flex-col text-center cursor-pointer hover:bg-gray-50 dark:hover:bg-zinc-800 px-3 py-1 rounded-lg transition-colors"
            onClick={() => setIsLocationDialogOpen(true)}
          >
            <p className="font-normal text-zinc-500 text-xs">{t("deliver")}</p>
            <span className="font-medium text-base text-maroon-700 flex items-center gap-1">
              <MapPinPen size={18} />
              {selectedAddress?.city || currentCity}
            </span>
          </div>
        </div>

        <div className="flex-1 flex items-center">
          <SearchModule />

          <ul className="flex items-center ms-2">
            {headerList.map((item, index) => (
              <li
                key={index}
                className={cn(
                  "flex items-center gap-1 px-3 cursor-pointer",
                  index === 1 && "border-x h-12 relative dark:border-x-zinc-700"
                )}
              >
                {item.text === "login" && !isLoggedIn ? (
                  <div
                    className="relative"
                    onMouseEnter={() => setIsLoginHovered(true)}
                    onMouseLeave={() => setIsLoginHovered(false)}
                  >
                    <Link
                      href={item.link}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      {item.icons?.map((icon, i) => (
                        <span key={i}>{icon}</span>
                      ))}
                      <span>{item.text}</span>
                    </Link>

                    {isLoginHovered && (
                      <div className="absolute top-full end-0 z-50">
                        <LoginPopup />
                      </div>
                    )}
                  </div>
                ) : item.text === "profile" && isLoggedIn ? (
                  <Link
                    href={item.link}
                    className="flex items-center gap-1 cursor-pointer"
                  >
                    {item.icons?.map((icon, i) => (
                      <span key={i}>{icon}</span>
                    ))}
                    <span>{item.text}</span>
                  </Link>
                ) : (
                  <>
                    {item.icons
                      ? item.icons.map((icon, iconIndex) => (
                          <span key={iconIndex}>{icon}</span>
                        ))
                      : null}
                    {item.text ? <span>{item.text}</span> : null}
                  </>
                )}
              </li>
            ))}

            <li className="px-3">
              <ToggleLanguage />
            </li>
          </ul>
        </div>
      </header>

      <Navbar />

      {/* Delivery Location Dialog */}
      <DeliveryLocationDialog
        open={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
        onSelectAddress={handleSelectAddress}
      />
    </>
  );
}
