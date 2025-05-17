import { useCallback } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthResponse } from "@/types/auth";

export const useAuth = () => {
  const router = useRouter();

  const setAuthCookies = useCallback((data: AuthResponse) => {
    // Set token cookie
    Cookies.set("token", data.token, {
      expires: 7, // 7 days
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    // Set user data cookie
    Cookies.set("user", JSON.stringify(data.user), {
      expires: 7,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("user");
    router.replace("/auth/login");
    window.location.reload();
  }, [router]);

  const getToken = useCallback(() => {
    return Cookies.get("token");
  }, []);

  const getUser = useCallback(() => {
    const userStr = Cookies.get("user");  
    return userStr ? JSON.parse(userStr) : null;
  }, []);

  const isAuthenticated = useCallback(() => {
    return !!getToken();
  }, [getToken]);

  return {
    setAuthCookies,
    logout,
    getToken,
    getUser,
    isAuthenticated,
  };
};
