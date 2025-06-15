// hooks/useRegister.js
import { useState } from 'react';
import { registerRequest } from '../services/authenService'; // đường dẫn có thể điều chỉnh theo project của bạn

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const userData = await registerRequest(email, password);
      setUser(userData);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || 'Đăng ký thất bại';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, user };
}
