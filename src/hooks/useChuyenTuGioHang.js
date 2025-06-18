// hooks/useChuyenTuGioHang.js
import { useState } from "react";
import { chuyenTuGioHangSangChiTiet } from "../services/chitiietdonhangService";

export function useChuyenTuGioHang() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const chuyen = async ({ mataikhoan, madonhang, selectedItems }) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const result = await chuyenTuGioHangSangChiTiet({ mataikhoan, madonhang, selectedItems });
      setSuccessMessage(result.message || "Chuyển thành công");
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Đã có lỗi xảy ra");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { chuyen, loading, error, successMessage };
}
