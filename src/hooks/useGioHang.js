import { useEffect, useState, useCallback } from "react";
import { getGioHangByTaiKhoan } from "../services/giohangService";

export const useGioHang = (mataikhoan) => {
  const [gioHang, setGioHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGioHang = useCallback(async () => {
    if (!mataikhoan) return;
    try {
      setLoading(true);
      const result = await getGioHangByTaiKhoan(mataikhoan);
      setGioHang(result || []); // fallback nếu null
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [mataikhoan]);

  useEffect(() => {
    fetchGioHang();
  }, [fetchGioHang]);

  return { gioHang, loading, error, refetch: fetchGioHang };
};
