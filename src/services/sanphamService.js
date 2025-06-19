import axios from "axios";

const API_BASE = "http://localhost:3000/api/sanphams"; // hoặc 'sanphams' tùy backend

export const getAllSanPham = async () => {
  const response = await axios.get(API_BASE);
  return response.data.data; // giả định response trả về { success: true, data: [...] }
};

export const getSanPhamById = async (masanpham) => {
  const response = await axios.get(`${API_BASE}/${masanpham}`);
  return response.data;
};

export const createSanPham = async (sanPhamData) => {
  const response = await axios.post(`${API_BASE}/create`, sanPhamData, {
    withCredentials: true,
  });
  return response.data;
};


export const updateSanPham = async (masanpham, sanPhamData) => {
  const response = await axios.put(`${API_BASE}/update/${masanpham}`, sanPhamData, {
    withCredentials: true,
  });
  return response.data;
};
export const getBestsellerProducts = async () => {
  const response = await axios.get(
    "http://localhost:3000/api/sanphams/bestseller"
  );
  return response.data.data; // đảm bảo backend trả { data: [...] }
};
export const getDongHoNam = async () => {
  const res = await axios.get("http://localhost:3000/api/sanphams/donghonam");
  return Array.isArray(res.data) ? res.data : res.data.data;
};
export const getDongHoNu = async () => {
  const res = await axios.get("http://localhost:3000/api/sanphams/donghonu");
  return Array.isArray(res.data) ? res.data : res.data.data;
};

export const deleteSanPham = async (masanpham) => {
  try {
    const response = await axios.delete(`${API_BASE}/delete/${masanpham}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    // Ghi rõ lỗi nếu cần debug
    console.error("❌ deleteSanPham error:", error.response || error.message);
    throw error; // Để hook hoặc component xử lý tiếp
  }
};


export const getSanPhamDetail = async (masanpham) => {
  const response = await axios.get(`${API_BASE}/${masanpham}/detail`);
  return response.data.data;
};

export const getGiaBanSanPham = async (masanpham) => {
  const response = await axios.get(`${API_BASE}/giaban/${masanpham}`);
  return response.data;
};