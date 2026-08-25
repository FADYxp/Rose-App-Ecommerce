"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NewPasswordField } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NewPasswordSchema } from "@/lib/schemas/auth.schema";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import useNewPassword from "../_hooks/use-new-password";

export default function NewPasswordStep() {
  // Translations
  const t = useTranslations();

  // Mutations
  const { isPending, error, resetPassword } = useNewPassword();
  //Form
  const form = useForm<NewPasswordField>({
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
    resolver: zodResolver(NewPasswordSchema(t)),
  });

  // Functions
  const onSubmit: SubmitHandler<NewPasswordField> = (values) => {
    resetPassword(values);
  };
  return (
    <div className="w-[25.5rem] dark:text-zinc-50 text-zinc-800">
      {/* Heading */}
      <h2 className="text-2xl font-semibold">
        {t("create-new-password-label")}
      </h2>
      <p className="mb-4 font-medium text-base">
        {t("create-new-password-text")}
      </p>

      {/* Form  */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="border-y border-y-zinc-200 dark:border-y-zinc-600 pt-6 pb-9 space-y-7"
        >
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password-label")}</FormLabel>
                <FormControl>
                  <Input placeholder={"************"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("confirm-password-label")}</FormLabel>
                <FormControl>
                  <Input placeholder={"************"} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <p className="text-red-600 text-sm mt-2">{error.message}</p>
          )}
          <Button
            isLoading={isPending}
            disabled={!form.formState.isValid && form.formState.isSubmitting}
            type="submit"
            className="w-full "
          >
            {t("reset-password-btn")}
          </Button>
        </form>

        <p className="text-center mt-5 font-medium">
          {t.rich("need-help", {
            a: (chunk) => (
              <Link
                href="/register"
                className="text-maroon-700 font-bold dark:text-softPink-200"
              >
                {chunk}
              </Link>
            ),
          })}
        </p>
      </FormProvider>
    </div>
  );
}
