import API from "@/config/endPointUrl";
import { CategoryResponse } from "@/types/categorys";
import { fetchFn } from "@/utils/fetch";

export const getCategorys = async (): Promise<CategoryResponse> => {
  return fetchFn({
    endpoint: API.categorys.url,
  });
};
