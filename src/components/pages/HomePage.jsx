// src/pages/HomePage.jsx
import React from "react";
import Header from "@/components/layouts/Header";
import {
  HeroBanner,
  CategoryGrid,
  ServicesBar,
  ProductSection,
  PromoBanner,
  Newsletter,
} from "@/components/elements/CommonElements";

import Footer from "@/components/layouts/Footer";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Header />
      <HeroBanner />
      <CategoryGrid />
      <ServicesBar />
      <ProductSection title="BÁN CHẠY" type="best-sellers" />
      <ProductSection title="PHỤ KIỆN" type="accessories" />
      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;
