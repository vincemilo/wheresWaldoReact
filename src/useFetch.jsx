import { useEffect, useState } from "react";

export default function useFetch(url, options = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          ...options,
          mode: "cors",
          headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(
            `${response.status} ${response.statusText}: ${
              errorData?.message || "Request failed"
            }`
          );
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url, JSON.stringify(options)]);

  return { data, error, loading };
}
