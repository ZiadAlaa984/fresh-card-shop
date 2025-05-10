import API from "@/config/endPointUrl";
import { fetchFn } from "@/utils/fetch";

// Get wishlist items
export const getWithlist = async (token?: string) => {
  return fetchFn({
    endpoint: API.wishlist.url,
    method: "GET",
    token,
  });
};

// Add item to wishlist
export const addWithlist = async (token: string | undefined, id: string) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: API.wishlist.url,
    method: "POST",
    body: { productId: id }, // Adjust this based on your API requirements
    token,
  });
};

// Remove item from wishlist
export const removeWithlist = async (token: string | undefined, id: string) => {
  if (!token) {
    throw new Error("Authentication required");
  }

  return fetchFn({
    endpoint: `${API.wishlist.url}/${id}`, // Assuming delete endpoint requires ID in path
    method: "DELETE",
    token,
  });
};
