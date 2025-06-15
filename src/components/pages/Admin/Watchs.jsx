import { useDongHoList } from '../../../hooks/useDongHoList'; // Đảm bảo đúng path

export default function WatchModels() {
  const { data: models, loading, error } = useDongHoList(); // dùng hook ở đây

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Model Đồng hồ</h1>

      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border rounded shadow bg-white text-sm">
            <thead className="bg-gray-100">
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
