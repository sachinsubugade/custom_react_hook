import { useState, useCallback } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (resuestConfig, applyData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(resuestConfig.url, {
        method: resuestConfig.method ? resuestConfig.method : "GET",
        headers: resuestConfig.headers ? resuestConfig.headers : {},
        body: resuestConfig.body ? JSON.stringify(resuestConfig.body) : null,
      });
      // console.log("response", response);

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }, []);
  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;
