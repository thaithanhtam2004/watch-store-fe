import { useEffect, useState } from "react";
import { getGioHangByTaiKhoan } from "../services/giohangService"; // Đường dẫn service đúng

export const useGioHang = (mataikhoan) => {
  const [gioHang, setGioHang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mataikhoan) return;

    const fetchGioHang = async () => {
      try {
        setLoading(true);
        const result = await getGioHangByTaiKhoan(mataikhoan);
        setGioHang(result); // tuỳ theo kết quả trả về
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGioHang();
  }, [mataikhoan]);

  return { gioHang, loading, error };
};
