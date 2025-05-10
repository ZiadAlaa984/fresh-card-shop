import API from "@/config/endPointUrl";
import { fetchFn } from "@/utils/fetch";

export const getCategorys = async () => {
  return fetchFn({
    endpoint: API.categorys.url,
  });
};
