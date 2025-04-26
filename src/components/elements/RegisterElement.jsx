// RegisterElement.js
import React from "react";

// Input element
export const InputField = ({ type, name, placeholder, value, onChange, required }) => (
  <input
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
);

// Button element
export const SubmitButton = ({ text }) => (
  <button
    type="submit"
    className="w-full bg-black text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
  >
    {text}
  </button>
);

// Link element for login redirection
export const LoginLink = () => (
  <div className="text-center mt-4">
    <a href="/login" className="text-black hover:underline">
      Đã có tài khoản? Đăng nhập
    </a>
  </div>
);
