// src/hooks/useDeleteDanhMuc.js
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
      setSuccessMessage(res.message || "Xoá thành công");
    } catch (err) {
      setError(err.message || "Xoá thất bại");
    } finally {
      setLoading(false);
    }
  };

  return { deleteDanhMucById, loading, error, successMessage };
}
