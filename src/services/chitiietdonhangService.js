import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/chitiets'; // điều chỉnh nếu cần

// 🆕 Tạo chi tiết đơn hàng mới
export const createChiTietDonHang = async ({ madonhang, masanpham, soluong, giaban }) => {
  const response = await axios.post(`${API_BASE}/create`, {
    madonhang, masanpham, soluong, giaban
  }, { withCredentials: true });
  return response.data;
};

// 📋 Lấy tất cả chi tiết đơn hàng
export const getAllChiTietDonHang = async () => {
  const response = await axios.get(`${API_BASE}`, { withCredentials: true });
  return response.data.duLieu; // giả định server trả về { duLieu: [...] }
};

// 🔍 Lấy chi tiết đơn hàng theo mã chi tiết
export const getChiTietDonHangById = async (id) => {
  const response = await axios.get(`${API_BASE}/getId/${id}`, { withCredentials: true });
  return response.data.duLieu;
};

// 📦 Lấy danh sách chi tiết theo mã đơn hàng
export const getChiTietByDonHangId = async (madonhang) => {
  const response = await axios.get(`${API_BASE}/donhang/${madonhang}`, { withCredentials: true });
  return response.data.duLieu;
};

// ✏️ Cập nhật chi tiết đơn hàng
export const updateChiTietDonHang = async (id, data) => {
  const response = await axios.put(`${API_BASE}/update/${id}`, data, { withCredentials: true });
  return response.data;
};

// ❌ Xóa chi tiết đơn hàng
export const deleteChiTietDonHang = async (id) => {
  const response = await axios.delete(`${API_BASE}/delete/${id}`, { withCredentials: true });
  return response.data;
};
