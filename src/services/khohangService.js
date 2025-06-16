import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/khohang'; // Giả định đường dẫn là /api/khohangs

// Lấy tất cả bản ghi kho hàng
export const getAllKhoHang = async () => {
  const response = await axios.get(API_BASE);
  return response.data.data; // giả định: { success: true, data: [...] }
};

// Lấy thông tin 1 kho hàng theo mã
export const getKhoHangById = async (makhohang) => {
  const response = await axios.get(`${API_BASE}/${makhohang}`);
  return response.data.data;
};

// Tạo mới 1 bản ghi kho hàng
export const createKhoHang = async (khoHangData) => {
  const response = await axios.post(API_BASE, khoHangData, { withCredentials: true });
  return response.data;
};

// Cập nhật kho hàng
export const updateKhoHang = async (makhohang, khoHangData) => {
  const response = await axios.put(`${API_BASE}/${makhohang}`, khoHangData, { withCredentials: true });
  return response.data;
};

// Xoá kho hàng
export const deleteKhoHang = async (makhohang) => {
  const response = await axios.delete(`${API_BASE}/${makhohang}`, { withCredentials: true });
  return response.data;
};

// Lấy tất cả các lần nhập của một đồng hồ cụ thể
export const getKhoHangByDongHo = async (madongho) => {
  const response = await axios.get(`${API_BASE}/dongho/${madongho}`);
  return response.data.data;
};
