import React, { useEffect, useState } from "react";
import axios from "axios";
import { Header, Footer } from "../layouts/main.layout";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [form, setForm] = useState({
    hoten: "",
    diachi: "",
    sodienthoai: "",
    email: "",
    phuongthuc: "chuyenkhoan",
  });

  const mataikhoan = "user123"; // sau này thay bằng thông tin đăng nhập thật

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/giohang/${mataikhoan}`)
      .then((res) => setCartItems(res.data.data))
      .catch(console.error);
  }, []);

  const tongTien = cartItems.reduce(
    (total, item) => total + item.giaban * item.soluong,
    0
  );

  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:3000/api/checkout", {
        mataikhoan,
        madiachi: "mac-dinh-1", // ví dụ
        maphuongthuc: form.phuongthuc,
        giohang: cartItems,
        tongtien: tongTien,
      });
      alert("Đặt hàng thành công!");
    } catch (err) {
      alert("Đặt hàng thất bại!");
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-20 py-10">
        {/* Thông tin thanh toán */}
        <div>
          <h3 className="text-xl font-bold mb-4">THÔNG TIN THANH TOÁN</h3>
          <input
            className="w-full border p-2 mb-3"
            placeholder="Họ tên"
            value={form.hoten}
            onChange={(e) => setForm({ ...form, hoten: e.target.value })}
          />
          <input
            className="w-full border p-2 mb-3"
            placeholder="Địa chỉ"
            value={form.diachi}
            onChange={(e) => setForm({ ...form, diachi: e.target.value })}
          />
          <input
            className="w-full border p-2 mb-3"
            placeholder="Số điện thoại"
            value={form.sodienthoai}
            onChange={(e) => setForm({ ...form, sodienthoai: e.target.value })}
          />
          <input
            className="w-full border p-2 mb-3"
            placeholder="Email (tùy chọn)"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <h4 className="font-semibold mt-4 mb-2">Phương thức thanh toán</h4>
          <label className="block mb-2">
            <input
              type="radio"
              name="payment"
              value="chuyenkhoan"
              checked={form.phuongthuc === "chuyenkhoan"}
              onChange={(e) => setForm({ ...form, phuongthuc: e.target.value })}
            />
            <span className="ml-2">Chuyển khoản ngân hàng</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={form.phuongthuc === "cod"}
              onChange={(e) => setForm({ ...form, phuongthuc: e.target.value })}
            />
            <span className="ml-2">Trả tiền mặt khi nhận hàng</span>
          </label>
        </div>

        {/* Đơn hàng của bạn */}
        <div>
          <h3 className="text-xl font-bold mb-4">ĐƠN HÀNG CỦA BẠN</h3>
          <div className="border p-4 rounded-lg">
            {cartItems.map((item) => (
              <div key={item.masanpham} className="flex justify-between mb-2">
                <span>
                  {item.tensanpham} × {item.soluong}
                </span>
                <span>{(item.giaban * item.soluong).toLocaleString()} ₫</span>
              </div>
            ))}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Tổng</span>
              <span>{tongTien.toLocaleString()} ₫</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded mt-4"
            >
              ĐẶT HÀNG
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
