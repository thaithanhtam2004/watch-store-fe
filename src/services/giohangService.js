import axios from "axios";

const API_BASE = "http://localhost:3000/api/giohangs"; // Điều chỉnh theo router của bạn

// ➕ Thêm sản phẩm vào giỏ hàng
export const themVaoGioHang = async ({ mataikhoan, masanpham, soluong }) => {
  const response = await axios.post(
    `${API_BASE}/add`,
    { mataikhoan, masanpham, soluong },
    { withCredentials: true }
  );
  return response.data;
};

// 📋 Lấy toàn bộ sản phẩm trong giỏ hàng của một tài khoản
export const getGioHangByTaiKhoan = async (mataikhoan) => {
  const response = await axios.get(`${API_BASE}/user/${mataikhoan}`, {
    withCredentials: true,
  });
  return response.data.data; // Dữ liệu nằm trong `data`
};

export const capNhatSoLuong = async ({ magiohang, soluong }) => {
  const response = await axios.put(
    `${API_BASE}/update/${magiohang}`,
    { soluong },
    { withCredentials: true }
  );
  return response.data;
};

export const xoaKhoiGioHang = async (magiohang) => {
  const response = await axios.delete(`${API_BASE}/delete/${magiohang}`, {
    withCredentials: true,
  });
  return response.data;
};
