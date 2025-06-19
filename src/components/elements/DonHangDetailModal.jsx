import { useDiaChiById } from "../../hooks/useDiaChiById";
import useLayChiTietDonHang from "../../hooks/useLayChiTietDonHang";

export default function DonHangDetailModal({ dh, onClose }) {
  const { data: diaChi, loading: loadingDiaChi, error: errorDiaChi } = useDiaChiById(dh.madiachi);
  const { chiTietDonHang, loading: loadingCT, error: errorCT } = useLayChiTietDonHang(dh.madonhang);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-auto">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Chi tiết đơn hàng</h2>

        {/* Thông tin đơn hàng */}
        <p><strong>Mã đơn hàng:</strong> {dh.madonhang}</p>
        <p><strong>Ngày đặt:</strong> {new Date(dh.ngaydat).toLocaleString("vi-VN")}</p>
        <p><strong>Tổng tiền:</strong> {Number(dh.tongtien).toLocaleString("vi-VN")} ₫</p>
        <p><strong>Trạng thái:</strong> {dh.trangthai.replaceAll("_", " ")}</p>
        <p><strong>Phương thức thanh toán:</strong> {dh.maphuongthuc}</p>

        <hr className="my-3" />

        {/* Thông tin địa chỉ */}
        <h3 className="font-semibold mb-2">Địa chỉ giao hàng:</h3>
        {loadingDiaChi ? (
          <p>Đang tải địa chỉ...</p>
        ) : errorDiaChi ? (
          <p className="text-red-500">Lỗi: {errorDiaChi}</p>
        ) : diaChi ? (
          <>
            <p><strong>Người nhận:</strong> {diaChi.tennguoinhan}</p>
            <p><strong>SĐT:</strong> {diaChi.sodienthoai}</p>
            <p><strong>Địa chỉ:</strong> {diaChi.diachi}</p>
          </>
        ) : (
          <p>Không tìm thấy địa chỉ.</p>
        )}

        <hr className="my-3" />

        {/* Chi tiết sản phẩm trong đơn hàng */}
        <h3 className="font-semibold mb-2 mt-4">Sản phẩm trong đơn hàng:</h3>
        {loadingCT ? (
          <p>Đang tải chi tiết sản phẩm...</p>
        ) : errorCT ? (
          <p className="text-red-500">Lỗi: {errorCT.message || "Không thể tải chi tiết"}</p>
        ) : chiTietDonHang.length > 0 ? (
          <div className="max-h-[300px] overflow-y-auto mt-2 border rounded">
            <table className="table-auto w-full text-sm">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="p-2">Hình ảnh</th>
                  <th className="p-2">Tên sản phẩm</th>
                  <th className="p-2">Số lượng</th>
                  <th className="p-2">Giá bán</th>
                </tr>
              </thead>
              <tbody>
                {chiTietDonHang.map((item) => (
                  <tr key={item.machitietdonhang} className="border-t">
                    <td className="p-2">
                      <img
                        src={`/images/${item.hinhanhchinh}`}
                        alt={item.tensanpham}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">{item.tensanpham}</td>
                    <td className="p-2">{item.soluong}</td>
                    <td className="p-2">{Number(item.giaban).toLocaleString("vi-VN")} ₫</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Không có sản phẩm nào trong đơn hàng.</p>
        )}
      </div>
    </div>
  );
}
