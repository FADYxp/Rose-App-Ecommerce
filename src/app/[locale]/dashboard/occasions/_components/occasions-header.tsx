import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { Plus } from "lucide-react";
import React from "react";
import { useTranslations } from "next-intl";

interface OccasionsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export default function OccasionsHeader({
  search,
  onSearchChange,
}: OccasionsHeaderProps) {
  const t = useTranslations();
  return (
    <div className="flex flex-col w-full items-center gap-4">
      <div className="flex items-center justify-between w-full">
        <h1 className="text-2xl font-semibold">{t("all-occasions")}</h1>
        <Link href={"/dashboard/occasions/add-occasion"}>
          <Button className="flex items-center text-base">
            {" "}
            <Plus size={16} /> {t("add-new-occasion")}
          </Button>
        </Link>
      </div>
      <div className="w-full">
        <Input
          placeholder="Search occasions..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full"
        />
      </div>
    </div>
  );
}
