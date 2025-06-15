import { useState } from 'react';
import { useDanhMucList } from '../../../hooks/useDanhMucList';
import QuanlyButton from '../../ui/quanlyButton';

export default function WatchCategories() {
  const { data: categories, loading, error } = useDanhMucList();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleEdit = (id) => {
    console.log('✏️ Sửa danh mục:', id);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa danh mục này?')) {
      console.log('🗑️ Xóa danh mục:', id);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Danh mục Đồng hồ</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Thêm danh mục
        </button>
      </div>

      {/* 🟦 Form thêm danh mục */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">Thêm danh mục mới</h2>

            <form className="grid grid-cols-1 gap-4">
              <input type="text" placeholder="Mã danh mục" className="p-2 border rounded" />
              <input type="text" placeholder="Tên danh mục" className="p-2 border rounded" />
              <textarea placeholder="Đặc điểm" rows={3} className="p-2 border rounded" />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                💾 Lưu danh mục
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🟧 Bảng danh mục */}
      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow">
          <table className="table-auto w-full text-left bg-white text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3">Mã danh mục</th>
                <th className="p-3">Tên danh mục</th>
                <th className="p-3">Đặc điểm</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((dm) => (
                  <tr key={dm.madanhmuc} className="border-t hover:bg-gray-50">
                    <td className="p-3">{dm.madanhmuc}</td>
                    <td className="p-3">{dm.tendanhmuc}</td>
                    <td className="p-3">{dm.dacdiem}</td>
                    <td className="p-3">
                      <QuanlyButton
                        onEdit={() => handleEdit(dm.madanhmuc)}
                        onDelete={() => handleDelete(dm.madanhmuc)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500 py-4">
                    Không có danh mục
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
