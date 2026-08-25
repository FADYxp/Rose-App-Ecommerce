import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const token = await getToken({ req: request });

    if (!token || !token?.accesstoken) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${process.env.API}/orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token.accesstoken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch {
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
}
