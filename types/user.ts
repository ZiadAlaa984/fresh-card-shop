export interface UserInfo {
  _id: string;
  role: string;
  active: boolean;
  wishlist: string[];
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: any[]; // Replace `any` with a specific type if you know the structure of an address
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface UserResponse {
  data: UserInfo;
}
export interface userInfo {
  name: string;
  email: string;
  phone: string;
}
