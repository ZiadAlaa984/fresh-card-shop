// types/order.ts

import { Product } from "./Products";

export interface CartItem {
  _id: string;
  product: Product;
  count: number;
  price: number;
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  // Add other user fields if needed
}

export interface Order {
  _id: string;
  id: number;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
  __v: number;
}
