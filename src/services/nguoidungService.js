import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/nguoidungs'; // Điều chỉnh nếu cần

// 🔐 Đăng nhập
export const dangNhap = async ({ email, matkhau }) => {
  const response = await axios.post(`${API_BASE}/login`, { email, matkhau }, { withCredentials: true });
  return response.data;
};

// 🆕 Đăng ký / Tạo người dùng mới
export const dangKy = async (nguoiDungData) => {
  const response = await axios.post(`${API_BASE}/register`, nguoiDungData, { withCredentials: true });
  return response.data;
};

// 📋 Lấy tất cả người dùng
export const getAllNguoiDung = async () => {
  const response = await axios.get(`${API_BASE}`, { withCredentials: true });
  return response.data.duLieu; // giả định { thanhcong: true, duLieu: [...] }
};

// 🔍 Lấy người dùng theo ID
export const getNguoiDungById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`, { withCredentials: true });
  return response.data.duLieu;
};

// ✏️ Cập nhật người dùng
export const updateNguoiDung = async (id, nguoiDungData) => {
  const response = await axios.put(`${API_BASE}/${id}`, nguoiDungData, { withCredentials: true });
  return response.data;
};

// 🔑 Đổi mật khẩu
export const doiMatKhau = async ({ mataikhoan, matkhauCu, matkhauMoi }) => {
  const response = await axios.put(`${API_BASE}/change-password`, { mataikhoan, matkhauCu, matkhauMoi }, { withCredentials: true });
  return response.data;
};

// ❌ Xoá người dùng
export const deleteNguoiDung = async (id) => {
  const response = await axios.delete(`${API_BASE}/${id}`, { withCredentials: true });
  return response.data;
};
