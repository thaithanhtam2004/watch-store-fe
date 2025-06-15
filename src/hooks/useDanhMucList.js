import { useState, useEffect } from 'react';
import { getAllDanhMuc } from '../services/danhmucService';

export function useDanhMucList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("⏳ Đang gọi API getAllDanhMuc...");

    getAllDanhMuc()
      .then(res => {
        console.log("✅ Dữ liệu danh mục nhận được từ API:", res);
        setData(res);
      })
      .catch(err => {
        console.error("❌ Lỗi khi gọi API getAllDanhMuc:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
        console.log("🔚 Kết thúc gọi API danh mục");
      });
  }, []);

  return { data, loading, error };
}
