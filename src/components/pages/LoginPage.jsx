import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/UseLogin";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, user } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-white p-10 w-80 text-center shadow-md rounded">
        <h2 className="text-lg font-bold tracking-widest mb-2">WatchAura</h2>
        <p className="text-sm text-gray-600 mb-5">Đăng nhập</p>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
          />
          <input
            type="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded text-sm text-white ${
              loading
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-black hover:bg-gray-800"
            } transition`}
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-600">
          <a href="/register" className="hover:underline">
            Chưa có tài khoản? Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
