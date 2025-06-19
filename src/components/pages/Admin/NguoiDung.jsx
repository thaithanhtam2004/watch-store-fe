import { useNguoiDungList } from "../../../hooks/useNguoiDungList";
import QuanlyButton from "../../ui/quanlyButton";

export default function NguoiDungList() {
  const { data: users, loading, error } = useNguoiDungList();
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý Người dùng</h1>

      {loading && <p className="text-gray-500">Đang tải dữ liệu...</p>}
      {error && <p className="text-red-500">Lỗi: {error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto max-h-[500px] overflow-y-auto border rounded shadow">
          <table className="table-auto w-full text-left bg-white text-sm">
            <thead className="bg-gray-100 sticky top-0 z-10">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Email</th>
                <th className="p-3">Họ tên</th>
                <th className="p-3">SĐT</th>
                <th className="p-3">Vai trò</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{user.id}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.hoten || "-"}</td>
                    <td className="p-3">{user.sodienthoai || "-"}</td>
                    <td className="p-3">{user.vaitro || "user"}</td>
                    <td className="p-3"></td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    Không có người dùng
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
