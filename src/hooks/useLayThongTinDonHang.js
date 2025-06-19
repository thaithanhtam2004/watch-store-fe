// src/hooks/useLayThongTinDonHangById.js
import { useEffect, useState } from "react";
import { getDonHangById } from "../services/donhangService"; // điều chỉnh nếu sai

const useLayThongTinDonHangById = (madonhang) => {
  const [donHang, setDonHang] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!madonhang) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getDonHangById(madonhang);
        setDonHang(res);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi lấy đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [madonhang]);

  return { donHang, loading, error };
};

export default useLayThongTinDonHangById;
