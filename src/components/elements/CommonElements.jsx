import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Hero Banner
export const HeroBanner = () => (
  <section className="relative text-white bg-gray-100">
    <img
      src="/nen.png"
      alt="Quà tặng cho nàng"
      className="w-full h-[300px] sm:h-[360px] object-cover"
    />
    <div className="absolute top-1/2 left-6 sm:left-16 transform -translate-y-1/2 text-left">
      <h2 className="text-2xl sm:text-3xl mb-2 tracking-wider">
        QUÀ TẶNG CHO NÀNG
      </h2>
      <p className="text-base sm:text-lg mb-4 tracking-wide">
        BỘ SƯU TẬP QUÀ TẶNG Ý NGHĨA NHẤT
      </p>
      <Button variant="outline">MUA NGAY</Button>
    </div>
  </section>
);

// Danh mục chính
export const CategoryGrid = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4 sm:px-6 py-8">
    {["DHNữ.png", "DHNam.png", "phukien.png"].map((img, i) => (
      <div key={i} className="relative text-center rounded overflow-hidden">
        <img src={`/${img}`} alt="" className="w-full h-64 object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-white text-xl font-bold bg-black/50 px-3 py-2 rounded">
            {["Đồng Hồ Nữ", "Đồng Hồ Nam", "Best Seller"][i]}
          </h3>
        </div>
      </div>
    ))}
  </div>
);

// Thanh dịch vụ
export const ServicesBar = () => (
  <div className="flex flex-col sm:flex-row justify-around items-center text-center py-4 text-base bg-white border-t gap-2">
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
      .get(`http://localhost:3000/api/sanphams?${type}=1`)
      .then((res) => {
        if (res.data.success) setProducts(res.data.data);
        else console.error("Lỗi dữ liệu:", res.data.message);
      })
      .catch((err) => console.error("Lỗi khi tải sản phẩm:", err));
  }, [type]);

  return (
    <section
      className={`px-4 sm:px-6 py-10 ${
        type === "accessories" ? "bg-gray-50" : ""
      }`}
    >
      <h2 className="text-center text-xl sm:text-2xl mb-6 tracking-widest">
        {title}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {products.slice(0, 4).map((sp) => (
          <div
            key={sp.masanpham}
            className="text-center bg-white p-2 rounded shadow-sm"
          >
            <img
              src={sp.hinhanhchinh}
              alt={sp.tensanpham}
              className="w-full h-48 object-cover mb-2"
            />
            <div className="text-sm text-gray-600">{sp.tensanpham}</div>
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
  <section className="relative text-white text-center">
    <img
      src="/hn.png"
      alt="Promo"
      className="w-full h-[250px] sm:h-[320px] object-cover"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
      <h3 className="text-base sm:text-xl tracking-widest mb-1">THE MOMENT</h3>
      <h2 className="text-3xl sm:text-5xl font-light mb-3">
        I FEEL FROM THE SKY
      </h2>
      <Button variant="outline">WATCH HER MOMENT!</Button>
    </div>
  </section>
);

// Newsletter
export const Newsletter = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSignUp = () => {
    if (!email) {
      alert("Vui lòng nhập email");
      return;
    }
    navigate("/register");
  };

  return (
    <section className="relative py-10 px-4">
      <img
        src="/bg.jpg"
        alt="Newsletter"
        className="w-full h-[300px] sm:h-[400px] object-cover rounded"
      />
      <div className="absolute top-1/4 sm:top-1/3 left-1/2 transform -translate-x-1/2 text-center text-black w-full max-w-xl px-4">
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          HÃY LÀ NGƯỜI TIÊN PHONG
        </h2>
        <p className="text-sm sm:text-lg mb-4">
          Nhận tin tức và khuyến mãi mới nhất sẽ được gửi đến hộp thư của bạn.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2">
          <input
            type="email"
            placeholder="Your Email (required)"
            className="border px-4 py-2 rounded w-full sm:w-2/3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSignUp} className="w-full sm:w-auto">
            SIGN UP
          </Button>
        </div>
      </div>
    </section>
  );
};
