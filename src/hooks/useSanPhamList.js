import { useState, useEffect } from 'react';
import { getAllSanPham } from '../services/sanphamService';

export function useSanPhamList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Hàm gọi lại API khi cần
  const fetchSanPham = async () => {
    setLoading(true);
    try {
      const res = await getAllSanPham();
      setData(res);
      setError(null);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API getAllSanPham:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSanPham();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchSanPham, // ✅ Trả ra để dùng trong component
  };
}
