import React from "react";
import ForgotPasswordFlowLayout from "./_components/forgot-password-flow-layout";
import EmailStep from "./_components/email-step";

export default function page() {
  return (
    <div>
      <ForgotPasswordFlowLayout />
      {/* #TODO : waiting footer */}
      {/* <footer>footer</footer> */}
      <EmailStep />
    </div>
  );
}
