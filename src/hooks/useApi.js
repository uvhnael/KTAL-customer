import { useState, useEffect, useCallback, useRef } from "react";

export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  }, []);

  useEffect(() => {
    if (!Array.isArray(dependencies)) {
      console.warn("useApi: dependencies should be an array");
      fetchData();
      return;
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies); // Chỉ dùng dependencies, bỏ [fetchData, dependencies]

  return { data, loading, error, refetch: fetchData };
};

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
