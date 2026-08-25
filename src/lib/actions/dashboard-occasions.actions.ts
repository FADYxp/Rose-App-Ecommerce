"use server";

import {
  DeleteOccasionResponse,
  GetOccasionResponse,
  OccasionsResponse,
} from "../types/occasion";
import { getToken } from "../utils/manage-token";

// Delete Occasion Action
export async function deleteOccasionAction(occasionId: string) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/occasions/${occasionId}`, {
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

  const message: DeleteOccasionResponse = await res.json();
  return message;
}

// Add Occasion Action
export async function addOccasionAction(formData: FormData) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/occasions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data: OccasionsResponse = await res.json();
  return data;
}

// Update Occasion Action
export async function updateOccasionAction(
  occasionId: string,
  formData: FormData
) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/occasions/${occasionId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const data: OccasionsResponse = await res.json();
  return data;
}

////////////////////

export async function getOccasionById(
  id: string
): Promise<GetOccasionResponse> {
  const res = await fetch(`${process.env.API}/occasions/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch occasion");

  return res.json();
}
