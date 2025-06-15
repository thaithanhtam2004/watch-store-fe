import { useState } from "react"
import Dashboard from "./Admin/Dashboard"
import Products from "./Admin/Products"
import WatchModels from "./Admin/Watchs"
import WatchCates from "./Admin/WatchCates"
// Tạm thời tạo các component nếu chưa có file

const Orders = () => <div>Trang quản lý đơn hàng</div>
const Users = () => <div>Trang quản lý người dùng</div>

const AdminPage = () => {
  const [page, setPage] = useState("dashboard")

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />
      case "products":
        return <Products />
      case "donghos":
        return <WatchModels />
      case "danhmucs":
        return <WatchCates />
      case "orders":
        return <Orders />
      case "users":
        return <Users />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h1 className="text-xl font-bold mb-6">Quản trị</h1>
        <ul className="space-y-3">
          <li><button onClick={() => setPage("dashboard")} className="w-full text-left hover:underline">📊 Dashboard</button></li>
          <li><button onClick={() => setPage("products")} className="w-full text-left hover:underline">🛍️ Sản phẩm</button></li>
           <li><button onClick={() => setPage("donghos")} className="w-full text-left hover:underline">🛍️ Đồng hồ</button></li>
           <li><button onClick={() => setPage("danhmucs")} className="w-full text-left hover:underline">🛍️ Danh mục đồng hồ</button></li>
          <li><button onClick={() => setPage("orders")} className="w-full text-left hover:underline">📦 Đơn hàng</button></li>
          <li><button onClick={() => setPage("users")} className="w-full text-left hover:underline">👤 Người dùng</button></li>
        </ul>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6 bg-gray-50">
        {renderPage()}
      </main>
    </div>
  )
}

export default AdminPage
