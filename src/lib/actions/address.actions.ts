"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { revalidatePath } from "next/cache";

// constants
const API_URL = process.env.API;

//  Utilities

/**
 * Get access token from NextAuth session
 */
async function getAccessToken(): Promise<string> {
  const session = await getServerSession(authOptions);

  // check if user is authenticated
  const token =
    (session as any)?.user?.accesstoken || (session as any)?.accesstoken;

  // unauthorized
  if (!token) {
    throw new Error("Unauthorized: No access token found");
  }

  return token;
}

/**
 * Generic API request helper
 */
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  if (!API_URL) {
    throw new Error("API_URL is not defined in environment variables");
  }

  // get access token
  const token = await getAccessToken();

  // make request
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
    cache: "no-store",
  });

  // handle errors
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API Error ${res.status}: ${errorText || res.statusText}`);
  }

  return res;
}

/**
 * Revalidate pages after mutation
 */
function revalidateAddresses() {
  revalidatePath("/", "layout");
  revalidatePath("/checkout");
  revalidatePath("/addresses");
}

//  Get addresses
export async function getAddressesAction() {
  try {
    const res = await apiRequest("/addresses", {
      method: "GET",
    });

    const data = await res.json();

    const addresses = data?.addresses ?? data;

    return Array.isArray(addresses) ? addresses : [];
  } catch (error) {
    console.error("Failed to fetch addresses:", error);
    return [];
  }
}

//  Add address
export async function addAddressAction(data: any) {
  try {
    await apiRequest("/addresses", {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    revalidateAddresses();

    return { success: true };
  } catch (error) {
    console.error("Add address failed:", error);
    throw error;
  }
}

//  Update address
export async function updateAddressAction(id: string, data: any) {
  try {
    await apiRequest(`/addresses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    revalidateAddresses();

    return { success: true };
  } catch (error) {
    console.error("Update address failed:", error);
    throw error;
  }
}

//  Delete address
export async function deleteAddressAction(id: string) {
  try {
    await apiRequest(`/addresses/${id}`, {
      method: "DELETE",
    });

    revalidateAddresses();

    return { success: true };
  } catch (error) {
    console.error("Delete address failed:", error);
    throw error;
  }
}
