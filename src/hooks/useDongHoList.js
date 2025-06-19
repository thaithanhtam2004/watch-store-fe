import { useState, useEffect } from 'react';
import { getAllDongHo } from '../services/donghoService'; // ✅ Đảm bảo đường dẫn đúng

export function useDongHoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Hàm gọi lại API
  const fetchDongHo = async () => {
    setLoading(true);
    try {
      const res = await getAllDongHo(); // Hàm này nên trả về mảng đồng hồ
      setData(res);
      setError(null);
    } catch (err) {
      console.error("❌ Lỗi khi gọi API getAllDongHo:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDongHo();
  }, []);

  return {
    data,
    loading,
    error,
    refetch: fetchDongHo, // ✅ Trả ra hàm để gọi lại trong component
  };
}
