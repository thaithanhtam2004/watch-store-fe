import { useState, useEffect } from "react";
import { deleteDanhMuc } from "../services/danhmucService";

export function useDeleteDanhMuc() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const deleteDanhMucById = async (id) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const res = await deleteDanhMuc(id);
      setSuccessMessage(res.message || "✅ Xoá thành công");
    } catch (err) {
      const apiMsg = err.response?.data?.message;

      if (apiMsg?.toLowerCase().includes("danh mục đang được sử dụng")) {
        setError("❌ Không thể xoá: Danh mục đang được sử dụng trong bảng Đồng hồ.");
      } else {
        setError(apiMsg || "❌ Xoá thất bại, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Tự động ẩn thông báo sau 4 giây
  useEffect(() => {
    if (error || successMessage) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccessMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, successMessage]);

  return { deleteDanhMucById, loading, error, successMessage };
}
