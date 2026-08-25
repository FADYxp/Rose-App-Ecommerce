"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useOccasions } from "@/hooks/use-occasions";
import { cn } from "@/lib/utils/tailwind-merge";
import { Edit, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDeleteOccasions } from "../_hooks/use-delete-occasions";
import { useRouter } from "@/i18n/navigation";
import PaginationWrapper from "@/components/ui/PaginationWrapper";
import { useTranslations } from "next-intl";
import OccasionsListSkeleton from "./occasions-list-skeleton";
import { Spinner } from "@/components/ui/spinner";

interface OccasionsListProps {
  search?: string;
}

export default function OccasionsList({ search = "" }: OccasionsListProps) {
  //Translations
  const t = useTranslations();

  // State
  const [selected, setSelected] = useState<string | null>(null);
  const [deleteedId, setDeletedId] = useState<string | null>(null);

  const urlSearchParams = useSearchParams();
  const pageFromUrl = urlSearchParams?.get("page") ?? undefined;

  const queryParams: Record<string, string> = {};
  if (search.trim()) queryParams.search = search.trim();
  if (pageFromUrl) queryParams.page = pageFromUrl;

  // Mutations and Queries
  const { data, isLoading, error } = useOccasions(queryParams);
  const { mutate, isPending } = useDeleteOccasions();

  const router = useRouter();

  if (isLoading) return <OccasionsListSkeleton />;
  if (error) return <div>{t("failed-to-load-occasions")}</div>;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-24">{t("name")}</TableHead>
            <TableHead className="text-center">{t("products")}</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.occasions.map((occ) => (
            <TableRow
              key={occ._id}
              onClick={() => setSelected(occ._id)}
              className={cn(
                "cursor-pointer",
                selected === occ._id && "bg-maroon-50 hover:bg-maroon-100"
              )}
            >
              <TableCell>{occ.name}</TableCell>
              <TableCell className="text-center">{occ.productsCount}</TableCell>
              <TableCell className="text-right flex gap-2 justify-end me-5">
                <span
                  className="flex items-center text-sm cursor-pointer px-2 py-1 rounded hover:scale-105 transition-all bg-[#0063D01A] text-blue-600"
                  onClick={() =>
                    router.push(
                      `/dashboard/occasions/update-occasion/${occ._id}`
                    )
                  }
                >
                  <Edit size={14} /> Edit{" "}
                </span>
                <span
                  className="flex items-center text-sm cursor-pointer px-2 py-1 rounded hover:scale-105 transition-all bg-[#FF00001A] text-red-600"
                  onClick={() => {
                    setDeletedId(occ._id);
                    mutate(occ._id);
                  }}
                >
                  {isPending && deleteedId == occ._id ? (
                    <Spinner />
                  ) : (
                    <>
                      <Trash2 size={14} />
                      {t("delete")}
                    </>
                  )}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PaginationWrapper
        totalPages={data?.metadata?.totalPages as number}
        searchParams={queryParams}
      />
    </>
  );
}
