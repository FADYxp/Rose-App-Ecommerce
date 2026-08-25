"use client";
import { useState } from "react";
import { FORGOT_PASSWORD_STEPS } from "@/lib/constants/auth.constant";
import { ForgotPasswordSteps } from "@/lib/types/auth";
import { useTranslations } from "next-intl";
import EmailStep from "./email-step";
import NewPasswordStep from "./new-password-step";
import OtpStep from "./otp-step";

export default function ForgotPasswordFlowLayout() {
  // translations
  const t = useTranslations("forgot-password");

  // states
  const [step, setStep] = useState<ForgotPasswordSteps>(
    FORGOT_PASSWORD_STEPS.OTP
  );
  const [email, setEmail] = useState<string | null>("example@gmail.com");

  // variables
  const steps = {
    [FORGOT_PASSWORD_STEPS.EMAIL]: {
      title: t("step-one-title"),
      subTitle: t("step-one-subtitle"),
      form: <EmailStep />,
    },
    [FORGOT_PASSWORD_STEPS.OTP]: {
      title: t("step-two-title"),
      subTitle: t.rich("step-two-subtitle", {
        email: email ?? "",
        button: (chunk) => (
          <button
            onClick={() => setStep(FORGOT_PASSWORD_STEPS.EMAIL)}
            className="text-blue-700 dark:text-blue-400 font-medium"
          >
            {chunk}
          </button>
        ),
      }),
      form: <OtpStep />,
    },
    [FORGOT_PASSWORD_STEPS.NEW_PASSWORD]: {
      title: t("step-three-title"),
      subTitle: t("step-three-subtitle"),
      form: <NewPasswordStep />,
    },
  } as const;

  return (
    <>
      <h1 className="text-2xl font-semibold text-zinc-800 dark:text-zinc-50">
        {steps[step].title}
      </h1>
      <p className="text-zinc-800 dark:text-zinc-50">{steps[step].subTitle}</p>
      {steps[step].form}
    </>
  );
}
