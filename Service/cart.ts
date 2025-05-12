import API from "@/config/endPointUrl";
import { CartResponce } from "@/types/Cart";
import { fetchFn } from "@/utils/fetch";

// Get wishlist items
export const getCart = async (token?: string): Promise<CartResponce> => {
  return fetchFn({
    endpoint: API.cart.url,
    method: "GET",
    token,
  });
};

// Add item to wishlist
export const addCart = async (token: string | undefined, id: string) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: API.cart.url,
    method: "POST",
    body: { productId: id }, // Adjust this based on your API requirements
    token,
  });
};

// Remove item from wishlist
export const removeCart = async (token: string | undefined, id: string) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: `${API.cart.url}/${id}`, // Assuming delete endpoint requires ID in path
    method: "DELETE",
    token,
  });
};
