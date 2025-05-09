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
