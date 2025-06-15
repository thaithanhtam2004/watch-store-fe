import { useState, useEffect } from 'react';
import { getAllDongHo } from '../services/donghoService';

export function useDongHoList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("⏳ Đang gọi API getAllDongHo...");

    getAllDongHo()
      .then(res => {
        console.log("✅ Dữ liệu nhận được từ API:", res);
        setData(res);
      })
      .catch(err => {
        console.error("❌ Lỗi khi gọi API getAllDongHo:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log("🔚 Kết thúc gọi API");
      });
  }, []);

  return { data, loading, error };
}
