import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../utils/AuthContext";
import { FaUserCircle } from "react-icons/fa";
// HEADER
export const Header = () => {
  const { user, logout } = useAuth();
  return (
    <>
      {/* Header chính */}
      <header className="bg-gray-200 py-4 px-4 sm:px-8 flex items-center justify-between relative shadow">
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={logout}
                className="flex items-center border border-black text-black px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
              >
                <span className="text-sm font-semibold mr-2">Log out</span>
                <FaUserCircle className="text-xl" />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center border border-black text-black px-3 py-1 rounded-full hover:bg-black hover:text-white transition"
            >
              <span className="text-sm font-semibold mr-2">Sign in</span>
              <FaUserCircle className="text-xl" />
            </Link>
          )}
        </div>

        {/* Logo trung tâm */}
        <div className="text-2xl font-bold tracking-widest text-gray-900 text-center absolute left-1/2 transform -translate-x-1/2">
          WATCH AURA
        </div>

        {/* Bên phải: Giỏ hàng */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            GIỎ HÀNG / 0
          </span>
          <img src="/giohang.png" alt="Cart" className="w-6 h-6" />
        </div>
      </header>
      {/* Navigation */}
      <nav className="bg-white flex flex-wrap justify-center gap-4 sm:gap-6 border-b py-3 text-sm sm:text-base font-semibold uppercase text-gray-800">
        <Link to="/" className="hover:underline hover:text-gray-600 transition">
          Trang chủ
        </Link>
        <Link
          to="/bestseller"
          className="hover:underline hover:text-gray-600 transition"
        >
          Best Seller
        </Link>
        <Link
          to="/donghonam"
          className="hover:underline hover:text-gray-600 transition"
        >
          Đồng hồ nam
        </Link>
        <Link
          to="/donghonu"
          className="hover:underline hover:text-gray-600 transition"
        >
          Đồng hồ nữ
        </Link>
      </nav>
    </>
  );
};
// FOOTER
export const Footer = () => (
  <>
    <footer className="bg-gray-100 text-sm sm:text-base px-4 sm:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-gray-800">
      <div>
        <h4 className="font-bold mb-2 text-gray-900">CỬA HÀNG</h4>
        <p>- Hotline: 0387438272</p>
        <p>- STORE: 97 Man Thiện, Hiệp Phú, TP.Thủ Đức</p>
      </div>
      <div>
        <h4 className="font-bold mb-2 text-gray-900">KẾT NỐI</h4>
        <p>- Fanpage: WATCH AURA SG</p>
        <p>- Instagram: watchaura.store</p>
        <p>- Zalo: WatchAura</p>
      </div>
      <div>
        <h4 className="font-bold mb-2 text-gray-900">VẬN CHUYỂN</h4>
        <p>- Ship COD toàn quốc, kiểm tra hàng trước</p>
        <p>- 1–4 ngày, nội thành tối đa 60 phút</p>
      </div>
      <div>
        <h4 className="font-bold mb-2 text-gray-900">ĐỊA CHỈ</h4>
        <p>- 97 Man Thiện, Hiệp Phú, TP.Thủ Đức</p>
      </div>
    </footer>

    {/* Google Map */}
    <div className="w-full px-4 sm:px-8 my-4 flex justify-center">
      <div className="w-full sm:w-3/4 md:w-2/3 h-[350px] overflow-hidden rounded-lg shadow">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125392.64452638739!2d106.6424691433594!3d10.847987000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1745594433789!5m2!1svi!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map Location"
        />
      </div>
    </div>

    {/* Copyright */}
    <div className="bg-gray-800 text-white text-center text-xs py-3">
      © 2025 WATCH AURA — All rights reserved.
    </div>
  </>
);
