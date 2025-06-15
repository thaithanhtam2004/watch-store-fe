import { useEffect, useState } from "react"

export default function Dashboard() {
  const [thongke, setThongke] = useState({
    tongDonHang: 0,
    tongSanPham: 0,
    tongNguoiDung: 0,
    donHangMoi: [],
  })

  // Giả lập gọi API (thay bằng fetch thực tế)
  useEffect(() => {
    // Giả lập dữ liệu từ server
    const data = {
      tongDonHang: 124,
      tongSanPham: 56,
      tongNguoiDung: 31,
      donHangMoi: [
        { madonhang: "DH001", tennguoinhan: "Nguyễn Văn A", tongtien: 3500000, trangthai: "cho_xac_nhan" },
        { madonhang: "DH002", tennguoinhan: "Trần Thị B", tongtien: 1850000, trangthai: "dang_giao" },
      ],
    }
    setThongke(data)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trang thống kê</h1>

      {/* Box thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Box title="Tổng đơn hàng" value={thongke.tongDonHang} color="bg-blue-500" />
        <Box title="Tổng sản phẩm" value={thongke.tongSanPham} color="bg-green-500" />
        <Box title="Tổng người dùng" value={thongke.tongNguoiDung} color="bg-yellow-500" />
      </div>

      {/* Đơn hàng gần đây */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Đơn hàng mới</h2>
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
            {thongke.donHangMoi.map((dh) => (
              <tr key={dh.madonhang} className="border-b">
                <td className="p-2">{dh.madonhang}</td>
                <td className="p-2">{dh.tennguoinhan}</td>
                <td className="p-2">{dh.tongtien.toLocaleString()}₫</td>
                <td className="p-2">
                  <span className="capitalize px-2 py-1 text-sm rounded bg-gray-200">
                    {dh.trangthai.replaceAll("_", " ")}
                  </span>
                </td>
              </tr>
            ))}
            {thongke.donHangMoi.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center text-gray-500 py-4">
                  Không có đơn hàng mới
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Component nhỏ để hiển thị số
function Box({ title, value, color }) {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <div className="text-sm opacity-80">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  )
}
