import { loginValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

async function normalLogin(values: loginValues) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API}/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error?.message || "Invalid credentials");
  }

  const data = await res.json();

  // Session only (no remember me)
  sessionStorage.setItem("token", data.token);

  return data;
}

export default function useLogin() {
  return useMutation({
    mutationFn: async (values: loginValues) => {
      if (values.rememberMe) {
        // next-auth
        const payload = await signIn("credentials", {
          ...values,
          redirect: false,
        });

        if (payload?.error) {
          throw new Error(payload.error);
        }

        return payload;
      }

      // normal login
      return normalLogin(values);
    },
  });
}
