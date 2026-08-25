"use server"
export async function getProducts(params: Record<string, any> = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      query.append(key, value.toString());
    }
  });

  const res = await fetch(`${process.env.API}/products?${query}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch");

  return res.json();
}
