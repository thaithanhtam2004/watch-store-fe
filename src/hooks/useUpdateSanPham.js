import { useState } from "react";
import { updateSanPham } from "../services/sanphamService";

export const useUpdateSanPham = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const onUpdate = async (masanpham, updatedData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const result = await updateSanPham(masanpham, updatedData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi cập nhật sản phẩm");
      console.error("❌ Update failed:", err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    onUpdate,
    loading,
    error,
    success,
  };
};
