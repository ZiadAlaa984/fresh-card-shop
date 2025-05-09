import API from "@/config/endPointUrl";
import { LoginData, SignUpData } from "@/types/auth";

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
