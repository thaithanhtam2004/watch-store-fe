import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import RegisterPage from "@/components/pages/RegisterPage";
import LoginPage  from "@/components/pages/LoginPage";
import AdminPage  from "../components/pages/AdminPage";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
     <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
    {/* Thêm các route khác ở đây nếu cần */}
  </Routes>
);

export default AppRoutes;
