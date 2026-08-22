import { useEffect, useState } from "react";

type UseFetchProps = {
  url?: string;
  method?: string;
  body?: Record<string, unknown>;
  token?: string;
};
type UseFetchOptions = {
  enabled?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
};

export default function useFetch(
  { url = "", method = "GET", body, token }: UseFetchProps,
  { enabled = true, onSuccess, onError }: UseFetchOptions = {},
) {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (enabled) {
      setIsLoading(true);

      fetch(`${process.env.NEXT_PUBLIC_API_BACKEND}${url}`, {
        method,

        headers: {
          "Content-Type": "application/json",

          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },

        // credentials: "include",

        ...(body && {
          body: JSON.stringify(body),
        }),
      })
        .then(async (res) => {
          const result = await res.json();
          setResults(result);
          if (res.ok) {
            onSuccess?.(result);
          } else {
            onError?.(result);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [url, method, token, body, enabled]);

  return {
    results,
    isLoading,
  };
}
