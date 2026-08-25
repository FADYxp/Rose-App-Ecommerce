"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { Category } from "@/lib/types/category";
import { Pencil, Trash2 } from "lucide-react";
import { useDeleteCategory } from "../../_hooks/use-delete.category";
import { useTranslations } from "next-intl";
import CategoriesTableSkeleton from "./CategoriesTableSkeleton";

type Props = {
  categories: Category[];
  isLoading: boolean;
};

export default function CategoriesTable({ categories, isLoading }: Props) {
  // translations
  const t = useTranslations("dashboard.categories");

  // Navigation
  const router = useRouter();

  // Queries
  const { mutate: deleteCategory } = useDeleteCategory();

  if (isLoading) {
    return <CategoriesTableSkeleton />;
  }

  if (!categories.length) {
    return (
      <div className="py-10 text-center text-zinc-500 text-lg">
        {t("noCategories")}
      </div>
    );
  }

  return (
    <table className="w-full border-collapse table-fixed rtl:table-auto ltr:table-fixed">
      <thead className="bg-red-50">
        <tr className="border-b bg-zinc-50 rtl:text-right ltr:text-left">
          <th className="py-3 w-64 rtl:pr-5 ltr:pl-5">{t("name")}</th>
          <th className="rtl:text-right">{t("products")}</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {categories.map((category) => (
          <tr
            key={category._id}
            className="border-b transition-colors my-2 hover:bg-maroon-50"
          >
            <td className="capitalize py-3 font-medium duration-300 rtl:pr-5 rtl:text-right ltr:pl-5">
              {category.name}
            </td>
            <td className="text-zinc-600 rtl:text-right">
              {category.productsCount} {t("products")}
            </td>
            <td>
              <div className="flex justify-end gap-2">
                <Button
                  size="sm"
                  variant="inactive"
                  className="text-blue-600 bg-blue-600/10 hover:bg-blue-600/15 transition-colors duration-300 font-medium focus:shadow-none"
                  onClick={() =>
                    router.push(
                      `/dashboard/categories/update-category/${category._id}`
                    )
                  }
                >
                  <Pencil size={15} /> {t("edit")}
                </Button>
                <Button
                  size="sm"
                  variant="inactive"
                  className="text-red-600 bg-red-600/10 hover:bg-red-600/15 transition-colors duration-300 font-medium focus:shadow-none"
                  onClick={() => deleteCategory(category._id)}
                >
                  <Trash2 size={15} /> {t("delete")}
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
