import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: body.email,
      password: body.password,
    }),
  });

  if (!res.ok) {
    const error = await res.json();
    return NextResponse.json(
      { message: error.message || "Login failed" },
      { status: res.status }
    );
  }

  const data = await res.json();

  return NextResponse.json({
    token: data.token,
  });
}
