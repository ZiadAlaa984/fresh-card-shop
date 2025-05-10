import API from "@/config/endPointUrl";
import { Product, ProductFilter, ProductResponse } from "@/types/Products";
import { fetchFn } from "@/utils/fetch";

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  filter: ProductFilter | undefined = undefined
): Promise<ProductResponse> => {
  return fetchFn({
    endpoint: API.Products.url,
    params: {
      limit,
      page,
      ...filter,
    },
  });
};

export const getProductById = async (id: string) => {
  const data = await fetchFn<ProductResponse>({
    endpoint: `${API.Products.url}/${id}`,
  });
  return data?.data;
};
