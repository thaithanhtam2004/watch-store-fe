import { useState, useEffect } from 'react';
import { getAllNguoiDung } from '../services/nguoidungService'; // Đảm bảo đúng đường dẫn

export function useNguoiDungList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('⏳ Đang gọi API getAllNguoiDung...');

    getAllNguoiDung()
      .then((res) => {
        console.log('✅ Dữ liệu người dùng:', res);
        setData(res);
      })
      .catch((err) => {
        console.error('❌ Lỗi khi gọi API getAllNguoiDung:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log('🔚 Kết thúc gọi API người dùng');
      });
  }, []);

  return { data, loading, error };
}
