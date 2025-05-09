import API from "@/config/endPointUrl";

export const getCategorys = async () => {
  const response = await fetch(API.categorys.url, {
    headers: {
      "Content-Type": "application/json",
    },
    cache: "force-cache",
  });
  const data = await response.json();
  return data;
};
