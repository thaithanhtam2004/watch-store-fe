import React, { useEffect } from "react";
import { Header, Footer } from "../layouts/main.layout";

const formatVND = (amount) =>
  parseFloat(amount)?.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });

const formatDate = (isoDate) => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  return date.toLocaleDateString("vi-VN") + " " + date.toLocaleTimeString("vi-VN");
};

const XacNhanPage = () => {
  const data = JSON.parse(localStorage.getItem("xacnhan_donhang_data") || "{}");
  const {
    madonhang,
    items = [],
    maphuongthuc,
    tenphuongthuc,
    tongtien,
    ngaydat,
  } = data;

  useEffect(() => {
    // Xóa localStorage khi rời trang
    return () => {
      localStorage.removeItem("xacnhan_donhang_data");
      localStorage.removeItem("madonhang_vuadat");
      localStorage.removeItem("tao_don_hang_data");
    };
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-20 py-10">
        {/* BÊN TRÁI: Chi tiết sản phẩm */}
        <div>
          <h3 className="text-xl font-bold mb-4">CHI TIẾT SẢN PHẨM</h3>
          <div className="border p-4 rounded-lg space-y-3 bg-white">
            {items.length === 0 ? (
              <p>Không có sản phẩm nào.</p>
            ) : (
              <>
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={`/images/${item.hinhanhchinh}`}
                        alt={item.tensanpham}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold">{item.tensanpham}</p>
                        <p className="text-sm text-gray-600">x {item.soluong}</p>
                      </div>
                    </div>
                    <span className="font-semibold">
                      {formatVND(parseFloat(item.giaban) * item.soluong)}
                    </span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>{formatVND(tongtien)}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* BÊN PHẢI: Thông tin đơn hàng */}
        <div>
          <h3 className="text-xl font-bold mb-4">THÔNG TIN ĐƠN HÀNG</h3>
          <div className="border p-4 rounded-lg space-y-3 bg-white">
            {madonhang ? (
              <>
                <p><strong>Mã đơn hàng:</strong> {madonhang}</p>
                <p><strong>Trạng thái:</strong> Đã đặt hàng</p>
                <p><strong>Ngày đặt:</strong> {formatDate(ngaydat)}</p>
                <p>
                  <strong>Phương thức thanh toán:</strong><br />
                  {tenphuongthuc || maphuongthuc}
                </p>
                <p className="text-lg font-semibold text-right">
                  Tổng tiền: {formatVND(tongtien)}
                </p>
              </>
            ) : (
              <p>Không tìm thấy đơn hàng.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default XacNhanPage;
