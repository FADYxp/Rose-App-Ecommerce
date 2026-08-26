"use client";

// NOTE: you will need to import this component in some where

import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPSlot } from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import useVerifyOtp from "../_hooks/use-verify-otp";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpFormValues } from "@/lib/schemas/auth.schema";

// resend timer localStorage key
const RESEND_TIMER_KEY = "resend_otp_expire_at";

// intial resend duration in seconds
const RESEND_DURATION = 60;

export default function VerifyOtp() {
  const t = useTranslations("verify");

  // mutation hook
  const { verifyOtp, isPending, error } = useVerifyOtp();

  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

  // Create translated schema
  const translatedOtpSchema = otpSchema.refine(
    (data) => data.otp.length === 6,
    {
      message: t("otp-validation"),
      path: ["otp"],
    }
  );

  // form
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(translatedOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  // TODO: resend code action
  const handleResendCode = () => {
    const expireAt = Date.now() + RESEND_DURATION * 1000;
    localStorage.setItem(RESEND_TIMER_KEY, expireAt.toString());
    setSecondsLeft(RESEND_DURATION);
  };

  // handle verify otp
  const onSubmit = () => {
    verifyOtp();
  };

  // Initialize timer on mount from localStorage
  useEffect(() => {
    const expireAt = localStorage.getItem(RESEND_TIMER_KEY);
    if (!expireAt) return;

    const diff = Math.ceil((+expireAt - Date.now()) / 1000);
    if (diff > 0) {
      setSecondsLeft(diff);
    } else {
      localStorage.removeItem(RESEND_TIMER_KEY);
    }
  }, []);

  // Handle countdown timer
  useEffect(() => {
    if (!secondsLeft) return;

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (!prev || prev <= 1) {
          localStorage.removeItem(RESEND_TIMER_KEY);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  return (
    <div className="w-[25.3rem] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="border-b border-zinc-200 pb-4 mb-10 dark:border-zinc-600">
            <h2 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
              {t("title")}
            </h2>
            {/* TODO: this link depends on forget email api that will be implemented */}
            <p className="text-zinc-800 dark:text-zinc-50">
              {t("send-to")} user@example.com
              <Link href="#">
                <span className="text-blue-700 font-medium underline ms-1">
                  {t("edit-email")}
                </span>
              </Link>
            </p>
          </div>

          {/* otp input */}
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    value={field.value}
                    onChange={field.onChange}
                  >
                    {Array.from({ length: 6 }).map((_, i) => (
                      <InputOTPSlot key={i} index={i} className="mx-auto" />
                    ))}
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* send new code again */}
          <div className="text-right mt-6 me-8">
            {secondsLeft ? (
              <span className="text-sm font-medium text-zinc-500">
                {t("resend-after")} {secondsLeft}s
              </span>
            ) : (
              <Button
                type="button"
                onClick={handleResendCode}
                variant="ghost"
                className="text-base font-medium text-zinc-800 dark:text-zinc-50"
              >
                {t("send-code")}
              </Button>
            )}
          </div>

          {/* error message */}
          {error && (
            <p className="text-red-500 font-semibold capitalize">
              {error.message}
            </p>
          )}

          {/* Verify otp button  */}
          <div className="py-3 px-4 border-b border-zinc-200 dark:border-zinc-600">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full my-9 bg-maroon-600 text-white font-medium text-base capitalize dark:bg-softPink-300 dark:text-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t("verify-otp")}
            </Button>
          </div>

          <p className="text-sm font-medium text-center mt-5 text-zinc-800 dark:text-zinc-50">
            {t("help")}
            <span className="font-bold text-maroon-700 dark:text-softPink-300">
              {t("contact")}
            </span>
          </p>
        </form>
      </Form>
    </div>
  );
}
