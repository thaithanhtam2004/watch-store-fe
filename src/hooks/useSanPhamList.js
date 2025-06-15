import { useState, useEffect } from 'react';
import { getAllSanPham } from '../services/sanphamService'; // Đảm bảo đường dẫn đúng

export function useSanPhamList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("⏳ Đang gọi API getAllSanPham...");

    getAllSanPham()
      .then(res => {
        console.log("✅ Dữ liệu nhận được từ API:", res);
        setData(res);
      })
      .catch(err => {
        console.error("❌ Lỗi khi gọi API getAllSanPham:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log("🔚 Kết thúc gọi API");
      });
  }, []);

  return { data, loading, error };
}
