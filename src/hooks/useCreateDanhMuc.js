// src/hooks/useCreateDanhMuc.js
import { useState } from "react";
import { createDanhMuc } from "../services/danhmucService";

export function useCreateDanhMuc() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const create = async (data) => {
    setLoading(true);
    setError(null);
    setSuccessMessage("");

    try {
      const res = await createDanhMuc(data);
      setSuccessMessage(res.message || "Tạo danh mục thành công");
      return res;
    } catch (err) {
      setError(err.message || "Tạo danh mục thất bại");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { create, loading, error, successMessage };
}
