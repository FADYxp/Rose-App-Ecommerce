
import { getMyToken } from '@/lib/utils/get-my-token';
import { NextResponse } from 'next/server';

export async function GET() {
    const token = await getMyToken();
    const accessToken = token?.accesstoken;
  try {
    const res = await fetch(`https://flower.elevateegy.com/api/v1/statistics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
              },
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch statistics from external API" },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Statistics API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}