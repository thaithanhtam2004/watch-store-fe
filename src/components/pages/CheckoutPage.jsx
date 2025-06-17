import React, { useEffect, useState } from "react";
import { Header, Footer } from "../layouts/main.layout";
import { useGioHang } from "../../hooks/useGioHang";
import { getGiaBanSanPham } from "../../services/sanphamService";

const CURRENT_USER_ID = "tk001";

const CheckoutPage = () => {
  const { gioHang, loading, error } = useGioHang(CURRENT_USER_ID);
  const [giaSanPhamMap, setGiaSanPhamMap] = useState({});

  const [form, setForm] = useState({
    hoten: "",
    diachi: "",
    sodienthoai: "",
    email: "",
    phuongthuc: "chuyenkhoan",
    xa: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const formatVND = (amount) =>
    amount?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Lỗi fetch địa chỉ:", err));
  }, []);

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
          console.error("Lỗi khi lấy giá:", item.masanpham, e);
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

  const handleDatHang = () => {
    const errors = {};

    if (!form.hoten.trim()) errors.hoten = "Họ tên không được để trống";
    if (!form.diachi.trim()) errors.diachi = "Địa chỉ không được để trống";
    if (!form.sodienthoai.trim()) {
      errors.sodienthoai = "Số điện thoại không được để trống";
    } else {
      const phoneRegex = /^(0|\+84)[0-9]{9}$/;
      if (!phoneRegex.test(form.sodienthoai)) {
        errors.sodienthoai = "Số điện thoại không hợp lệ";
      }
    }
    if (!selectedProvince) errors.province = "Chọn tỉnh/thành phố";
    if (!selectedDistrict) errors.district = "Chọn quận/huyện";
    if (!form.xa.trim()) errors.xa = "Xã/phường không được để trống";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      alert("Vui lòng điền đầy đủ và đúng thông tin!");
      return;
    }

    // Gộp địa chỉ
    const fullAddress = `${form.diachi}, ${form.xa}, ${selectedDistrict.name}, ${selectedProvince.name}`;
    alert(
      `Đặt hàng thành công!\nTổng tiền: ${formatVND(
        tongTien
      )}\nĐịa chỉ: ${fullAddress}`
    );
    console.log("Thông tin đặt hàng:", {
      ...form,
      diachi: fullAddress,
    });
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-20 py-10">
        {/* THÔNG TIN THANH TOÁN */}
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
            placeholder="Địa chỉ (số nhà, tên đường...)"
            value={form.diachi}
            onChange={(e) => setForm({ ...form, diachi: e.target.value })}
          />

          {/* Chọn Tỉnh/Thành */}
          <select
            className="w-full border p-2 mb-3"
            value={selectedProvince?.code || ""}
            onChange={(e) => {
              const code = +e.target.value;
              const found = provinces.find((p) => p.code === code);
              setSelectedProvince(found);
              setSelectedDistrict(null);
              setForm({ ...form, xa: "" });
            }}
          >
            <option value="">Chọn Tỉnh/Thành phố</option>
            {provinces.map((p) => (
              <option key={p.code} value={p.code}>
                {p.name}
              </option>
            ))}
          </select>

          {/* Chọn Quận/Huyện */}
          <select
            className="w-full border p-2 mb-3"
            value={selectedDistrict?.code || ""}
            onChange={(e) => {
              const code = +e.target.value;
              const found = selectedProvince?.districts.find(
                (d) => d.code === code
              );
              setSelectedDistrict(found);
              setForm({ ...form, xa: "" });
            }}
            disabled={!selectedProvince}
          >
            <option value="">Chọn Quận/Huyện</option>
            {selectedProvince?.districts.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Chọn Xã/Phường */}
          <select
            className="w-full border p-2 mb-3"
            value={form.xa}
            onChange={(e) => setForm({ ...form, xa: e.target.value })}
            disabled={!selectedDistrict}
          >
            <option value="">Chọn Xã/Phường</option>
            {selectedDistrict?.wards.map((w) => (
              <option key={w.code} value={w.name}>
                {w.name}
              </option>
            ))}
          </select>

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

        {/* ĐƠN HÀNG CỦA BẠN */}
        <div>
          <h3 className="text-xl font-bold mb-4">ĐƠN HÀNG CỦA BẠN</h3>
          <div className="border p-4 rounded-lg">
            {loading && <p>Đang tải đơn hàng...</p>}
            {error && <p className="text-red-500">Lỗi: {error.message}</p>}
            {!loading &&
              gioHang.map((item) => {
                const info = giaSanPhamMap[item.masanpham] || {
                  giaban: 0,
                  tensanpham: "...",
                };
                return (
                  <div
                    key={item.magiohang}
                    className="flex justify-between mb-2"
                  >
                    <span>
                      {info.tensanpham} × {item.soluong}
                    </span>
                    <span>{formatVND(info.giaban * item.soluong)}</span>
                  </div>
                );
              })}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Tổng</span>
              <span>{formatVND(tongTien)}</span>
            </div>
            <button
              onClick={handleDatHang}
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
