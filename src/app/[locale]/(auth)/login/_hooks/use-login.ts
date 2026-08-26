import { loginValues } from "@/lib/schemas/auth.schema";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";

export default function useLogin() {
  return useMutation({
    mutationFn: async (values: loginValues) => {
      const payload = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (payload?.error) {
        throw new Error(payload.error);
      }

      return payload;
    },
  });
}
