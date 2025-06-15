// hooks/useLogin.js
import { useState } from "react";
import { loginRequest } from "../services/authenService"; // đường dẫn tùy thuộc cấu trúc thư mục của bạn

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await loginRequest(email, password);
      setUser(userData);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Đăng nhập thất bại";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error, user };
}
