import { useState, useEffect } from "react";

function useFetch<T>(initialValue: T, url: string) {
  console.log(url);
  const [data, setData] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(url);
        const data = await res.json();
        if (data) {
          setData(data);
        }
      } catch (e) {
        console.error(e);
        setError(e as string);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, [url]);
  return { data, error, setData, isLoading, setIsLoading };
}
export default useFetch;
