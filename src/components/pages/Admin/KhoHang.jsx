import { useState } from 'react';
import { useKhoHangList } from '../../../hooks/useKhoHangList';
import QuanlyButton from '../../ui/quanlyButton';

export default function KhoHangList() {
  const { data: khoList, loading, error } = useKhoHangList();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleEdit = (makhohang) => {
    console.log('✏️ Sửa kho hàng:', makhohang);
  };

  const handleDelete = (makhohang) => {
    if (confirm('Bạn có chắc chắn muốn xóa kho hàng này?')) {
      console.log('🗑️ Xóa kho hàng:', makhohang);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Kho hàng</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Nhập kho mới
        </button>
      </div>

      {/* 🟦 Frame thêm kho hàng */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl p-6 relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ❌
            </button>
            <h2 className="text-xl font-semibold mb-4">Nhập kho mới</h2>
            <form className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Mã dòng hồ" className="p-2 border rounded" />
              <input type="number" placeholder="Số lượng nhập" className="p-2 border rounded" />
              <input type="text" placeholder="Ghi chú" className="p-2 border rounded col-span-2" />
              <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                💾 Nhập kho
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Bảng kho hàng */}
      {loading && <p className="text-gray-500">Đang tải dữ liệu kho hàng...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow">
          <table className="table-auto w-full text-left bg-white text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3">Mã kho</th>
                <th className="p-3">Mã dòng hồ</th>
                <th className="p-3">Số lượng nhập</th>
                <th className="p-3">Số lượng còn</th>
                <th className="p-3">Ngày nhập</th>
                <th className="p-3">Ghi chú</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {khoList.length > 0 ? (
                khoList.map((kho) => (
                  <tr key={kho.makhohang} className="border-t hover:bg-gray-50">
                    <td className="p-3">{kho.makhohang}</td>
                    <td className="p-3">{kho.madongho}</td>
                    <td className="p-3">{kho.soluongnhap}</td>
                    <td className="p-3">{kho.soluongconlai}</td>
                    <td className="p-3">{new Date(kho.ngaynhap).toLocaleDateString()}</td>
                    <td className="p-3">{kho.ghichu || '—'}</td>
                    <td className="p-3">
                      <QuanlyButton
                        onEdit={() => handleEdit(kho.makhohang)}
                        onDelete={() => handleDelete(kho.makhohang)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center text-gray-500 py-4">
                    Không có bản ghi kho hàng
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
