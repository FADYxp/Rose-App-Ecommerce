import React from "react";
import CreateProductForm from "../_components/create-product-form";
import { useTranslations } from "next-intl";

export default function Page() {
  // translations
  const t = useTranslations("create-product");
  return (
    <main className="h-[calc(100vh-70px)] bg-zinc-50 p-7 overflow-auto">
      <h3 className="text-2xl font-semibold text-zinc-800">
       {t('add-new-product')}
      </h3>
      <CreateProductForm />
    </main>
  );
}
