// src/hooks/useProductDetail.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { mockProduct } from '@/mockData'; // Sử dụng mock data

export const useProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Giả lập gọi API
    const fetchProduct = async () => {
      try {
        // Kiểm tra id, hiện tại chỉ dùng mockProduct
        if (id === '1') {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Giả lập delay
          setProduct(mockProduct);
        } else {
          setError('Không tìm thấy sản phẩm');
        }
      } catch (err) {
        setError('Lỗi khi tải sản phẩm');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading, error };
};