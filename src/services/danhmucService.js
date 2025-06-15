import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/danhmucs'; // Đường dẫn tương ứng với router danh mục

// Lấy tất cả danh mục
export const getAllDanhMuc = async () => {
  const response = await axios.get(API_BASE);
  return response.data.data; // Giả sử backend trả về { data: [...] }
};

// Lấy danh mục theo ID
export const getDanhMucById = async (madanhmuc) => {
  const response = await axios.get(`${API_BASE}/${madanhmuc}`);
  return response.data;
};

// Tạo danh mục mới
export const createDanhMuc = async (danhMucData) => {
  const response = await axios.post(API_BASE, danhMucData, { withCredentials: true });
  return response.data;
};

// Cập nhật danh mục
export const updateDanhMuc = async (madanhmuc, danhMucData) => {
  const response = await axios.put(`${API_BASE}/${madanhmuc}`, danhMucData, { withCredentials: true });
  return response.data;
};

// Xóa danh mục
export const deleteDanhMuc = async (madanhmuc) => {
  const response = await axios.delete(`${API_BASE}/${madanhmuc}`, { withCredentials: true });
  return response.data;
};
