"use server";

import {
  ChangePasswordPayload,
  ChangePasswordResponse,
  DeleteAccount,
  UpdateProfileField,
  UploadPhotoResponse,
  UserResponse,
} from "../types/account";
import { getToken } from "../utils/manage-token";

// Update Profile Action
export async function updateProfileAction(field: UpdateProfileField) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/auth/editProfile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(field),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const user: UserResponse = await res.json();
  return user;
}

// Delete Account Action
export async function deleteAccountAction() {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/auth/deleteMe`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const message: DeleteAccount = await res.json();
  return message;
}

// Change Password Action
export async function changePasswordAction(field: ChangePasswordPayload) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/auth/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },

    body: JSON.stringify(field),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const message: ChangePasswordResponse = await res.json();
  return message;
}

// Upload Photo
export async function uploadPhotoAction(formData: FormData) {
  const tokenObj = await getToken();
  const token = tokenObj?.accesstoken;

  const res = await fetch(`${process.env.API}/auth/upload-photo`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  const message: UploadPhotoResponse = await res.json();
  return message;
}
