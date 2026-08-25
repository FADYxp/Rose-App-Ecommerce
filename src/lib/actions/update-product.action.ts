"use server";

import { getToken } from "../utils/manage-token";

export async function updateProduct(values: FormData , productId: string) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products/${productId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: values,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return res.json();
}
