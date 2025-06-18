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
        localStorage.setItem("token", data.token);
        contextLogin(data.token);
        alert("Đăng nhập thành công!");
        return true; // ✅ trả về thành công
      } else {
        setError("Tài khoản hoặc mật khẩu không đúng");
        alert("Đăng nhập thất bại!");
        return false;
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError("Tài khoản hoặc mật khẩu không đúng");
      } else {
        const message =
          err.response?.data?.message || err.message || "Đăng nhập thất bại";
        setError(message);
      }
      return false; // ✅ trả về thất bại
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
}
