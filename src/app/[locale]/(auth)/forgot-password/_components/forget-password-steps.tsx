import React from "react";
import EmailStep from "./email-step";
import VerifyOtp from "./verify-otp";
import NewPasswordStep from "./new-password-step";

export default function ForgotPasswordSteps() {
  return (
    <div className="flex items-center justify-center">
      <EmailStep />
      <VerifyOtp />
      <NewPasswordStep />
    </div>
  );
}
