import { useState } from 'react';
import { useDongHoList } from '../../../hooks/useDongHoList';
import { useDanhMucList } from '../../../hooks/useDanhMucList';
import { useCreateDongHo } from '../../../hooks/useCreateDongHo';
import { useUpdateDongHo } from '../../../hooks/useUpdateDongHo';
import QuanlyButton from '../../ui/quanlyButton';
import { useDeleteDongHo } from '../../../hooks/useDeleteDongHo';


export default function WatchModels() {
  const { onDelete, loading: deleting, error: deleteError } = useDeleteDongHo();
  const { data: models, loading, error, refetch } = useDongHoList();
  const { data: danhMucs, loading: loadingDanhMuc } = useDanhMucList();
  const { onCreate, loading: creating, error: createError } = useCreateDongHo();
  const { onUpdate, loading: updating, error: updateError } = useUpdateDongHo();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    tenmodel: "",
    madanhmuc: "",
    chatlieuvo: "",
    chatlieuday: "",
    mauday: "",
    duongkinh: "",
    doday: "",
    chongnuoc: "",
    dongco: "",
    mausomatso: "",
    gioitinh: ""
  });

  const handleAdd = () => {
    setFormData({
      tenmodel: "",
      madanhmuc: "",
      chatlieuvo: "",
      chatlieuday: "",
      mauday: "",
      duongkinh: "",
      doday: "",
      chongnuoc: "",
      dongco: "",
      mausomatso: "",
      gioitinh: ""
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (id) => {
    const model = models.find((m) => m.madongho === id);
    if (!model) return;
    setFormData({ ...model });
    setEditingId(id);
    setShowForm(true);
  };

  const closeForm = () => setShowForm(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await onUpdate(editingId, formData);
        alert("✅ Cập nhật model thành công!");
      } else {
        await onCreate(formData);
        alert("✅ Thêm model thành công!");
      }
      setShowForm(false);
      setEditingId(null);
      refetch();
    } catch (err) {
      alert("❌ Lỗi: " + err.message);
    }
  };

const handleDelete = async (id) => {
  const confirmDelete = window.confirm('Bạn có chắc chắn muốn xoá model này không?');
  if (!confirmDelete) return;

  try {
    await onDelete(id);
    alert('✅ Xoá thành công!');
    refetch();
  } catch (err) {
    const msg = err.response?.data?.message || err.message || "Xoá thất bại";
    alert('❌ ' + msg);
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

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">{editingId ? 'Sửa model' : 'Thêm model mới'}</h2>

            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
              <input type="text" placeholder="Tên model" className="p-2 border rounded" value={formData.tenmodel} onChange={(e) => setFormData({ ...formData, tenmodel: e.target.value })} />

              <select className="p-2 border rounded" value={formData.madanhmuc} onChange={(e) => setFormData({ ...formData, madanhmuc: e.target.value })}>
                <option value="">-- Chọn danh mục --</option>
                {danhMucs.map((dm) => (
                  <option key={dm.madanhmuc} value={dm.madanhmuc}>
                    {dm.tendanhmuc}
                  </option>
                ))}
              </select>

              <input type="text" placeholder="Chất liệu vỏ" className="p-2 border rounded" value={formData.chatlieuvo} onChange={(e) => setFormData({ ...formData, chatlieuvo: e.target.value })} />
              <input type="text" placeholder="Chất liệu dây" className="p-2 border rounded" value={formData.chatlieuday} onChange={(e) => setFormData({ ...formData, chatlieuday: e.target.value })} />
              <input type="text" placeholder="Màu dây" className="p-2 border rounded" value={formData.mauday} onChange={(e) => setFormData({ ...formData, mauday: e.target.value })} />
              <input type="text" placeholder="Đường kính" className="p-2 border rounded" value={formData.duongkinh} onChange={(e) => setFormData({ ...formData, duongkinh: e.target.value })} />
              <input type="text" placeholder="Độ dày" className="p-2 border rounded" value={formData.doday} onChange={(e) => setFormData({ ...formData, doday: e.target.value })} />
              <input type="text" placeholder="Chống nước" className="p-2 border rounded" value={formData.chongnuoc} onChange={(e) => setFormData({ ...formData, chongnuoc: e.target.value })} />
              <input type="text" placeholder="Động cơ" className="p-2 border rounded" value={formData.dongco} onChange={(e) => setFormData({ ...formData, dongco: e.target.value })} />
              <input type="text" placeholder="Mặt số" className="p-2 border rounded" value={formData.mausomatso} onChange={(e) => setFormData({ ...formData, mausomatso: e.target.value })} />

              <select className="p-2 border rounded col-span-2" value={formData.gioitinh} onChange={(e) => setFormData({ ...formData, gioitinh: e.target.value })}>
                <option value="">-- Chọn giới tính --</option>
                <option value="nam">Nam</option>
                <option value="nu">Nữ</option>
                <option value="unisex">Unisex</option>
              </select>

              {(createError || updateError) && (
                <p className="text-red-500 col-span-2">❌ {(createError || updateError)}</p>
              )}

              <button type="submit" className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                💾 {editingId ? 'Cập nhật' : 'Lưu model'}
              </button>
            </form>
          </div>
        </div>
      )}

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
