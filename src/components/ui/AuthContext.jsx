import React, { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (err) {
      console.error("Lỗi khi decode token:", err);
      setUser(null);
    }
  };

  // Load user nếu đã login trước đó (token còn trong localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) login(token);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook để dùng context ở các component khác
export const useAuth = () => useContext(AuthContext);
