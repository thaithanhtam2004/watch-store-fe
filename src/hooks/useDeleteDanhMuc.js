import { useState } from "react";
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

      // Xử lý nếu BE trả thông báo lỗi do ràng buộc khoá ngoại
      if (apiMsg?.toLowerCase().includes("foreign key")) {
        setError(
          "❌ Không thể xoá: Danh mục đang được sử dụng trong bảng Đồng hồ."
        );
      } else {
        setError(apiMsg || "❌ Xoá thất bại, vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { deleteDanhMucById, loading, error, successMessage };
}
