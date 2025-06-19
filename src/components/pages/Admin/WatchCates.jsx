import { useState } from "react";
import { useDanhMucList } from "../../../hooks/useDanhMucList";
import { useCreateDanhMuc } from "../../../hooks/useCreateDanhMuc";
import { useDeleteDanhMuc } from "../../../hooks/useDeleteDanhMuc";
import { useUpdateDanhMuc } from "../../../hooks/useUpdateDanhMuc";
import QuanlyButton from "../../ui/quanlyButton";

export default function WatchCategories() {
  const { data: categories, loading, error, refetch } = useDanhMucList();
  const { create } = useCreateDanhMuc();
  const { deleteDanhMucById } = useDeleteDanhMuc();
  const { update } = useUpdateDanhMuc();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    madanhmuc: "",
    tendanhmuc: "",
    dacdiem: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    setFormData({ madanhmuc: "", tendanhmuc: "", dacdiem: "" });
    setEditingId(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setFormData({ madanhmuc: "", tendanhmuc: "", dacdiem: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (id) => {
    const dm = categories.find((d) => d.madanhmuc === id);
    if (dm) {
      setFormData({
        madanhmuc: dm.madanhmuc,
        tendanhmuc: dm.tendanhmuc,
        dacdiem: dm.dacdiem,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        await deleteDanhMucById(id);
        await refetch();
      } catch (err) {
        const msg =
          err?.response?.data?.message ||
          err.message ||
          "Không thể xoá danh mục";
        alert("❌ " + msg);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!editingId) {
        const isDuplicate = categories.some(
          (dm) => dm.madanhmuc === formData.madanhmuc
        );
        if (isDuplicate) {
          alert("❌ Mã danh mục đã tồn tại!");
          return;
        }
      }

      if (editingId) {
        await update(editingId, formData);
      } else {
        await create(formData);
      }

      closeForm();
      await refetch();
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err.message ||
        "Lỗi không xác định khi lưu";
      alert("❌ " + msg);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Quản lý Danh mục Đồng hồ</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ➕ Thêm danh mục
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ❌
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {editingId ? "Sửa danh mục" : "Thêm danh mục mới"}
            </h2>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Mã danh mục"
                className="p-2 border rounded"
                value={formData.madanhmuc}
                onChange={(e) =>
                  setFormData({ ...formData, madanhmuc: e.target.value })
                }
                required
                disabled={!!editingId} // Không cho sửa mã khi sửa
              />
              <input
                type="text"
                placeholder="Tên danh mục"
                className="p-2 border rounded"
                value={formData.tendanhmuc}
                onChange={(e) =>
                  setFormData({ ...formData, tendanhmuc: e.target.value })
                }
                required
              />
              <textarea
                placeholder="Đặc điểm"
                rows={3}
                className="p-2 border rounded"
                value={formData.dacdiem}
                onChange={(e) =>
                  setFormData({ ...formData, dacdiem: e.target.value })
                }
              />
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                💾 {editingId ? "Cập nhật" : "Lưu"} danh mục
              </button>
            </form>
          </div>
        </div>
      )}

      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow text-sm">
          <table className="min-w-full bg-white text-left">
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
                    <td className="p-3 whitespace-nowrap">
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
