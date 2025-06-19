import { useEffect, useState } from "react";
import { getDiaChiById } from "../services/diaChiNguoiDungApi"; // đổi path nếu khác

export const useDiaChiById = (madiachi) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!madiachi) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const diachi = await getDiaChiById(madiachi);
        setData(diachi);
        setError(null);
      } catch (err) {
        console.error("Lỗi khi lấy địa chỉ:", err);
        setError("Không thể lấy địa chỉ");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [madiachi]);

  return { data, loading, error };
};
