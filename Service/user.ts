import { formSchema } from "@/app/(pages)/profile/scheme";
import API from "@/config/endPointUrl";
import { TokenVerificationResponse } from "@/types/auth";
import { userInfo, UserResponse } from "@/types/user";
import { fetchFn } from "@/utils/fetch";
import { z } from "zod";

export const getUserData = async (
  token: string | undefined,
  userId: string
): Promise<UserResponse> => {
  return fetchFn({
    endpoint: `${API.user.url}/${userId}`,
    method: "GET",
    token,
  });
};
export const updateMe = async (
  token: string | undefined,
  body: z.infer<typeof formSchema>
): Promise<userInfo> => {
  return fetchFn({
    endpoint: `${API.user.update}`,
    method: "PUT",
    token,
    body,
  });
};
export const verifyToken = async (
  token: string | undefined
): Promise<TokenVerificationResponse> => {
  return fetchFn({
    endpoint: API.auth.verifyToken,
    token,
  });
};
