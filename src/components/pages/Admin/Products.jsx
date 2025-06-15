import { useState } from 'react';
import { useSanPhamList } from '../../../hooks/useSanPhamList';
import QuanlyButton from '../../ui/quanlyButton';

export default function SanPhamList() {
  const { data: products, loading, error } = useSanPhamList();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => {
    setShowForm(true); // Hiện frame thêm sản phẩm
  };

  const closeForm = () => {
    setShowForm(false); // Ẩn frame
  };

  const handleEdit = (id) => {
    console.log('✏️ Sửa sản phẩm:', id);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      console.log('🗑️ Xóa sản phẩm:', id);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Sản phẩm</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Thêm sản phẩm
        </button>
      </div>

      {/* 🟦 Frame thêm sản phẩm */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
            {/* Nút đóng */}
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">Thêm sản phẩm mới</h2>

            <form className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Mã sản phẩm" className="p-2 border rounded" />
              <input type="text" placeholder="Tên sản phẩm" className="p-2 border rounded" />
              <input type="text" placeholder="Model" className="p-2 border rounded" />
              <input type="number" placeholder="Giá bán" className="p-2 border rounded" />
              <input type="text" placeholder="Ưu đãi" className="p-2 border rounded" />
              <input type="number" placeholder="Số lượng" className="p-2 border rounded" />
              <input type="text" placeholder="Link hình ảnh" className="p-2 border rounded col-span-2" />
              <textarea placeholder="Mô tả" className="p-2 border rounded col-span-2" />
              <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                💾 Lưu sản phẩm
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bảng sản phẩm */}
      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow">
          <table className="table-auto w-full text-left bg-white text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
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
                <th className="p-3">Hành động</th>
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
                    <td className="p-3">
                      {Number(sp.giaban).toLocaleString()} VND
                    </td>
                    <td className="p-3">
                      <img
                        src={sp.hinhanhchinh}
                        alt="ảnh sản phẩm"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-3">
                      {new Date(sp.ngaytao).toLocaleDateString()}
                    </td>
                    <td className="p-3">{sp.mauudai}</td>
                    <td className="p-3">{sp.soluong}</td>
                    <td className="p-3">{sp.bestseller ? '✅' : '❌'}</td>
                    <td className="p-3">
                      <QuanlyButton
                        onEdit={() => handleEdit(sp.masanpham)}
                        onDelete={() => handleDelete(sp.masanpham)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="11" className="text-center text-gray-500 py-4">
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
