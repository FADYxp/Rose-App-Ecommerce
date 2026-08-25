import { ProductDetailsResponse } from "@/lib/types/product";

export async function getProductDetails(
  id: string
): Promise<ProductDetailsResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
    {
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) throw new Error("Failed to fetch product details");

  return res.json();
}
