// hooks/useLogin.js
import { useState } from "react";
import { loginRequest } from "../services/authenService";
import { useAuth } from "../utils/AuthContext"; // dùng AuthContext để cập nhật trạng thái đăng nhập

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login: contextLogin } = useAuth(); // lấy hàm login từ context

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const data = await loginRequest(email, password);

      if (data.thanhcong) {
        // Lưu token vào localStorage
        localStorage.setItem("token", data.token);
        // Gọi login của context để decode và setUser
        contextLogin(data.token);
      } else {
        setError("Tài khoản hoặc mật khẩu không đúng");
      }
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Đăng nhập thất bại";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
