"use server";
import { getToken } from "../utils/manage-token";

type CheckoutMethod = "cash" | "credit";

type CheckoutOptions = {
  method: CheckoutMethod;
  paymentUrl?: string;
};

export async function checkoutAction(
  fields: CheckoutPayload,
  { method, paymentUrl }: CheckoutOptions
) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;
  if (!token) throw new Error("You must be logged in to checkout");

  const endpoint =
    method === "credit"
      ? `${process.env.API}/orders/checkout?url=${encodeURIComponent(paymentUrl ?? "")}`
      : `${process.env.API}/orders`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ shippingAddress: fields }),
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload?.message || "Checkout failed");
  }

  return payload;
}
