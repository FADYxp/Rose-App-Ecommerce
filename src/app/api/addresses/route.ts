import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });

    if (!token || !token?.accesstoken) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${process.env.API}/addresses`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accesstoken}`,
      },
      cache: "no-store",
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
