import z from "zod";
import {
  ChangePasswordBackendSchema,
  ChangePasswordSchema,
  UpdateProfileSchema,
} from "../schemas/account.schema";

export type UserResponse = {
  message: string;
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    gender: "male" | "female";
    phone: string;
    photo: string;
    role: "user" | "admin";
    wishlist: Product[];
    addresses: string[];
    createdAt: string;
  };
};

export type UpdateProfileField = z.infer<
  ReturnType<typeof UpdateProfileSchema>
>;

export type DeleteAccount = {
  message: string;
};

export type ChangePasswordField = z.infer<
  ReturnType<typeof ChangePasswordSchema>
>;

export type ChangePasswordPayload = z.infer<
  ReturnType<typeof ChangePasswordBackendSchema>
>;

export type ChangePasswordResponse = {
  message: string;
  token: string;
};

export type Photo = string;

export type UploadPhotoResponse = {
  message: string;
};
