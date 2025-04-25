import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "@/components/pages/HomePage";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    {/* Thêm các route khác ở đây nếu cần */}
  </Routes>
);

export default AppRoutes;
