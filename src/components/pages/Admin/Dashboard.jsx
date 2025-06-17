import { useEffect, useState } from "react";
import { useDonHangList } from "../../../hooks/useDonHangList "; // Đảm bảo đúng đường dẫn

export default function Dashboard() {
  const { data: donHangData, loading, error } = useDonHangList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Trang thống kê</h1>

      {/* Box thống kê */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <Box title="Tổng đơn hàng" value={donHangData?.length || 0} color="bg-blue-500" />
        <Box title="Tổng sản phẩm" value="?" color="bg-green-500" /> {/* Cập nhật sau nếu có */}
        <Box title="Tổng người dùng" value="?" color="bg-yellow-500" /> {/* Cập nhật sau nếu có */}
      </div>

      {/* Tất cả đơn hàng */}
      <div className="bg-white rounded shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Tất cả đơn hàng</h2>
        {loading ? (
          <p>Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-red-500">Lỗi: {error}</p>
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
                    <td className="p-2">{dh.tongtien.toLocaleString()}₫</td>
                    <td className="p-2">
                      <span className="capitalize px-2 py-1 text-sm rounded bg-gray-200">
                        {dh.trangthai.replaceAll("_", " ")}
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

function Box({ title, value, color }) {
  return (
    <div className={`p-4 rounded shadow text-white ${color}`}>
      <div className="text-sm opacity-80">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}
