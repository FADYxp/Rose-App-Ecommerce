"use client";

import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "next-intl";
import { verifyOtpAction } from "@/lib/actions/auth.actions";

export default function useVerifyOtp() {
  //   translations
  const t = useTranslations("verify");
  const { toast } = useToast();

  // mutation
  const { isPending, mutate, error } = useMutation({
    mutationFn: async () => {
      const payload = await verifyOtpAction();
      return payload;
    },

    // on success
    onSuccess: () => {
      toast({
        title: "Success",
        description: t("success-toast"),
        variant: "success",
      });
    },

    // on error
    onError: () => {
      toast({
        title: "Error",
        description: t("error-toast"),
        variant: "destructive",
      });
    },
  });

  return { isPending, error, verifyOtp: mutate };
}
