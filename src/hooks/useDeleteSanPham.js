import { useState } from "react";
import { deleteSanPham } from "../services/sanphamService";

export const useDeleteSanPham = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onDelete = async (masanpham) => {
    setLoading(true);
    setError(null);
    try {
      const result = await deleteSanPham(masanpham);
      return result; // có thể trả về true/false từ backend
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Lỗi không xác định");
      throw err; // cho phép component gọi catch
    } finally {
      setLoading(false);
    }
  };

  return { onDelete, loading, error };
};
