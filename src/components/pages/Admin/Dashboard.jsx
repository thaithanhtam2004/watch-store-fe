import { useDonHangList } from "../../../hooks/useDonHangList";     // ✅ hook lấy đơn hàng
import { useNguoiDungList } from "../../../hooks/useNguoiDungList"; // ✅ hook lấy người dùng
import { useSanPhamList } from "../../../hooks/useSanPhamList";     // ✅ hook lấy sản phẩm

// Hàm định dạng tiền VND an toàn
const formatVND = (amount) =>
  typeof amount === "number"
    ? amount.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
    : "0 ₫";

export default function Dashboard() {
  const { data: donHangData = [], loading: loadingDH, error: errorDH } = useDonHangList();
  const { data: nguoiDungData = [], loading: loadingND, error: errorND } = useNguoiDungList();
  const { data: sanPhamData = [], loading: loadingSP, error: errorSP } = useSanPhamList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trang thống kê</h1>

      {/* Box thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Box title="Tổng đơn hàng" value={donHangData.length} color="bg-blue-500" />
        <Box title="Tổng sản phẩm" value={sanPhamData.length} color="bg-green-500" />
        <Box title="Tổng người dùng" value={nguoiDungData.length} color="bg-yellow-500" />
      </div>

      {/* Tất cả đơn hàng */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Tất cả đơn hàng</h2>

        {loadingDH ? (
          <p className="text-blue-500">Đang tải đơn hàng...</p>
        ) : errorDH ? (
          <p className="text-red-500">Lỗi: {errorDH}</p>
        ) : (
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Mã đơn</th>
                <th className="p-2">Người nhận</th>
                <th className="p-2">Tổng tiền</th>
                <th className="p-2">Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {donHangData.length > 0 ? (
                donHangData.map((dh) => (
                  <tr key={dh.madonhang} className="border-b">
                    <td className="p-2">{dh.madonhang}</td>
                    <td className="p-2">{dh.tennguoinhan}</td>
                    <td className="p-2">{formatVND(dh.tongtien)}</td>
                    <td className="p-2">
                      <span className="capitalize px-2 py-1 text-sm rounded bg-gray-200">
                        {dh.trangthai?.replaceAll("_", " ") || "Không rõ"}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    Không có đơn hàng
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// Component hiển thị Box thống kê
function Box({ title, value, color }) {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <div className="text-sm opacity-80">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
