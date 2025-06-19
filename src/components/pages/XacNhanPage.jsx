import React, { useEffect, useState } from "react";
import { Header, Footer } from "../layouts/main.layout";
import { getSanPhamById } from "../../services/sanphamService";

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
  const [sanPhamChiTiet, setSanPhamChiTiet] = useState([]);
  const [donHangData, setDonHangData] = useState({});

  useEffect(() => {
    const rawData = localStorage.getItem("xacnhan_donhang_data");
    if (!rawData) return;

    const data = JSON.parse(rawData || "{}");
    setDonHangData(data);

    const fetchSanPhamChiTiet = async () => {
      const chiTiet = await Promise.all(
        (data.items || []).map(async (item) => {
          try {
            const sp = await getSanPhamById(item.masanpham);
            return {
              ...item,
              tensanpham: sp?.tensanpham || "Không rõ tên",
            };
          } catch (e) {
            console.error("Lỗi khi lấy sản phẩm:", item.masanpham, e);
            return { ...item, tensanpham: "Lỗi tên" };
          }
        })
      );
      setSanPhamChiTiet(chiTiet);
    };

    fetchSanPhamChiTiet();

    return () => {
      localStorage.removeItem("xacnhan_donhang_data");
      localStorage.removeItem("madonhang_vuadat");
    };
  }, []);

  const { madonhang, maphuongthuc, tenphuongthuc, tongtien, ngaydat } = donHangData;

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-20 py-10">
        {/* Sản phẩm */}
        <div>
          <h3 className="text-xl font-bold mb-4">CHI TIẾT SẢN PHẨM</h3>
          <div className="border p-4 rounded-lg space-y-3 bg-white">
            {sanPhamChiTiet.length === 0 ? (
              <p>Không có sản phẩm nào.</p>
            ) : (
              <>
                {sanPhamChiTiet.map((item, index) => (
                  <div key={index} className="flex justify-between border-b pb-2">
                    <div>
                      <p className="font-semibold">{item.tensanpham}</p>
                      <p className="text-sm text-gray-600">x {item.soluong}</p>
                    </div>
                    <span className="font-semibold">
                      {formatVND(item.giaban * item.soluong)}
                    </span>
                  </div>
                ))}
                <hr />
                <div className="flex justify-between font-semibold text-lg">
                  <span>Tổng cộng</span>
                  <span>
                    {formatVND(
                      sanPhamChiTiet.reduce(
                        (sum, item) => sum + item.giaban * item.soluong,
                        0
                      )
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Thông tin đơn hàng */}
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
