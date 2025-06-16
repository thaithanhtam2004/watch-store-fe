import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";
import RegisterPage from "@/components/pages/RegisterPage";
import LoginPage from "@/components/pages/LoginPage";
import AdminPage from "../components/pages/AdminPage";
import BestsellerPage from "@/components/pages/BestsellerPage";
import DongHoNamPage from "@/components/pages/DongHoNamPage";
import DongHoNuPage from "@/components/pages/DongHoNuPage";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/bestseller" element={<BestsellerPage />} />
    <Route path="/donghonam" element={<DongHoNamPage />} />
    <Route path="/donghonu" element={<DongHoNuPage />} />
    {/* Thêm các route khác ở đây nếu cần */}
  </Routes>
);

export default AppRoutes;
