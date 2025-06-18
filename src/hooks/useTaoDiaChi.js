import { useState } from "react";
import { createDiaChi } from "../services/diaChiNguoiDungApi"; // Đảm bảo đường dẫn đúng

export function useCreateDiaChiNguoiDung() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  // Hàm gọi tạo địa chỉ
  const createNewDiaChi = async (diaChiData) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await createDiaChi(diaChiData);
      setResult(res);
      return res;
    } catch (err) {
      setError(err.message || "Lỗi khi tạo địa chỉ");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createNewDiaChi,
    loading,
    error,
    result,
  };
}
