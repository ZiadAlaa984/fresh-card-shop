import API from "@/config/endPointUrl";

export const getProducts = async () => {
  const response = await fetch(API.Products.url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
};

export const getProductById = async (id: string) => {
  const response = await fetch(`${API.Products.url}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Product not found");
  }
  const data = await response.json();
  return data?.data;
};
