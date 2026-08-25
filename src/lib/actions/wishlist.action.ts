"use server";
import { ApiResponse } from "../types/api";
import { getToken } from "../utils/manage-token";

// add product to wishlist
export async function addWishlist(fields: { productId: string }) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const response = await fetch(`${process.env.API}/wishlist/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });

  // if (!response.ok) throw new Error("Failed to fetch");

  const payload: ApiResponse = await response.json();

  return payload;
}

// Delete product from wishlist.
export async function removeWishlist(productId: string) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const response = await fetch(`${process.env.API}/wishlist//${productId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // if (!response.ok) throw new Error("Failed to fetch");

  const payload: ApiResponse = await response.json();

  return payload;
}

// check if product in wishlist, else.
export async function checkWishlist(productId: string) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const response = await fetch(
    `${process.env.API}/wishlist/check/${productId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  // if (!response.ok) throw new Error("Failed to fetch");

  const payload: CheckWishlistResponse = await response.json();

  return payload?.isInWishlist;
}
