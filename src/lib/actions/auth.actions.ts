"use server";

import {
  ForgotPasswordField,
  ForgotPasswordResponse,
  NewPasswordField,
  NewPasswordResponse,
} from "../types/auth";

// Forgot Password Action

export async function forgotPasswordAction(fields: ForgotPasswordField) {
  const response = await fetch(`${process.env.API}//auth/forgotPassword`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fields),
  });

  const payload: ForgotPasswordResponse = await response.json();
  return payload;
}

// New Password Action

type NewPasswordActionParams = {
  email: string;
  fields: NewPasswordField;
};

export async function newPasswordAction({
  email,
  fields,
}: NewPasswordActionParams) {
  const response = await fetch(`${process.env.API}/auth/resetPassword`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      newPassword: fields.newPassword,
    }),
  });

  const payload: NewPasswordResponse = await response.json();
  console.log(payload);

  return payload;
}

//Verify OTP Action
export async function verifyOtpAction() {
  //simulating static payload for testing verify otp api
  //incase code dosn't work please change the code value below
  const staticPayload = {
    resetCode: "313539",
  };

  const apiUrl = process.env.API || "https://flower.elevateegy.com/api/v1";

  const response = await fetch(`${apiUrl}/auth/verifyResetCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(staticPayload),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  const payload = await response.json();

  return payload;
}
