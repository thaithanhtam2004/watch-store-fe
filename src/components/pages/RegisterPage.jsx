import React, { useState } from "react";
import { useRegister } from "../../hooks/UseRegister"; 
import { Link } from "react-router-dom";// chỉnh đường dẫn đúng
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { register, loading, error, user } = useRegister();

  const handleSubmit = async (e) => {
    e.preventDefault(); // ngăn form submit reload trang
    await register(email, password);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-white p-10 w-80 text-center shadow-md rounded">
        <h2 className="text-lg font-bold tracking-widest mb-2">WatchAura</h2>
        <p className="text-sm text-gray-600 mb-5">Đăng ký</p>

        {user && (
          <p className="text-green-600 mb-4">Đăng ký thành công! Chào mừng {user.email}</p>
        )}

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-sm text-white ${
              loading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-800"
            } transition`}
          >
            {loading ? "Đang đăng ký..." : "Đăng Ký"}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-600">
         <button onClick={()=> navigate("/login")} className="text-xs text-gray-600 hover:underline" >
            Đã có tài khoản? Đăng nhập
         </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
