import { useEffect, useState } from "react";
import { getSanPhamDetail } from "../services/sanphamService"; // đúng path

export const useSanPhamDetail = (masanpham) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!masanpham) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getSanPhamDetail(masanpham);
        setData(result); // tùy vào structure trả về
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [masanpham]);

  return { data, loading, error };
};
