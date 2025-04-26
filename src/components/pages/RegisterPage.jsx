// RegisterPage.js
import React, { useState } from "react";
import { InputField, SubmitButton, LoginLink } from  "@/components/elements/RegisterElement";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
        fullname: "",
        phonenumber: "",
        address: "",
      });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();  // Ngừng hành động mặc định (ngừng việc reload trang)
  
    try {
      // Gửi yêu cầu POST đến backend
      const response = await fetch("http://localhost:8080/watch_aura/authen/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // Gửi dữ liệu từ form (formData)
        credentials: "include",  // Nếu cần gửi cookie hoặc thông tin xác thực
      });
  
      const data = await response.json();  // Đọc dữ liệu phản hồi từ backend
  
      // Kiểm tra xem backend có trả về thông báo thành công hay lỗi
      if (response.ok) {
        console.log("Đăng ký thành công:", data.message);  // Lấy thông báo thành công từ backend
        alert(data.message); // Hiển thị thông báo thành công cho người dùng
      } else {
        console.error("Lỗi đăng ký:", data.message);  // Lấy thông báo lỗi từ backend
        alert(data.message); // Hiển thị thông báo lỗi cho người dùng
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      alert("Có lỗi xảy ra khi kết nối với server.");
    }
  };
  
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-black mb-4">WatchAura</h2>
        <p className="text-center text-black text-lg mb-4">Đăng ký</p>
        <form onSubmit={handleSubmit} className="space-y-4">
  <InputField
    type="text"
    name="username"
    placeholder="Tên đăng nhập"
    value={formData.username}
    onChange={handleChange}
    required
  />
  <InputField
    type="password"
    name="password"
    placeholder="Mật khẩu"
    value={formData.password}
    onChange={handleChange}
    required
  />
  <InputField
    type="email"
    name="email"
    placeholder="Email"
    value={formData.email}
    onChange={handleChange}
    required
  />
  <InputField
    type="text"
    name="fullname"
    placeholder="Họ và tên"
    value={formData.fullname}
    onChange={handleChange}
    required
  />
  <InputField
    type="tel"
    name="phonenumber"
    placeholder="Số điện thoại"
    value={formData.phonenumber}
    onChange={handleChange}
    required
  />
  <InputField
    type="text"
    name="address"
    placeholder="Địa chỉ"
    value={formData.address}
    onChange={handleChange}
    required
  />
  <SubmitButton text="Đăng Ký" onSubmit={handleSubmit} />
</form>

        <LoginLink />
      </div>
    </div>
  );
};

export default RegisterPage;
