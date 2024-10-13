import { useState, useEffect } from "react";

function useFetch<T>(initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/cities");
        const data = await res.json();
        if (data) {
          setValue(data);
        }
      } catch (e) {
        alert("error fetching cities");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  return { value, isLoading };
}
export default useFetch;
