import { useToast } from "@/hooks/use-toast";
import { useRouter } from "@/i18n/navigation";
import { newPasswordAction } from "@/lib/actions/auth.actions";
import { NewPasswordField } from "@/lib/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useNewPassword() {
  //Navigations
  const router = useRouter();

  // Toaser
  const { toast } = useToast();

  //Queries
  const queryClient = useQueryClient();

  //Mutations
  const { isPending, error, mutate } = useMutation({
    mutationKey: ["new-password"],
    mutationFn: async (fields: NewPasswordField) => {
      const email = queryClient.getQueryData<string>(["forgot-password-email"]);
      if (!email) throw new Error("Email not found");
      const payload = await newPasswordAction({ email, fields });

      if ("error" in payload) {
        if (typeof payload.error === "string") {
          throw new Error(payload.error);
        } else {
          throw new Error("Unknown error occurred");
        }
      }

      return payload;
    },
    onSuccess: () => {
      toast({
        title: "Password Reset Successful",
        description: "You can now log in with your new password.",
      });
      router.push("/login");
    },
  });

  return { isPending, error, resetPassword: mutate };
}
