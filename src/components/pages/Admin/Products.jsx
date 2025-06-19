import { useState } from 'react';
import { useSanPhamList } from '../../../hooks/useSanPhamList';
import { createSanPham } from '../../../services/sanphamService';
import { useUpdateSanPham } from '../../../hooks/useUpdateSanPham';
import QuanlyButton from '../../ui/quanlyButton';
import { FaPlus, FaSave } from 'react-icons/fa';
import { FiCheck, FiX } from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import { useDeleteSanPham } from "../../../hooks/useDeleteSanPham";

export default function SanPhamList() {
  const { onDelete, loading: deleting, error: deleteError } = useDeleteSanPham();
  const { data: products, loading, error, refetch } = useSanPhamList();
  const { onUpdate, loading: updating, error: updateError } = useUpdateSanPham();
  const [showForm, setShowForm] = useState(false);
  const [sanPhamDangSua, setSanPhamDangSua] = useState(null);
  const [formData, setFormData] = useState({
    tensanpham: "",
    mamodel: "",
    mota: "",
    giaban: "",
    hinhanhchinh: "",
    mauudai: "",
    soluong: "",
    bestseller: false,
    trangthai: "",
  });

  const resetForm = () => ({
    tensanpham: "",
    mamodel: "",
    mota: "",
    giaban: "",
    hinhanhchinh: "",
    mauudai: "",
    soluong: "",
    bestseller: false,
    trangthai: "",
  });

  const handleAdd = () => {
    setSanPhamDangSua(null);
    setFormData(resetForm());
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSanPhamDangSua(null);
    setFormData(resetForm());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      giaban: Number(formData.giaban),
      soluong: Number(formData.soluong),
    };

    try {
      if (sanPhamDangSua) {
        await onUpdate(sanPhamDangSua, data);
        alert("✅ Cập nhật sản phẩm thành công!");
      } else {
        await createSanPham(data);
        alert("✅ Thêm sản phẩm thành công!");
      }
      closeForm();
      refetch();
    } catch (err) {
      alert("❌ Lỗi khi lưu sản phẩm");
    }
  };

  const handleEdit = (id) => {
    const sp = products.find((p) => p.masanpham === id);
    if (sp) {
      setFormData({
        tensanpham: sp.tensanpham,
        mamodel: sp.mamodel,
        mota: sp.mota,
        giaban: sp.giaban,
        hinhanhchinh: sp.hinhanhchinh,
        mauudai: sp.mauudai,
        soluong: sp.soluong,
        bestseller: sp.bestseller,
        trangthai: sp.trangthai || "",
      });
      setSanPhamDangSua(sp.masanpham);
      setShowForm(true);
    }
  };

const handleDelete = async (id) => {
  if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

  try {
    await onDelete(id);
    alert("✅ Đã xóa sản phẩm thành công!");
    refetch();
  } catch (err) {
    const status = err.response?.status;
    const message = err.response?.data?.message || "Xóa thất bại";

    // Nếu là lỗi 409 - sản phẩm đã từng được đặt
    if (status === 409) {
      alert(`⚠️ ${message}`);
    } else {
      alert(`❌ ${message}`);
    }
  }
};



  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Sản phẩm</h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
        >
          <FaPlus size={14} />
          <span>Thêm sản phẩm</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={closeForm}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
            >
              <IoClose size={35} />
            </button>

            <h2 className="text-xl font-semibold mb-4">
              {sanPhamDangSua ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
            </h2>

            {updateError && (
              <p className="text-red-500 mb-2">❌ {updateError}</p>
            )}

            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Tên sản phẩm" className="p-2 border rounded" value={formData.tensanpham || ""} onChange={(e) => setFormData({ ...formData, tensanpham: e.target.value })} />
              <input type="text" placeholder="Model" className="p-2 border rounded" value={formData.mamodel || ""} onChange={(e) => setFormData({ ...formData, mamodel: e.target.value })} />
              <input type="number" placeholder="Giá bán" className="p-2 border rounded" value={formData.giaban || ""} onChange={(e) => setFormData({ ...formData, giaban: e.target.value })} />
              <input type="text" placeholder="Ưu đãi" className="p-2 border rounded" value={formData.mauudai || ""} onChange={(e) => setFormData({ ...formData, mauudai: e.target.value })} />
              <input type="number" placeholder="Số lượng" className="p-2 border rounded" value={formData.soluong || ""} onChange={(e) => setFormData({ ...formData, soluong: e.target.value })} />
              <input type="text" placeholder="Link hình ảnh" className="p-2 border rounded col-span-2" value={formData.hinhanhchinh || ""} onChange={(e) => setFormData({ ...formData, hinhanhchinh: e.target.value })} />
              <textarea placeholder="Mô tả" className="p-2 border rounded col-span-2" value={formData.mota || ""} onChange={(e) => setFormData({ ...formData, mota: e.target.value })} />
              <label className="flex items-center gap-2 col-span-2">
                <input type="checkbox" checked={formData.bestseller} onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })} />
                <span>Sản phẩm bán chạy (Best Seller)</span>
              </label>
              <select
                className="p-2 border rounded col-span-2"
                value={formData.trangthai}
                onChange={(e) => setFormData({ ...formData, trangthai: e.target.value })}
              >
                <option value="">-- Chọn trạng thái --</option>
                <option value="dangban">Đang bán</option>
                <option value="ngungban">Ngừng bán</option>
                <option value="an">Ẩn</option>
              </select>
              <button
                type="submit"
                disabled={updating}
                className="col-span-2 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600 text-sm"
              >
                <FaSave />
                <span>{sanPhamDangSua ? "Cập nhật" : "Lưu"} sản phẩm</span>
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
                <th className="p-3">Trạng thái</th>
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
                    <td className="p-3">{Number(sp.giaban).toLocaleString()} VND</td>
                    <td className="p-3">
                      {sp.hinhanhchinh ? (
                        <img src={sp.hinhanhchinh} alt="ảnh sản phẩm" className="w-16 h-16 object-cover rounded" />
                      ) : (
                        <span className="text-gray-400 italic">Không ảnh</span>
                      )}
                    </td>
                    <td className="p-3">{new Date(sp.ngaytao).toLocaleDateString()}</td>
                    <td className="p-3">{sp.mauudai}</td>
                    <td className="p-3">{sp.soluong}</td>
                    <td className="p-3">{sp.bestseller ? <FiCheck className="text-gray-700" /> : <FiX className="text-gray-700" />}</td>
                    <td className="p-3 capitalize">{sp.trangthai || "?"}</td>
                    <td className="p-3">
                      <QuanlyButton onEdit={() => handleEdit(sp.masanpham)} onDelete={() => handleDelete(sp.masanpham)} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center text-gray-500 py-4">
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
