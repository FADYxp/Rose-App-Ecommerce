"use server";

import { getToken } from "@/lib/utils/manage-token";

export async function updateCategoryAction(id: string, name: string) {
  const token = await getToken();
  const accessToken = token?.accesstoken;

  if (!accessToken) {
    return { success: false, message: "No access token found" };
  }

  try {
    const formData = new FormData();
    formData.append("name", name);

    const res = await fetch(`${process.env.API}/categories/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      const message =
        data?.error || data?.message || "Failed to update category";
      return { success: false, message };
    }

    return {
      success: true,
      message: "Category updated successfully",
      document: data.document || data,
    };
  } catch (err: unknown) {
    console.error(err);
    return { success: false, message: err instanceof Error ? err.message : "Something went wrong" };
  }
}
