import React, { useEffect, useState } from "react";
import { Header, Footer } from "../layouts/main.layout";
import { useGioHang } from "../../hooks/useGioHang";
import { getGiaBanSanPham } from "../../services/sanphamService";
import { useNavigate } from "react-router-dom";

const CURRENT_USER_ID = "tk001";

const CartPage = () => {
  const { gioHang, loading, error } = useGioHang(CURRENT_USER_ID);
  const [giaSanPhamMap, setGiaSanPhamMap] = useState({});
  const navigate = useNavigate(); // ✅ Khai báo navigate

  const formatVND = (amount) =>
    amount?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    const fetchAllGiaBan = async () => {
      const map = {};
      for (const item of gioHang) {
        try {
          const res = await getGiaBanSanPham(item.masanpham);
          const giaban = parseFloat(res.giaban);
          map[item.masanpham] = {
            giaban: isNaN(giaban) ? 0 : giaban,
            tensanpham: res.tensanpham || "Không rõ tên",
          };
        } catch (e) {
          console.error("Lỗi lấy giá cho mã:", item.masanpham, e);
          map[item.masanpham] = { giaban: 0, tensanpham: "Lỗi tên" };
        }
      }
      setGiaSanPhamMap(map);
    };

    if (gioHang.length > 0) {
      fetchAllGiaBan();
    }
  }, [gioHang]);

  const tongTien = gioHang.reduce((sum, item) => {
    const info = giaSanPhamMap[item.masanpham] || { giaban: 0 };
    return sum + info.giaban * item.soluong;
  }, 0);

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
                        <td className="border px-4 py-2">
                          {formatVND(info.giaban)}
                        </td>
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
              onClick={() => navigate("/checkout")} // ✅ Điều hướng đến CheckoutPage
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
