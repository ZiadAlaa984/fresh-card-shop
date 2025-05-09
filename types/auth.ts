export interface SignUpData {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
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
