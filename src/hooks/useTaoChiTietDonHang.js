// hooks/useTaoChiTietDonHang.js
import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:3000/api/chitiets";

export const useTaoChiTietDonHang = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const taoChiTietDonHangTuLocal = async (madonhang) => {
    setLoading(true);
    setError(null);

    try {
      const gioHangData = JSON.parse(localStorage.getItem("tao_don_hang_data"));
      if (!gioHangData || !gioHangData.items || gioHangData.items.length === 0) {
        throw new Error("Không tìm thấy dữ liệu giỏ hàng trong localStorage.");
      }

      // Duyệt qua từng sản phẩm và gửi request tạo chi tiết đơn hàng
      const promises = gioHangData.items.map((item) =>
        axios.post(`${API_BASE}/create`, {
          madonhang,
          masanpham: item.masanpham,
          soluong: item.soluong,
          giaban: item.giaban, // đảm bảo đã lưu giaban trong localStorage trước đó
        }, { withCredentials: true })
      );

      await Promise.all(promises); // Chờ tất cả chi tiết tạo xong
    } catch (err) {
      console.error("Lỗi tạo chi tiết đơn hàng:", err);
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { taoChiTietDonHangTuLocal, loading, error };
};
