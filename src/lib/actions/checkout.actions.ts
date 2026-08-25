"use server";
import { getToken } from "../utils/manage-token";


export async function AddCheckoutCash(fields: CheckoutPayload) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const response = await fetch(`${process.env.API}/orders/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(fields),
  });

  const payload = await response.json();
  console.log(payload)

  return payload;
}