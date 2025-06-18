import axios from "axios";

const API_BASE = "http://localhost:3000/api/diachinguoidungs";

// Lấy tất cả địa chỉ theo tài khoản
export const getDiaChiByTaiKhoan = async (mataikhoan) => {
  const response = await axios.get(`${API_BASE}/taikhoan/${mataikhoan}`);
  return response.data.data; // giả định backend trả { success: true, data: [...] }
};

// Lấy địa chỉ theo mã địa chỉ
export const getDiaChiById = async (madiachi) => {
  const response = await axios.get(`${API_BASE}/getId/${madiachi}`);
  return response.data.data;
};

// Tạo địa chỉ mới (không mặc định)
export const createDiaChi = async (diaChiData) => {
  const response = await axios.post(`${API_BASE}/create`, diaChiData, {
    withCredentials: true,
  });
  return response.data;
};

// Tạo địa chỉ mới và gán làm mặc định
export const createDiaChiMacDinh = async (diaChiData) => {
  const response = await axios.post(`${API_BASE}/create-mac-dinh`, diaChiData, {
    withCredentials: true,
  });
  return response.data;
};

// Cập nhật địa chỉ
export const updateDiaChi = async (madiachi, diaChiData) => {
  const response = await axios.put(`${API_BASE}/update/${madiachi}`, diaChiData, {
    withCredentials: true,
  });
  return response.data;
};

// Xóa địa chỉ theo mã
export const deleteDiaChi = async (madiachi) => {
  const response = await axios.delete(`${API_BASE}/delete/${madiachi}`, {
    withCredentials: true,
  });
  return response.data;
};

// Lấy địa chỉ mặc định theo mã tài khoản
export const getDiaChiMacDinh = async (mataikhoan) => {
  const response = await axios.get(`${API_BASE}/mac-dinh/${mataikhoan}`);
  return response.data.data;
};
