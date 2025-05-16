export interface SignUpData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
}
export interface ResetPasswordData {
  currentPassword: string;
  password: string;
  rePassword: string;
}
export interface LoginData {
  email: string;
  password: string;
}
export interface User {
  id: string;
  name: string;
  email: string;
  // Add other user properties as needed
}

export interface AuthResponse {
  token: string;
  user: User;
}
export interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number; // Issued at (Unix timestamp)
  exp: number; // Expiration time (Unix timestamp)
}

export interface TokenVerificationResponse {
  message: string;
  decoded: DecodedToken;
}
export interface updateInfo {
  message: string;
  token: string;
  user: User;
}
