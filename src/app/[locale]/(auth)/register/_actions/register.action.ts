"use server";

import { RegistrationSchemaType } from "@/lib/schemas/auth.schema";

export async function registerAction({
  values,
}: {
  values: RegistrationSchemaType;
}) {
  const response: Response = await fetch(`${process.env.API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const payload = await response.json();

  return payload;
}
