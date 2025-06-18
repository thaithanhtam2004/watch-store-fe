import React, { useEffect, useState } from "react";
import { Header, Footer } from "../layouts/main.layout";
import { useGioHang } from "../../hooks/useGioHang";
import { getGiaBanSanPham } from "../../services/sanphamService";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import { xoaKhoiGioHang } from "../../services/giohangService";
const CartPage = () => {
  const { user } = useAuth();
  const CURRENT_USER_ID = user?.id;
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  const { gioHang = [], loading, error, refetch } = useGioHang(CURRENT_USER_ID);
  const [giaSanPhamMap, setGiaSanPhamMap] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  const formatVND = (amount) =>
    amount?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    if (user !== undefined) setCheckingAuth(false);
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("reload_cart") === "true") {
      localStorage.removeItem("reload_cart");
      refetch();
    }
  }, []);

  useEffect(() => {
    const fetchAllGiaBan = async () => {
      try {
        const results = await Promise.all(
          gioHang.map((item) => getGiaBanSanPham(item.masanpham))
        );
        const map = {};
        results.forEach((res, index) => {
          const masp = gioHang[index].masanpham;
          map[masp] = {
            giaban: parseFloat(res.giaban) || 0,
            tensanpham: res.tensanpham || "Không rõ tên",
          };
        });
        setGiaSanPhamMap(map);
      } catch (e) {
        console.error("Lỗi lấy giá:", e);
      }
    };
    if (gioHang.length > 0) fetchAllGiaBan();
  }, [gioHang]);

  const handleCheckboxChange = (magiohang) => {
    setSelectedItems((prev) =>
      prev.includes(magiohang)
        ? prev.filter((id) => id !== magiohang)
        : [...prev, magiohang]
    );
  };

  const items = gioHang
    .filter((sp) => selectedItems.includes(sp.magiohang))
    .map((sp) => ({
      masanpham: sp.masanpham,
      soluong: sp.soluong,
    }));

  const tongTien = items.reduce((sum, item) => {
    const giaban = giaSanPhamMap[item.masanpham]?.giaban || 0;
    return sum + giaban * item.soluong;
  }, 0);

  const handleTaoDonHang = () => {
    if (items.length === 0) return alert("Chưa chọn sản phẩm nào.");
    const donHangData = {
      mataikhoan: CURRENT_USER_ID,
      items,
      tongtien: tongTien,
    };
    localStorage.setItem("tao_don_hang_data", JSON.stringify(donHangData));
    navigate("/xac-nhan-don-hang");
  };

  const handleXoa = async (magiohang) => {
    if (!window.confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;
    try {
      await xoaKhoiGioHang(magiohang);
      refetch();
    } catch (e) {
      alert("Xoá thất bại!");
      console.error(e);
    }
  };

  if (checkingAuth) return <p>Đang kiểm tra người dùng...</p>;
  if (!user) return <p>Vui lòng đăng nhập</p>;

  return (
    <div className="font-sans text-sm">
      <Header />
      <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
        {/* Giỏ hàng bên trái */}
        <div className="w-full md:w-2/3">
          <h2 className="text-lg font-semibold mb-4">Giỏ hàng</h2>
          {loading && <p>Đang tải...</p>}
          {error && <p className="text-red-500">{error.message}</p>}
          {!loading && gioHang.length === 0 && <p>Giỏ hàng trống.</p>}

          {!loading && gioHang.length > 0 && (
            <table className="w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-2 py-2">Chọn</th>
                  <th className="border px-2 py-2">Sản phẩm</th>
                  <th className="border px-2 py-2">Số lượng</th>
                  <th className="border px-2 py-2">Giá</th>
                  <th className="border px-2 py-2">Tổng</th>
                  <th className="border px-2 py-2">Xoá</th>
                </tr>
              </thead>
              <tbody>
                {gioHang.map((sp) => {
                  const info = giaSanPhamMap[sp.masanpham] || {};
                  return (
                    <tr key={sp.magiohang}>
                      <td className="border px-2 py-2 text-center">
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(sp.magiohang)}
                          onChange={() => handleCheckboxChange(sp.magiohang)}
                        />
                      </td>
                      <td className="border px-2 py-2">{info.tensanpham}</td>
                      <td className="border px-2 py-2">{sp.soluong}</td>
                      <td className="border px-2 py-2">
                        {formatVND(info.giaban)}
                      </td>
                      <td className="border px-2 py-2">
                        {formatVND(info.giaban * sp.soluong)}
                      </td>
                      <td className="border px-2 py-2 text-center">
                        <button
                          onClick={() => handleXoa(sp.magiohang)}
                          className="px-2 py-1 text-sm text-red-600 border border-red-400 rounded hover:bg-red-100 transition duration-200"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Thanh toán bên phải */}
        <div className="w-full md:w-1/3">
          <div className="bg-gray-50 p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">Tổng cộng:</h2>
            <p className="text-red-500 text-lg mb-4">{formatVND(tongTien)}</p>
            <button
              onClick={handleTaoDonHang}
              className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 mb-2"
            >
              Tiếp tục đặt hàng
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
