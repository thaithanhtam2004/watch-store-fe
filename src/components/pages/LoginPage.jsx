import React, { useState } from "react";
import { useLogin } from "../../hooks/useLogin"; // chỉnh đường dẫn đúng

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, loading, error, user } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  return (
    <div
      className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/images/bg.jpg')" }}
    >
      <div className="bg-white p-10 w-80 text-center shadow-md rounded">
        <h2 className="text-lg font-bold tracking-widest mb-2">WatchAura</h2>
        <p className="text-sm text-gray-600 mb-5">Đăng nhập</p>

        {user && (
          <p className="text-green-600 mb-4">Đăng nhập thành công! Chào mừng {user.email}</p>
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
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="mt-4 text-xs text-gray-600">
          <a href="register.html" className="hover:underline">
            Chưa có tài khoản? Đăng ký
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     // Giả lập đăng nhập đơn giản
//     setTimeout(() => {
//       alert(`Đăng nhập với:\nEmail: ${email}\nPassword: ${password}`);
//       setLoading(false);
//     }, 1000);
//   };

//   return (
//     <div
//       className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: "url('/images/bg.jpg')" }}
//     >
//       <div className="bg-white p-10 w-80 text-center shadow-md rounded">
//         <h2 className="text-lg font-bold tracking-widest mb-2">WatchAura</h2>
//         <p className="text-sm text-gray-600 mb-5">Đăng nhập</p>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
//           />
//           <input
//             type="password"
//             name="password"
//             placeholder="Mật khẩu"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="w-full p-2 mb-4 border border-gray-300 rounded text-sm focus:outline-none focus:border-black"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className={`w-full py-3 rounded text-sm text-white ${
//               loading ? "bg-gray-600 cursor-not-allowed" : "bg-black hover:bg-gray-800"
//             } transition`}
//           >
//             {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
//           </button>
//         </form>

//         <div className="mt-4 text-xs text-gray-600">
//           <Link to="/register" className="hover:underline">
//             Chưa có tài khoản? Đăng ký
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
