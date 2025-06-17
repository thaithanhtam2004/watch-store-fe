import React, { useEffect, useState } from "react";
import { Header, Footer } from "../layouts/main.layout";
import { useGioHang } from "../../hooks/useGioHang";
import { getGiaBanSanPham } from "../../services/sanphamService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";

const CartPage = () => {
  const { user } = useAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  // Khi user được load (cả null hoặc object), tắt checkingAuth
  useEffect(() => {
    if (user !== undefined) {
      setCheckingAuth(false);
    }
  }, [user]);

  // Lấy id user, nếu chưa có thì truyền null
  const CURRENT_USER_ID = user?.id || null;

  // Gọi hook useGioHang ngay đầu component, truyền id user (có thể là null)
  // Bên trong hook phải xử lý trường hợp null tránh gọi API
  const { gioHang = [], loading, error } = useGioHang(CURRENT_USER_ID);

  const [giaSanPhamMap, setGiaSanPhamMap] = useState({});

  // Hàm format tiền VND
  const formatVND = (amount) =>
    amount?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  // Lấy giá bán cho từng sản phẩm trong giỏ hàng
  useEffect(() => {
    const fetchAllGiaBan = async () => {
      try {
        const results = await Promise.all(
          gioHang.map((item) => getGiaBanSanPham(item.masanpham))
        );

        const map = {};
        results.forEach((res, index) => {
          const giaban = parseFloat(res.giaban);
          const masanpham = gioHang[index].masanpham;
          map[masanpham] = {
            giaban: isNaN(giaban) ? 0 : giaban,
            tensanpham: res.tensanpham || "Không rõ tên",
          };
        });

        setGiaSanPhamMap(map);
      } catch (e) {
        console.error("Lỗi lấy giá sản phẩm:", e);
        setGiaSanPhamMap({}); // Reset nếu lỗi
      }
    };

    if (gioHang.length > 0) {
      fetchAllGiaBan();
    } else {
      setGiaSanPhamMap({});
    }
  }, [gioHang]);

  // Tính tổng tiền giỏ hàng
  const tongTien = gioHang.reduce((sum, item) => {
    const info = giaSanPhamMap[item.masanpham] || { giaban: 0 };
    return sum + info.giaban * item.soluong;
  }, 0);

  if (checkingAuth) return <p>Đang tải thông tin người dùng...</p>;
  if (!user) return <p>Vui lòng đăng nhập</p>;

  return (
    <div className="font-sans text-sm">
      <Header />

      <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
        {/* Giỏ hàng bên trái */}
        <div className="w-full md:w-2/3">
          <section>
            <h2 className="text-lg font-semibold mb-4">Giỏ hàng của bạn</h2>

            {loading && <p>Đang tải dữ liệu...</p>}
            {error && <p className="text-red-500">Lỗi: {error.message}</p>}

            {!loading && gioHang.length === 0 && (
              <p>Không có sản phẩm trong giỏ hàng.</p>
            )}

            {!loading && gioHang.length > 0 && (
              <table className="w-full border border-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-4 py-2">Tên sản phẩm</th>
                    <th className="border px-4 py-2">Số lượng</th>
                    <th className="border px-4 py-2">Giá</th>
                    <th className="border px-4 py-2">Tổng</th>
                  </tr>
                </thead>
                <tbody>
                  {gioHang.map((sp) => {
                    const info = giaSanPhamMap[sp.masanpham] || {
                      giaban: 0,
                      tensanpham: "...",
                    };
                    return (
                      <tr key={sp.magiohang}>
                        <td className="border px-4 py-2">{info.tensanpham}</td>
                        <td className="border px-4 py-2">{sp.soluong}</td>
                        <td className="border px-4 py-2">{formatVND(info.giaban)}</td>
                        <td className="border px-4 py-2">
                          {formatVND(info.giaban * sp.soluong)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </section>
        </div>

        {/* Thanh toán bên phải */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">
              Tổng cộng:{" "}
              <span className="text-red-500">{formatVND(tongTien)}</span>
            </h2>
            <div className="mb-4">
              <label htmlFor="promo-code" className="block mb-1 text-sm">
                Mã ưu tiên:
              </label>
              <input
                type="text"
                id="promo-code"
                className="w-full border px-3 py-2 rounded"
                placeholder="Nhập mã ưu tiên"
              />
            </div>
            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CartPage;
