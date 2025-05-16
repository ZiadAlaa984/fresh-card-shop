import { ShippingAddressFormValues } from "@/app/(pages)/cart/scheme";
import API from "@/config/endPointUrl";
import { Order } from "@/types/orders";
import { fetchFn } from "@/utils/fetch";

//  get orders
export const GetOrders = async (
  token: string | undefined,
  cartId: string
): Promise<Order[]> => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: `${API.user.order}${cartId}`,
    method: "GET",
    token,
  });
};
//  Create Cash Order
export const CreateCashOrder = async (
  token: string | undefined,
  cartId: string,
  shippingAddress: ShippingAddressFormValues
) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: `${API.orders.cash}/${cartId}`,
    method: "POST",
    body: { shippingAddress }, // Adjust this based on your API requirements
    token,
  });
};
//  Create online Order
export const CreateOnlineOrder = async (
  token: string | undefined,
  cartId: string,
  shippingAddress: ShippingAddressFormValues,
  url?: string
) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: `${API.orders.checkout}/${cartId}?url=http://localhost:3000`,
    method: "POST",
    body: { shippingAddress: JSON.stringify(shippingAddress) }, // Adjust this based on your API requirements
    token,
  });
};
