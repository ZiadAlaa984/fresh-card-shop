import { Product } from "./Products";

export interface ApiResponse {
  message: string;
  status: string;
  data: string[];
}
export interface withlistResponce{
  count: number;
  data: Product[];
  status:string
}