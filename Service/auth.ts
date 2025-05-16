import API from "@/config/endPointUrl";
import {
  LoginData,
  ResetPasswordData,
  SignUpData,
  updateInfo,
} from "@/types/auth";
import { fetchFn } from "@/utils/fetch";

export const SignupReq = async (data: SignUpData) => {
  const response = await fetch(API.auth.signup, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
export const LoginReq = async (data: LoginData) => {
  const response = await fetch(API.auth.login, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return response.json();
};
export const ResetPasswordReq = async (
  token: string | undefined,
  data: ResetPasswordData
): Promise<updateInfo> => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: API.user.resetPassword,
    method: "PUT",
    body: data,
    token,
  });
};
