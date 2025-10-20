import { useState, useEffect, useCallback, useRef } from "react";

// Custom hook để handle API calls
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lưu trữ apiFunction trong ref để tránh re-render
  const apiFunctionRef = useRef(apiFunction);
  apiFunctionRef.current = apiFunction;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunctionRef.current();
      if (result.status === "error") {
        throw new Error(result.message || "Something went wrong");
      }
      setData(result.data);
    } catch (err) {
      setError(
        err.message || err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array since we use ref

  // Memoize dependencies array
  const deps = useRef(dependencies);
  deps.current = dependencies;

  useEffect(() => {
    fetchData();
  }, [fetchData, ...(Array.isArray(dependencies) ? dependencies : [])]);

  return { data, loading, error, refetch: fetchData };
};

// Custom hook cho async operations (POST, PUT, DELETE)
export const useAsyncApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiFunction) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiFunction();
      if (result.status === "error") {
        throw new Error(result.message || "Something went wrong");
      }
      return result.data;
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || err.message || "Something went wrong";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
};
