import { useMutation } from "@tanstack/react-query";
import { registerAction } from "../_actions/register.action";
import { useRouter } from "next/navigation";

export function useRegister() {
  const router = useRouter();
  const { isPending, error, mutate } = useMutation({
    mutationFn: async (values: any) => {
      const response = await registerAction({ values });

      if (response?.error) {
        throw new Error(response?.error || "Sign up failed");
      }

      router.push("/login");

      return response;
    },
  });

  return { isPending, error, signup: mutate };
}
