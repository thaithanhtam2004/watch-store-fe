import { useState } from "react";
import {
  FaTachometerAlt,
  FaUser,
  FaBoxOpen,
  FaClock,
  FaThLarge,
  FaWarehouse,
  FaGift,
  FaClipboardList,
  FaUsers,
  FaHome
} from "react-icons/fa";

import Dashboard from "./Admin/Dashboard";
import Products from "./Admin/Products";
import WatchModels from "./Admin/Watchs";
import WatchCates from "./Admin/WatchCates";
import UuDaiVaPhuongThucThanhToan from "./Admin/UuDaiVaPhuongThucThanhToanList";
import KhoHang from "./Admin/KhoHang";
import NguoiDung from "./Admin/NguoiDung";
import HomePage from "../../routes/index"
import { useNavigate } from "react-router-dom";

// Trang tạm thời
const Orders = () => <div>Trang quản lý đơn hàng</div>;
const Users = () => <div>Trang quản lý tài khoản</div>;

const AdminPage = () => {
  const [page, setPage] = useState("dashboard");
const navigate = useNavigate();
  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <FaTachometerAlt />,
      component: <Dashboard />,
    },
    {
      key: "nguoidungs",
      label: "Người dùng",
      icon: <FaUser />,
      component: <NguoiDung />,
    },
    {
      key: "products",
      label: "Sản phẩm",
      icon: <FaBoxOpen />,
      component: <Products />,
    },
    {
      key: "donghos",
      label: "Đồng hồ",
      icon: <FaClock />,
      component: <WatchModels />,
    },
    {
      key: "danhmucs",
      label: "Danh mục",
      icon: <FaThLarge />,
      component: <WatchCates />,
    },
    
    {
      key: "uudaivaphuongthucthanhtoans",
      label: "Ưu đãi & thanh toán",
      icon: <FaGift />,
      component: <UuDaiVaPhuongThucThanhToan />,
    },

        {
      key: "trangchu",
      label: "Trang chủ",
      icon: <FaHome />,
    
    },

  ];

  const renderPage = () => {
    const current = menuItems.find((item) => item.key === page);
    return current?.component || <Dashboard />;
  };

  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <h1 className="text-2xl font-bold mb-6 tracking-wide">QUẢN TRỊ</h1>
        <ul className="space-y-3">
          {menuItems.map((item) => (
            <li key={item.key}>
             <button
                onClick={() => {
                  if (item.key === "trangchu") {
                    navigate("/"); // 👉 chuyển sang trang chủ
                  } else {
                    setPage(item.key); // các mục admin khác
                  }
                }}
                className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded hover:bg-gray-700 transition ${
                  page === item.key ? "bg-gray-700 font-semibold" : ""
                }`}
>
  <span>{item.icon}</span>
  <span>{item.label}</span>
</button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {renderPage()}
      </main>
    </div>
  );
};

export default AdminPage;
