"use server";

import { AddToCartItem, CartResponse } from "../types/cart";
import { getToken } from "../utils/manage-token";

export async function addToCartAction(item: AddToCartItem) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(item),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const cart: CartResponse = await res.json();
  return cart;
}
