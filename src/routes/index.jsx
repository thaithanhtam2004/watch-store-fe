import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import RegisterPage from "@/components/pages/RegisterPage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
     <Route path="/register" element={<RegisterPage />} />
    {/* Thêm các route khác ở đây nếu cần */}
  </Routes>
);

export default AppRoutes;
