import { CategoriesResponse } from "@/lib/types/category";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.toString();

    const res = await fetch(
      `https://flower.elevateegy.com/api/v1/categories?${query}`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) {
      return NextResponse.json(
        { message: "Failed to fetch categories" },
        { status: res.status }
      );
    }

    const data: CategoriesResponse = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
