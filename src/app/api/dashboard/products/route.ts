import { NextRequest, NextResponse } from "next/server";
import { getMyToken } from "@/lib/utils/get-my-token";
import { GetProductsResponse } from "@/lib/types/dashboard/product.d";

export async function GET(req: NextRequest): Promise<NextResponse> {
  // Auth
  const token = await getMyToken();
  if (!token?.accesstoken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Forward query params
  const { searchParams } = req.nextUrl;
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "12";
  const search = searchParams.get("search") ?? "";

  // Fetch products
  const url = new URL(`${process.env.API}/products`);
  url.searchParams.set("page", page);
  url.searchParams.set("limit", limit);
  if (search) url.searchParams.set("search", search);

  const res = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token.accesstoken}` },
    cache: "no-store",
  });

  // Handle errors
  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: res.status }
    );
  }

  const data: GetProductsResponse = await res.json();
  return NextResponse.json(data);
}
