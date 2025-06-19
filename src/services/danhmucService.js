import axios from "axios";

const API_BASE = "http://localhost:3000/api/danhmucs";

// ✅ Lấy tất cả danh mục
export const getAllDanhMuc = async () => {
  const response = await axios.get(API_BASE);
  return response.data.data; // Giữ nguyên nếu BE trả về { success, data }
};

// ✅ Lấy danh mục theo ID
export const getDanhMucById = async (madanhmuc) => {
  const response = await axios.get(`${API_BASE}/getId/${madanhmuc}`);
  return response.data.data;
};

// ✅ Tạo danh mục mới
export const createDanhMuc = async (danhMucData) => {
  const response = await axios.post(`${API_BASE}/create`, danhMucData, {
    withCredentials: true,
  });
  return response.data;
};

// ✅ Cập nhật danh mục
export const updateDanhMuc = async (madanhmuc, danhMucData) => {
  const response = await axios.put(
    `${API_BASE}/update/${madanhmuc}`,
    danhMucData,
    {
      withCredentials: true,
    }
  );
  return response.data;
};

// ✅ Xóa danh mục
export const deleteDanhMuc = async (madanhmuc) => {
  const response = await axios.delete(`${API_BASE}/delete/${madanhmuc}`, {
    withCredentials: true,
  });
  return response.data;
};
