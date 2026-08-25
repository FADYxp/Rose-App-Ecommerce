"use server";

import { getToken } from "../utils/manage-token";

export async function updateCartQuantity(productId: string, quantity: number) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/cart/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ quantity }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const cart = await res.json();
  return cart;
}
