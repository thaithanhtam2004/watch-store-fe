import { useState, useEffect } from 'react';
import { getAllKhoHang } from '../services/khohangService'; // Đảm bảo đường dẫn đúng

export function useKhoHangList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("⏳ Đang gọi API getAllKhoHang...");

    getAllKhoHang()
      .then(res => {
        console.log("✅ Dữ liệu kho hàng nhận được từ API:", res);
        setData(res);
      })
      .catch(err => {
        console.error("❌ Lỗi khi gọi API getAllKhoHang:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log("🔚 Kết thúc gọi API kho hàng");
      });
  }, []);

  return { data, loading, error };
}
