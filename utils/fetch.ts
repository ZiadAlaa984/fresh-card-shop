import API from "@/config/endPointUrl";

interface FetchOptions {
  endpoint: string;
  params?: Record<string, string | number>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  cache?: RequestCache;
}

export const fetchFn = async <T>({
  endpoint,
  params,
  method = "GET",
  body,
  cache = "force-cache",
}: FetchOptions): Promise<T> => {
  // Build URL with parameters
  let url = endpoint;
  if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      searchParams.append(key, String(value));
    });
    url += `?${searchParams.toString()}`;
  }

  // Prepare request options
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    cache,
  };

  // Add body if present
  if (body) {
    options.body = JSON.stringify(body);
  }

  // Make the request
  const response = await fetch(url, options);

  // Handle errors
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Parse and return the response
  const data = await response.json();
  return data;
};
