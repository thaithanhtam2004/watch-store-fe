import { useState, useEffect } from 'react';
import { getTatCaDonHang } from '../services/donhangService'; // Đảm bảo đúng đường dẫn

export function useDonHangList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("⏳ Đang gọi API getTatCaDonHang...");

    getTatCaDonHang()
      .then(res => {
        console.log("✅ Dữ liệu đơn hàng:", res);
        setData(res);
      })
      .catch(err => {
        console.error("❌ Lỗi khi gọi API getTatCaDonHang:", err);
        setError(err.message || 'Lỗi không xác định');
      })
      .finally(() => {
        setLoading(false);
        console.log("🔚 Kết thúc gọi API đơn hàng");
      });
  }, []);

  return { data, loading, error };
}
