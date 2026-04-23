export function useApiFetch(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
) {
  const config = useRuntimeConfig();

  return useFetch(url, {
    baseURL: config.public.apiBase,
    method,
    headers: {
      "x-api-key": config.public.apiKey,
    },
  });
}
