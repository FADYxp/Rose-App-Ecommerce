"use client";

import { MoreVerticalIcon, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export function SidebarDropdown({ user }: SidebarDropdownProps) {
  // Translations
  const t = useTranslations("dashboard.sidebar");
  // Navigations
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open user menu">
          <MoreVerticalIcon className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" align="end">
        <DropdownMenuGroup className="p-2">
          <DropdownMenuItem className="text-maroon-700 font-bold ms-1 border-b border-zinc-100">
            {user?.firstName} {user?.lastName}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push("/account")}
            className="hover:cursor-pointer border-b border-zinc-100 text-zinc-700 hover:text-zinc-900"
          >
            <User className="mr-2 h-4 w-4" />
            {t("account")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => signOut()}
            className="text-zinc-700 hover:text-zinc-900 hover:cursor-pointer"
          >
            <LogOut className="mr-2 h-4 w-4" />
            {t("logout")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
