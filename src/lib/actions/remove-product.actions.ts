"use server";

import { getToken } from "../utils/manage-token";

export async function deleteProduct(productId: string) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const cart = await res.json();
  return cart;
}
