import { Category } from "../types/category";
import { getToken } from "../utils/manage-token";

export async function getCategory(id: string): Promise<Category> {
  const token = await getToken();
  const accessToken = token?.accesstoken;

  const res = await fetch(`${process.env.API}/categories/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  const data = await res.json();

  return data.category;
}
