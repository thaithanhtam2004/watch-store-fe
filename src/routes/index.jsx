import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from '@/components/pages/HomePage';
import RegisterPage from '@/components/pages/RegisterPage';
import LoginPage from '@/components/pages/LoginPage';
import AdminPage from '@/components/pages/AdminPage';
import ProductDetail from '@/components/pages/ProductDetail';
import ProductLayout from '@/components/layouts/ProductLayout'; // Import tại đây

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/product" element={<ProductLayout />}>
      <Route path=":id" element={<ProductDetail />} />
    </Route>
  </Routes>
);

export default AppRoutes;