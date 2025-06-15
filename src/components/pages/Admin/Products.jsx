import { useSanPhamList } from '../../../hooks/useSanPhamList'; // Đảm bảo đúng đường dẫn

export default function SanPhamList() {
  const { data: products, loading, error } = useSanPhamList();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Sản phẩm</h1>

      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border rounded shadow bg-white text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Mã SP</th>
                <th className="p-3">Tên sản phẩm</th>
                <th className="p-3">Model</th>
                <th className="p-3">Mô tả</th>
                <th className="p-3">Giá bán</th>
                <th className="p-3">Hình ảnh</th>
                <th className="p-3">Ngày tạo</th>
                <th className="p-3">Ưu đãi</th>
                <th className="p-3">Số lượng</th>
                <th className="p-3">Best seller</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((sp) => (
                  <tr key={sp.masanpham} className="border-t hover:bg-gray-50">
                    <td className="p-3">{sp.masanpham}</td>
                    <td className="p-3">{sp.tensanpham}</td>
                    <td className="p-3">{sp.mamodel}</td>
                    <td className="p-3 max-w-xs truncate">{sp.mota}</td>
                    <td className="p-3">{Number(sp.giaban).toLocaleString()} VND</td>
                    <td className="p-3">
                      <img src={sp.hinhanhchinh} alt="ảnh sản phẩm" className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="p-3">{new Date(sp.ngaytao).toLocaleDateString()}</td>
                    <td className="p-3">{sp.mauudai}</td>
                    <td className="p-3">{sp.soluong}</td>
                    <td className="p-3">{sp.bestseller ? '✅' : '❌'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center text-gray-500 py-4">
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
