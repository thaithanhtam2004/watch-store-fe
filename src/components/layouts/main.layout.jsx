import React from "react";

// HEADER
export const Header = () => (
  <>
    <div className="bg-gray-800 text-white text-center py-2 text-sm">
      Nhập mã QUATANG giảm ngay 15%
    </div>

    <header className="bg-gray-200 py-4 px-6 relative flex justify-center  items-center">
      {/* Giỏ hàng + icon bên trái */}
      <div className="absolute right-6 flex items-center gap-2">
        <span className="text-sm">GIỎ HÀNG / 0</span>
        <img src="/giohang.png" alt="Cart" className="w-6 h-6" />
      </div>

      {/* Logo giữa */}
      <div className="text-2xl  font-bold tracking-widest">WATCH AURA</div>
    </header>

    <nav className="flex justify-center space-x-6 border-b py-2 text-xl uppercase">
      <a href="#">Best Seller</a>
      <a href="#">Đồng Hồ Nam</a>
      <a href="#">Đồng Hồ Nữ</a>
    </nav>
  </>
);

// FOOTER
export const Footer = () => (
  <>
    <footer className="bg-gray-100 text-xl px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-4">
      <div>
        <strong>CỬA HÀNG</strong>
        <p>- Hotline: 0387438272</p>
        <p>- STORE : 97 Man Thiện, phường Hiệp Phú, TP.Thủ Đức, TP.HCM</p>
      </div>
      <div>
        <strong>FACEBOOK – INSTA – ZALO</strong>
        <p>- Fanpage: WATCH AURA SG</p>
        <p>- Instagram: watchaura.store</p>
      </div>
      <div>
        <strong>THÔNG TIN VẬN CHUYỂN</strong>
        <p>- Shipcod toàn quốc và được kiểm tra hàng.</p>
        <p>- Thời gian vận chuyển: 1-4 ngày hoặc tối đa 30 - 60 phút.</p>
      </div>
      <div>
        <strong>ĐỊA CHỈ</strong>
        <p>- STORE : 97 Man Thiện, phường Hiệp PhúPhú TP.Thủ Đức, TP.HCM</p>
      </div>
    </footer>

    <div className="w-full my-6 flex justify-start">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125392.64452638739!2d106.6424691433594!3d10.847987000000005!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752772b245dff1%3A0xb838977f3d419d!2zSOG7jWMgdmnhu4duIEPDtG5nIG5naOG7hyBCxrB1IENow61uaCBWaeG7hW4gVGjDtG5nIGPGoSBz4bufIHThuqFpIFRQLkhDTQ!5e0!3m2!1svi!2s!4v1745594433789!5m2!1svi!2s"
        width="50%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map Location"
      />
    </div>

    <div className="bg-gray-800 text-white text-center text-xs py-2">
      Copyright 2025 © PT
    </div>
  </>
);