"use server"
export async function getSingleProduct(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`,
    {
      method: "GET",
      cache: "no-store",
    }
  );
  if (!res.ok) throw new Error("Failed to fetch product details");

  const products = res.json();
  return products;
}
