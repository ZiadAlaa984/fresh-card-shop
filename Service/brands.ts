import API from "@/config/endPointUrl";

export const getBrands = async () => {
  const response = await fetch(API.brands.url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
};
