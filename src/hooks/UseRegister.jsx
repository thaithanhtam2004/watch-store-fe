import { useState } from 'react';
import axios from 'axios';

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const register = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/users/register',
        { email, password },
        { withCredentials: true }
      );
      setUser(response.data);
    } catch (err) {
      // Lấy message lỗi từ response hoặc message mặc định
      const message = err.response?.data?.message || err.message || 'Đăng ký thất bại';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error, user };
}
