import { useState, useEffect } from "react";
import { getDiaChiByTaiKhoan } from "../services/diaChiNguoiDungApi"; // đảm bảo đường dẫn đúng

export function useAllDiaChiNguoiDung(mataikhoan) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mataikhoan) return;

    setLoading(true);
    setError(null);

    getDiaChiByTaiKhoan(mataikhoan)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err.message || "Lỗi khi lấy địa chỉ");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [mataikhoan]);

  return { data, loading, error };
}
