import React from "react";
import { Button } from "@/components/ui/button";

// Hero Banner
export const HeroBanner = () => (
  <section className="text-center py-12 bg-gray-100">
    <h2 className="text-xl mb-2 tracking-wider">QUÀ TẶNG CHO NÀNG</h2>
    <p className="text-sm mb-4 tracking-wide">
      BỘ SƯU TẬP QUÀ TẶNG Ý NGHĨA NHẤT
    </p>
    <Button variant="outline">MUA NGAY</Button>
  </section>
);

// Danh mục chính
export const CategoryGrid = () => (
  <div className="grid grid-cols-3 gap-4 px-6 py-8">
    {["women.jpg", "men.jpg", "accessory.jpg"].map((img, i) => (
      <div key={i} className="text-center">
        <img src={`/images/${img}`} alt="" className="w-full h-auto" />
        <h3 className="mt-2 uppercase text-sm">
          {["Đồng Hồ Nữ", "Đồng Hồ Nam", "Phụ Kiện"][i]}
        </h3>
      </div>
    ))}
  </div>
);

// Thanh dịch vụ
export const ServicesBar = () => (
  <div className="flex justify-around py-4 text-xs bg-white border-t">
    <div>🚚 Ship COD toàn quốc</div>
    <div>🛠️ Bảo hành 2 năm</div>
    <div>🔄 Đổi 1 đổi 1 trong 14 ngày</div>
  </div>
);

// Section sản phẩm
export const ProductSection = ({ title, type }) => (
  <section
    className={`px-6 py-10 ${type === "accessories" ? "bg-gray-50" : ""}`}
  >
    <h2 className="text-center text-lg mb-6 tracking-widest">{title}</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="text-center">
          <div className="text-xs text-gray-500">
            {type === "accessories" ? "NHẪN" : "PHỤ KIỆN"}
          </div>
          <p className="line-through text-sm">
            {type === "accessories" ? "1.100.000 đ" : "1.400.000 đ"}
          </p>
          <p className="font-bold text-md">
            {type === "accessories" ? "490.000 đ" : "550.000 đ"}
          </p>
        </div>
      ))}
    </div>
  </section>
);

// Promo banner
export const PromoBanner = () => (
  <section className="bg-gray-700 text-white py-10 text-center">
    <h3 className="text-xs tracking-widest mb-2">THE MOMENT</h3>
    <h2 className="text-2xl font-light mb-4">I FEEL FROM THE SKY</h2>
    <Button variant="outline">WATCH HER MOMENT!</Button>
  </section>
);

// Newsletter
export const Newsletter = () => (
  <section className="text-center py-10 px-4">
    <h2 className="text-lg mb-2">HÃY LÀ NGƯỜI TIÊN PHONG</h2>
    <p className="text-sm mb-4 text-gray-500">
      Nhận tin tức và khuyến mãi mới nhất sẽ được gửi đến hộp thư của bạn.
    </p>
    <div className="flex justify-center space-x-2">
      <input
        type="email"
        placeholder="Your Email (required)"
        className="border px-4 py-2 rounded w-1/2"
      />
      <Button>SIGN UP</Button>
    </div>
  </section>
);
