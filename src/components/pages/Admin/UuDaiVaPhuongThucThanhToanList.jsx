import { useState } from "react";
import QuanlyButton from "../../ui/quanlyButton";
import { useUuDaiList } from "../../../hooks/useUuDaiList";
import { usePhuongThucList } from "../../../hooks/usePhuongThucList";

export default function UuDaiVaPhuongThucThanhToanList() {
  const [showFormUuDai, setShowFormUuDai] = useState(false);
  const [showFormPTTT, setShowFormPTTT] = useState(false);

  const {
    data: uudaiList,
    loading: loadingUuDai,
    error: errorUuDai,
  } = useUuDaiList();
  const {
    data: ptttList,
    loading: loadingPTTT,
    error: errorPTTT,
  } = usePhuongThucList();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* === Ưu đãi === */}
      <div>
        <h2 className="text-xl font-bold mb-4">Quản lý Ưu đãi</h2>
        <div className="flex justify-end mb-2">
          <button
            onClick={() => setShowFormUuDai(true)}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            ➕ Thêm ưu đãi
          </button>
        </div>

        {showFormUuDai && (
          <div className="bg-white p-4 rounded shadow border mb-4">
            <form className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Mã ưu đãi"
                className="p-2 border rounded"
              />
              <input
                type="number"
                step="0.01"
                placeholder="% Giảm giá"
                className="p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Ngày bắt đầu"
                className="p-2 border rounded"
              />
              <input
                type="date"
                placeholder="Ngày kết thúc"
                className="p-2 border rounded"
              />
              <select className="p-2 border rounded col-span-2">
                <option value="hoatdong">Hoạt động</option>
                <option value="hethan">Hết hạn</option>
                <option value="khonghoatdong">Không hoạt động</option>
              </select>
              <button
                type="submit"
                className="col-span-2 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
              >
                💾 Lưu ưu đãi
              </button>
            </form>
          </div>
        )}

        {loadingUuDai ? (
          <p>Đang tải danh sách ưu đãi...</p>
        ) : errorUuDai ? (
          <p className="text-red-500">Lỗi: {errorUuDai}</p>
        ) : (
          <table className="table-auto w-full text-sm border rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Mã</th>
                <th className="p-2">% Giảm</th>
                <th className="p-2">Bắt đầu</th>
                <th className="p-2">Kết thúc</th>
                <th className="p-2">Trạng thái</th>
                <th className="p-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {uudaiList.map((ud) => (
                <tr key={ud.mauudai} className="border-t">
                  <td className="p-2">{ud.mauudai}</td>
                  <td className="p-2">{ud.phantramgiam}%</td>
                  <td className="p-2">
                    {new Date(ud.ngaybatdau).toLocaleDateString()}
                  </td>
                  <td className="p-2">
                    {new Date(ud.ngayketthuc).toLocaleDateString()}
                  </td>
                  <td className="p-2">{ud.trangthai}</td>
                  <td className="p-2">
                    <QuanlyButton onEdit={() => {}} onDelete={() => {}} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* === Phương thức thanh toán === */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Quản lý Phương thức thanh toán
        </h2>
        {loadingPTTT ? (
          <p>Đang tải danh sách PTTT...</p>
        ) : errorPTTT ? (
          <p className="text-red-500">Lỗi: {errorPTTT}</p>
        ) : (
          <table className="table-auto w-full text-sm border rounded shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Mã</th>
                <th className="p-2">Tên phương thức</th>
              </tr>
            </thead>
            <tbody>
              {ptttList.map((pt) => (
                <tr key={pt.maphuongthuc} className="border-t">
                  <td className="p-2">{pt.maphuongthuc}</td>
                  <td className="p-2">{pt.tenphuongthuc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
