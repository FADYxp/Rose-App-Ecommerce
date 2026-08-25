import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token?.accesstoken || !token?._id) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const userId = token._id as string;

    const base = (process.env.API ?? "").replace(/\/$/, "");
    const url = base.includes("/api/v1")
      ? `${base}/related/recommendations/${userId}`
      : `${base}/api/v1/related/recommendations/${userId}`;
    const response = await fetch(url,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.accesstoken}`,
        },
      }
    );

    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            (data as { message?: string })?.message ??
            "Failed to fetch recommendations",
          products: [],
        },
        { status: response.status }
      );
    }

    // Normalize: backend may return { data: [] }, { products: [] }, { recommendations: [] }, or array
    const raw = data as Record<string, unknown> | unknown[];
    const products = Array.isArray(raw)
      ? raw
      : Array.isArray((raw as Record<string, unknown>)?.products)
        ? (raw as { products: unknown[] }).products
        : Array.isArray((raw as Record<string, unknown>)?.data)
          ? (raw as { data: unknown[] }).data
          : Array.isArray((raw as Record<string, unknown>)?.recommendations)
            ? (raw as { recommendations: unknown[] }).recommendations
            : [];

    return NextResponse.json({ products });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
