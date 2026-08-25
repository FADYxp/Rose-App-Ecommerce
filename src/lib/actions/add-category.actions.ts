"use server";

import { getToken } from "@/lib/utils/manage-token";

export async function createCategoryAction(formData: FormData) {
  const token = await getToken();
  const accessToken = token?.accesstoken;
  if (!accessToken) return { success: false, message: "No access token found" };

  try {
    const res = await fetch(`${process.env.API}/categories`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.error || data?.message || "Failed to create category";
      return { success: false, message };
    }

    return {
      success: true,
      message: "Category added successfully",
      document: data.document || data,
    };
  } catch (err: any) {
    console.error(err);
    return { success: false, message: err?.message || "Something went wrong" };
  }
}
