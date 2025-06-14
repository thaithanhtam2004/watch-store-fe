import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import RegisterPage from "@/components/pages/RegisterPage";
import LoginPage  from "@/components/pages/LoginPage";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
     <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    {/* Thêm các route khác ở đây nếu cần */}
  </Routes>
);

export default AppRoutes;
