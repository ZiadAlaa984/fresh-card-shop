interface FetchOptions {
  endpoint: string;
  params?: Record<string, string | number>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  cache?: RequestCache;
  token?: string;
}

export const fetchFn = async <T>({
  endpoint,
  params,
  method = "GET",
  body,
  cache = "force-cache",
  token,
}: FetchOptions): Promise<T> => {
  let url = endpoint;

  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // ✅ Add token as Bearer if present
  if (token) {
    headers["token"] = `${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
    cache,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data;
};
