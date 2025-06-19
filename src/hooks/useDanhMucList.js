import { useState, useEffect, useCallback } from "react";
import { getAllDanhMuc } from "../services/danhmucService";

export function useDanhMucList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDanhMuc = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAllDanhMuc();
      setData(res);
    } catch (err) {
      setError(err.message || "Lỗi khi tải danh mục");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDanhMuc();
  }, [fetchDanhMuc]);

  return {
    data,
    loading,
    error,
    refetch: fetchDanhMuc,
  };
}
