import React from "react";
import UpdateProductForm from "../_components/update-product-form";

type UpdateProductProps = {
  params: {
    update: string;
  };
};

export default function Page({ params }: UpdateProductProps ) {
  return (
    <main className="h-[calc(100vh-70px)] bg-zinc-50 p-7 overflow-auto">
      <UpdateProductForm productId={params.update} />
    </main>
  );
}
