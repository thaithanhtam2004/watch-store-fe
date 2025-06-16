import { useState, useEffect } from 'react';
import { getAllPhuongThuc } from '../services/phuongthucService'; // đường dẫn có thể thay đổi

export function usePhuongThucList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('⏳ Đang gọi API getAllPhuongThuc...');
    getAllPhuongThuc()
      .then(res => {
        console.log('✅ Dữ liệu nhận được từ API:', res);
        setData(res);
      })
      .catch(err => {
        console.error('❌ Lỗi khi gọi API getAllPhuongThuc:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log('🔚 Kết thúc gọi API PhuongThucThanhToan');
      });
  }, []);

  return { data, loading, error };
}
