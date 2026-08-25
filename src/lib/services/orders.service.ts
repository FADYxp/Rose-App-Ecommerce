import { getToken } from "../utils/manage-token";

export async function getOrders() {
  try {
    const token = await getToken();
    const accessToken = token?.accesstoken;
    console.log(accessToken);
    console.log(process.env.API);

    if (!accessToken) {
      throw new Error("Unauthorized");
    }

    const response = await fetch(`${process.env.API}/orders`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error?.error || "Something went wrong");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
}
