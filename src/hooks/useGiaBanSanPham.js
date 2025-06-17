// hooks/useGiaBanSanPham.js
import { useEffect, useState } from "react";
import { getGiaBanSanPham } from "../services/sanphamService";

export const useGiaBanSanPham = (masanpham) => {
  const [giaban, setGiaBan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!masanpham) return;

    const fetchGiaBan = async () => {
      try {
        setLoading(true);
        const price = await getGiaBanSanPham(masanpham);
        setGiaBan(price);
      } catch (err) {
        setError(err.message || "Lỗi khi lấy giá bán");
      } finally {
        setLoading(false);
      }
    };

    fetchGiaBan();
  }, [masanpham]);

  return { giaban, loading, error };
};
