import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/donhangs'; // Đảm bảo đúng route trong backend

// 🆕 Tạo đơn hàng mới
export const taoDonHang = async (donHangData) => {
  const response = await axios.post(`${API_BASE}/create`, donHangData, {
    withCredentials: true,
  });
  return response.data;
};

// 📋 Lấy tất cả đơn hàng (có thể truyền filter qua query)
export const getTatCaDonHang = async (filters = {}) => {
  const response = await axios.get(`${API_BASE}`, {
    params: filters,
    withCredentials: true,
  });
  return response.data.data; // giả định { success: true, data: [...] }
};

// 📋 Lấy tất cả đơn hàng không có filter
export const getDonHangNoFilter = async () => {
  const response = await axios.get(`${API_BASE}/nofilter`, {
    withCredentials: true,
  });
  return response.data.data;
};

// 🔍 Lấy đơn hàng theo ID
export const getDonHangById = async (id) => {
  const response = await axios.get(`${API_BASE}/getId/${id}`, {
    withCredentials: true,
  });
  return response.data.data;
};

// ✏️ Cập nhật trạng thái đơn hàng
export const capNhatTrangThaiDonHang = async (id, trangthai) => {
  const response = await axios.put(
    `${API_BASE}/updateStatus/${id}`,
    { trangthai },
    { withCredentials: true }
  );
  return response.data;
};

// ❌ Xóa đơn hàng
export const xoaDonHang = async (id) => {
  const response = await axios.delete(`${API_BASE}/delete/${id}`, {
    withCredentials: true,
  });
  return response.data;
};
