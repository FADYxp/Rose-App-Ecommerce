"use client";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils/tailwind-merge";
import { Lock, LogOut, UserRoundPen } from "lucide-react";
import { signOut } from "next-auth/react";
import { useTranslations } from "next-intl";

export function AccountSidebar() {
  //Translations
  const t = useTranslations();

  //Hooks
  const pathName = usePathname();

  // variables
  const items = [
    {
      title: t("my-account"),
      url: "/profile",
      icon: UserRoundPen,
    },
    {
      title: t("change-password"),
      url: "/profile/change-password",
      icon: Lock,
    },
  ];

  return (
    <div className="ps-20 pt-10 me-5">
      <h1 className="text-4xl text-center font-bold text-zinc-800 mb-4 ">
        {t("update-profile")}
      </h1>
      <aside className="bg-zinc-50 border border-zinc-100 flex flex-col gap-2.5  p-4 w-[18.7rem] h-[40rem] ">
        {items.map((item) => {
          const isActive = pathName === item.url;

          return (
            <Link
              className={cn(
                "flex items-center gap-1 px-4 py-3 text-base font-medium rounded-lg",
                isActive
                  ? "bg-zinc-800 text-zinc-50"
                  : "hover:bg-zinc-200 transition-all"
              )}
              key={item.url}
              href={item.url}
            >
              <item.icon />
              {item.title}
            </Link>
          );
        })}

        <div
          className="flex items-center bg-zinc-100 rounded-lg text-maroon-500 px-4 py-3 cursor-pointer hover:bg-zinc-200 transition-all font-medium mt-auto"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut size={20} className=" rotate-180 me-2.5 " />
          {t("logout")}
        </div>
      </aside>
    </div>
  );
}
