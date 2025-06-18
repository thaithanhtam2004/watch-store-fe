// hooks/useTaoDonHang.js
import { useState } from "react";
import axios from "axios";

export const useTaoDonHang = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const taoDonHang = async ({ mataikhoan, madiachi, tongtien, maphuongthuc, madonvivanchuyen = "dv001" }) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/donhangs/create", {
        mataikhoan, madiachi, tongtien, maphuongthuc, madonvivanchuyen
      }, { withCredentials: true });
      return res.data; // chứa madonhang
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { taoDonHang, loading, error };
};
