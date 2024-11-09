import { useState } from "react";

export default function usePost<T>(url: string, data: T) {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function postData() {
    try {
      setIsLoading(true);
      setResponse(null);
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      setResponse(json);
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  }

  return { response, error, isLoading, postData };
}
