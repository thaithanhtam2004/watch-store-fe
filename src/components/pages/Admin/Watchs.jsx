import { useState } from 'react';
import { useDongHoList } from '../../../hooks/useDongHoList';
import QuanlyButton from '../../ui/quanlyButton';

export default function WatchModels() {
  const { data: models, loading, error } = useDongHoList();
  const [showForm, setShowForm] = useState(false);

  const handleAdd = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  const handleEdit = (id) => {
    console.log('✏️ Sửa model:', id);
  };

  const handleDelete = (id) => {
    if (confirm('Bạn có chắc chắn muốn xóa model này?')) {
      console.log('🗑️ Xóa model:', id);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Model Đồng hồ</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Thêm model
        </button>
      </div>

      {/* 🟦 Frame thêm model */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">Thêm model mới</h2>

            <form className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Mã đồng hồ" className="p-2 border rounded" />
              <input type="text" placeholder="Tên model" className="p-2 border rounded" />
              <input type="text" placeholder="Danh mục" className="p-2 border rounded" />
              <input type="text" placeholder="Chất liệu vỏ" className="p-2 border rounded" />
              <input type="text" placeholder="Chất liệu dây" className="p-2 border rounded" />
              <input type="text" placeholder="Màu dây" className="p-2 border rounded" />
              <input type="text" placeholder="Đường kính" className="p-2 border rounded" />
              <input type="text" placeholder="Độ dày" className="p-2 border rounded" />
              <input type="text" placeholder="Chống nước" className="p-2 border rounded" />
              <input type="text" placeholder="Động cơ" className="p-2 border rounded" />
              <input type="text" placeholder="Mặt số" className="p-2 border rounded" />
              <select className="p-2 border rounded">
                <option value="">Giới tính</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
                <option value="unisex">Unisex</option>
              </select>
              <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                💾 Lưu model
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🟧 Bảng model */}
      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow">
          <table className="table-auto w-full text-left bg-white text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3">Mã ĐH</th>
                <th className="p-3">Tên Model</th>
                <th className="p-3">Danh mục</th>
                <th className="p-3">Vỏ</th>
                <th className="p-3">Dây</th>
                <th className="p-3">Màu dây</th>
                <th className="p-3">Đường kính</th>
                <th className="p-3">Độ dày</th>
                <th className="p-3">Nước</th>
                <th className="p-3">Động cơ</th>
                <th className="p-3">Mặt số</th>
                <th className="p-3">Giới tính</th>
                <th className="p-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {models.length > 0 ? (
                models.map((model) => (
                  <tr key={model.madongho} className="border-t hover:bg-gray-50">
                    <td className="p-3">{model.madongho}</td>
                    <td className="p-3">{model.tenmodel}</td>
                    <td className="p-3">{model.madanhmuc}</td>
                    <td className="p-3">{model.chatlieuvo}</td>
                    <td className="p-3">{model.chatlieuday}</td>
                    <td className="p-3">{model.mauday}</td>
                    <td className="p-3">{model.duongkinh}</td>
                    <td className="p-3">{model.doday}</td>
                    <td className="p-3">{model.chongnuoc}</td>
                    <td className="p-3">{model.dongco}</td>
                    <td className="p-3">{model.mausomatso}</td>
                    <td className="p-3 capitalize">{model.gioitinh}</td>
                    <td className="p-3">
                      <QuanlyButton
                        onEdit={() => handleEdit(model.madongho)}
                        onDelete={() => handleDelete(model.madongho)}
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="13" className="text-center text-gray-500 py-4">
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
