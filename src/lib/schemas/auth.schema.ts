// auth.schema.ts
import z from "zod";
import { Translations } from "../types/global";

export const RegistrationSchema = (t: Translations) =>
  z
    .object({
      firstName: z
        .string()
        .nonempty({ message: t("validation.firstName.required") })
        .regex(/^[a-zA-Z]+$/, t("validation.firstName.pattern"))
        .min(3, t("validation.firstName.min"))
        .max(15, t("validation.firstName.max")),

      lastName: z
        .string()
        .nonempty({ message: t("validation.lastName.required") })
        .regex(/^[a-zA-Z]+$/, t("validation.lastName.pattern"))
        .min(3, t("validation.lastName.min"))
        .max(15, t("validation.lastName.max")),

      email: z.string().email(t("validation.email.invalid")),

      phone: z
        .string()
        .regex(/^\+201[0125][0-9]{8}$/, t("validation.phone.pattern"))
        .length(13, t("validation.phone.length")),

      gender: z.enum(["male", "female"] as const, {
        error: t("validation.gender.required"),
      }),

      password: z
        .string()
        .nonempty({ message: t("validation.password.required") })
        .min(8, t("validation.password.min"))
        .regex(/[0-9]/, t("validation.password.number"))
        .regex(/[a-z]/, t("validation.password.lowercase"))
        .regex(/[A-Z]/, t("validation.password.uppercase"))
        .regex(/[#!?@$%^&*-]/, t("validation.password.special")),

      rePassword: z
        .string()
        .nonempty({ message: t("validation.rePassword.required") }),
    })
    .refine((data) => data.password === data.rePassword, {
      path: ["rePassword"],
      message: t("validation.rePassword.mismatch"),
    });

export type RegistrationSchemaType = z.infer<
  ReturnType<typeof RegistrationSchema>
>;

//Login schema
export const loginSchema = (t: Translations) =>
  z.object({
    email: z
      .string()
      .email(t("schema.invalid-email"))
      .nonempty(t("schema.email-required")),
    password: z.string().nonempty(t("schema.password-required")),
    rememberMe: z.boolean().optional(),
  });

export type loginValues = z.infer<ReturnType<typeof loginSchema>>;

// forgot-password schema
export const ForgotPasswordSchema = (t: Translations) =>
  z.object({
    email: z
      .email({
        error: (iss) =>
          iss.code === "invalid_type"
            ? `${t("non-email-error")}`
            : `${t("email-not-valid")}`,
      })
      .nonempty(`${t("required-email")}`),
  });

// new-password schema
export const NewPasswordSchema = (t: Translations) =>
  z
    .object({
      newPassword: z
        .string()
        .nonempty(t("password-is-required"))
        .min(8, t("password-at-least-8-characters"))
        .regex(/[A-Z]/, t("password-contain-uppercase-letter"))
        .regex(/[a-z]/, t("password-contain-lowercase-letter"))
        .regex(/[0-9]/, t("password-contain--one-number"))
        .regex(
          /[@$!%*?&]/,
          "Password must contain at least one special character"
        ),
      rePassword: z
        .string()
        .nonempty(t("password-is-required"))
        .min(8, t("password-at-least-8-characters"))
        .optional(),
    })
    .refine((values) => values.newPassword === values.rePassword, {
      message: t("passwords-do-not-match"),
      path: ["rePassword"],
    });

// OTP Schema
export const otpSchema = z.object({
  otp: z.string(),
});

export type OtpFormValues = z.infer<typeof otpSchema>;