"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { loginSchema, loginValues } from "@/lib/schemas/auth.schema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import useLogin from "../_hooks/use-login";
import { Loader } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { getFriendlyErrorMessage } from "@/lib/utils/auth";
import { Link } from "@/i18n/navigation";

export default function LoginForm() {
  const t = useTranslations("login");
  const locale = useLocale();

  // translation
  const tKey = (key: string) => {
    if (locale === "ar") {
      const map: Record<string, string> = {
        rememberMe: "remember-me",
        loginBtn: "login-btn",
        forgotPassword: "forgot-password",
        emailPlaceholder: "email-placeholder",
        passwordPlaceholder: "password-placeholder",
      };
      return t(map[key] || key);
    }
    return t(key);
  };

  const form = useForm<loginValues>({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    resolver: zodResolver(loginSchema(t)),
    mode: "onChange",
  });

  const { isPending, mutate: login, isError, error } = useLogin();
  const router = useRouter();

  const errorMessage = getFriendlyErrorMessage(error?.message || "", t);

  const onsubmit: SubmitHandler<loginValues> = async (values) => {
    login(values, {
      onSuccess: () => {
        router.replace("/");
          router.refresh();
      },
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-[25rem]"
        onSubmit={form.handleSubmit(onsubmit)}
      >
        {/* Fields */}
        <div className="flex flex-col gap-4">
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("email")}</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder={tKey("emailPlaceholder")}
                    error={!!form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage className="text-[0.9rem]" />
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("password")}</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder={tKey("passwordPlaceholder")}
                    error={!!form.formState.errors.password}
                  />
                </FormControl>
                <FormMessage className="text-[0.9rem]" />
              </FormItem>
            )}
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-maroon-700 font-medium mt-2"
            >
              {tKey("forgotPassword")}
            </Link>
          </div>
        </div>

        {/* Error */}
        {isError && (
          <p className="text-center text-red-600 mt-3">{errorMessage}</p>
        )}

        {/* Remember Me */}
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <Label className="flex items-center gap-2 cursor-pointer my-5 mb-8">
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="border-maroon-700 data-[state=checked]:bg-maroon-600"
              />
              <span className="text-zinc-700">{tKey("rememberMe")}</span>
            </Label>
          )}
        />

        {/* Submit */}
        <Button disabled={isPending} type="submit">
          {isPending ? (
            <Loader className="animate-spin mr-2" size={16} />
          ) : (
            tKey("loginBtn")
          )}
        </Button>
      </form>
    </Form>
  );
}
