// src/hooks/useLayChiTietDonHang.js
import { useEffect, useState } from "react";
import { getChiTietByDonHangId } from "../services/chitiietdonhangService"; // chú ý tên file đúng

const useLayChiTietDonHang = (madonhang) => {
  const [chiTietDonHang, setChiTietDonHang] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!madonhang) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getChiTietByDonHangId(madonhang);
        setChiTietDonHang(res);
      } catch (err) {
        setError(err);
        console.error("Lỗi khi lấy chi tiết đơn hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [madonhang]);

  return { chiTietDonHang, loading, error };
};

export default useLayChiTietDonHang;
