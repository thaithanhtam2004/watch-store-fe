import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Hero Banner
export const HeroBanner = () => (
  <section className="relative text-white py-12 bg-gray-100">
    <img
      src="nen.png"
      alt="Quà tặng cho nàng"
      className="w-full h-90 object-cover"
    />
    <div className="absolute top-1/3 right-41 transform -translate-y-1/2">
      <h2 className="text-3xl mb-2 tracking-wider">QUÀ TẶNG CHO NÀNG</h2>
      <p className="text-lg mb-4 tracking-wide">
        BỘ SƯU TẬP QUÀ TẶNG Ý NGHĨA NHẤT
      </p>
      <Button variant="outline">MUA NGAY</Button>
    </div>
  </section>
);

// Danh mục chính
export const CategoryGrid = () => (
  <div className="grid grid-cols-3 gap-4 px-6 py-8">
    {["DHNữ.png", "DHNam.png", "phukien.png"].map((img, i) => (
      <div key={i} className="relative text-center">
        <img
          src={`/${img}`}
          alt=""
          className="w-full h-80 object-cover" // Đảm bảo ảnh có chiều cao đồng đều
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {" "}
          {/* Dùng flex để căn chữ vào giữa */}
          <h3 className="text-white uppercase text-black font-bold">
            {["Đồng Hồ Nữ", "Đồng Hồ Nam", "Best Seller"][i]}
          </h3>
        </div>
      </div>
    ))}
  </div>
);

// Thanh dịch vụ
export const ServicesBar = () => (
  <div className="flex justify-around py-4 text-lg bg-white border-t">
    <div>🚚 Ship COD toàn quốc</div>
    <div>🛠️ Bảo hành 2 năm</div>
    <div>🔄 Đổi 1 đổi 1 trong 14 ngày</div>
  </div>
);

// Section sản phẩm
export const ProductSection = ({ title, type }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/sanpham?type=${type}`)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, [type]);

  return (
    <section
      className={`px-6 py-10 ${type === "accessories" ? "bg-gray-50" : ""}`}
    >
      <h2 className="text-center text-lg mb-6 tracking-widest">{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((sp) => (
          <div key={sp.masanpham} className="text-center">
            <img
              src={sp.hinhanhchinh}
              alt={sp.tensanpham}
              className="w-full h-48 object-cover mb-2"
            />
            <div className="text-xs text-gray-500">{sp.tensanpham}</div>
            {sp.phantramgiam ? (
              <>
                <p className="line-through text-sm text-gray-400">
                  {sp.giaban.toLocaleString()} đ
                </p>
                <p className="font-bold text-md text-red-500">
                  {(sp.giaban * (1 - sp.phantramgiam / 100)).toLocaleString()} đ
                </p>
              </>
            ) : (
              <p className="font-bold text-md">
                {sp.giaban.toLocaleString()} đ
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

// Promo banner
export const PromoBanner = () => (
  <section className="bg-gray-700 text-white py-10 text-center relative">
    {/* Đặt ảnh với class 'object-cover' để ảnh không bị méo */}
    <img src="/hn.png" alt="Promo" className="w-full h-65 object-cover" />

    {/* Chữ và button được căn giữa */}
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
      <h3 className="text-xl tracking-widest mb-2">THE MOMENT</h3>
      <h2 className="text-5xl font-light mb-4">I FEEL FROM THE SKY</h2>
      <Button variant="outline">WATCH HER MOMENT!</Button>
    </div>
  </section>
);

// Newsletter
export const Newsletter = () => {
  const navigate = useNavigate(); // tạo navigator
  const [email, setEmail] = useState("");

  const handleSignUp = () => {
    if (!email) {
      alert("Vui lòng nhập email");
      return;
    }
    // Bạn có thể thêm validation email ở đây nếu muốn

    // chuyển sang trang đăng ký
    navigate("/register"); // hoặc "/signup" tùy route bạn định nghĩa
  };

  return (
    <section className="relative text-center py-10 px-4">
      <img
        src="/bg.jpg"
        alt="Newsletter"
        className="w-full h-[400px] object-cover mb-4"
      />

      <div className="absolute top-1/4 left-10 text-black">
        <h2 className="text-3xl font-bold">HÃY LÀ NGƯỜI TIÊN PHONG</h2>
        <p className="text-lg mb-4">
          Nhận tin tức và khuyến mãi mới nhất sẽ được gửi đến hộp thư của bạn.
        </p>

        <div className="flex justify-center space-x-2 mt-4">
          <input
            type="email"
            placeholder="Your Email (required)"
            className="border px-4 py-2 rounded w-1/2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSignUp}>SIGN UP</Button>
        </div>
      </div>
    </section>
  );
};
