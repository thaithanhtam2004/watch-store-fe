import { useState } from "react";
import { useDonHangList } from "../../../hooks/useDonHangList";
import { useNguoiDungList } from "../../../hooks/useNguoiDungList";
import { useSanPhamList } from "../../../hooks/useSanPhamList";
import DonHangDetailModal from "../../elements/DonHangDetailModal"; // 👈 nhớ tạo file này cùng thư mục

// Hàm định dạng tiền VND
const formatVND = (amount) => {
  const num = Number(amount);
  return !isNaN(num)
    ? num.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    : "0 ₫";
};

export default function Dashboard() {
  const [selectedDonHang, setSelectedDonHang] = useState(null);

  const { data: donHangData = [], loading: loadingDH, error: errorDH } = useDonHangList();
  const { data: nguoiDungData = [], loading: loadingND, error: errorND } = useNguoiDungList();
  const { data: sanPhamData = [], loading: loadingSP, error: errorSP } = useSanPhamList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trang thống kê</h1>

      {/* Thống kê tổng số lượng */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Box title="Tổng đơn hàng" value={donHangData.length} color="bg-blue-500" />
        <Box title="Tổng sản phẩm" value={sanPhamData.length} color="bg-green-500" />
        <Box title="Tổng người dùng" value={nguoiDungData.length} color="bg-yellow-500" />
      </div>

      {/* Bảng đơn hàng */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Danh sách đơn hàng</h2>

        {loadingDH && <p className="text-gray-500">Đang tải đơn hàng...</p>}
        {errorDH && <p className="text-red-500">Lỗi: {errorDH}</p>}

        {!loadingDH && !errorDH && (
          <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow">
            <table className="table-auto w-full text-left bg-white text-sm">
              <thead className="bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th className="p-3">Mã đơn hàng</th>
                  <th className="p-3">Tổng tiền</th>
                  <th className="p-3">Phương thức</th>
                  <th className="p-3">Ngày đặt</th>
                  <th className="p-3">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {donHangData.length > 0 ? (
                  donHangData.map((dh) => (
                    <tr
                      key={dh.madonhang}
                      className="border-t hover:bg-gray-50 cursor-pointer"
                      onClick={() => setSelectedDonHang(dh)}
                    >
                      <td className="p-3">{dh.madonhang}</td>
                      <td className="p-3">{formatVND(dh.tongtien)}</td>
                      <td className="p-3">{dh.maphuongthuc}</td>
                      <td className="p-3">{new Date(dh.ngaydat).toLocaleDateString("vi-VN")}</td>
                      <td className="p-3">
                        <span className="capitalize px-2 py-1 text-sm rounded bg-gray-200">
                          {dh.trangthai?.replaceAll("_", " ") || "Không rõ"}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center text-gray-500 py-4">
                      Không có đơn hàng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal chi tiết đơn hàng */}
      {selectedDonHang && (
        <DonHangDetailModal
          dh={selectedDonHang}
          onClose={() => setSelectedDonHang(null)}
        />
      )}
    </div>
  );
}

// Box thống kê
function Box({ title, value, color }) {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <div className="text-sm opacity-80">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
