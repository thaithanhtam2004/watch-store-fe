import { useState, useEffect } from 'react';
import { getAllUuDai } from '../services/uudaiService'; // đường dẫn có thể thay đổi theo cấu trúc dự án

export function useUuDaiList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('⏳ Đang gọi API getAllUuDai...');
    getAllUuDai()
      .then(res => {
        console.log('✅ Dữ liệu nhận được từ API:', res);
        setData(res);
      })
      .catch(err => {
        console.error('❌ Lỗi khi gọi API getAllUuDai:', err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log('🔚 Kết thúc gọi API UuDai');
      });
  }, []);

  return { data, loading, error };
}
