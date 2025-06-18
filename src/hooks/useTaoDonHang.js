import { useState } from "react";
import axios from "axios";

const API_BASE = 'http://localhost:3000/api/donhangs';

export function useTaoDonHang() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const taoDonHang = async (donHangData) => {
    setLoading(true);
    setError(null);
    setSuccessData(null);

    console.log("🔄 Dữ liệu gửi đi:", donHangData);

    try {
      const response = await axios.post(`${API_BASE}/create`, donHangData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      });

      console.log("✅ Phản hồi từ server:", response.data);
      setSuccessData(response.data);
      return response.data;

    } catch (err) {
      console.error("❌ Lỗi tạo đơn hàng:", err);

      if (err.response) {
        // Server phản hồi lỗi (status khác 2xx)
        console.error("💬 Response data:", err.response.data);
        console.error("📦 Response status:", err.response.status);
        setError(err.response.data);
      } else if (err.request) {
        // Không nhận được phản hồi
        console.error("🚫 Không nhận được phản hồi từ server:", err.request);
        setError({ message: "Không thể kết nối server" });
      } else {
        // Lỗi khác
        console.error("⚠️ Lỗi khác:", err.message);
        setError({ message: err.message });
      }

      throw err; // vẫn throw để component ngoài biết
    } finally {
      setLoading(false);
    }
  };

  return {
    taoDonHang,
    loading,
    error,
    successData,
  };
}
