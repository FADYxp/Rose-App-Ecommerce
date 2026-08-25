import { User } from "./user";

export type ApiSuccessResponse = {
  message: "success";
  user: User;
  token: string;
};

export type ApiErrorResponse = {
  error: string;
};

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;
