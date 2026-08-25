import { OccasionsResponse } from "../types/occasion";

export async function getOccasions(): Promise<OccasionsResponse> {
  const res = await fetch(`${process.env.API}/occasions`);

  if (!res.ok) throw new Error("Failed to fetch occasions");
  return res.json();
}
