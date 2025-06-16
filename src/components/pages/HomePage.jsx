// src/pages/HomePage.jsx
import React from "react";
import { Header, Footer } from "../layouts/main.layout";

import {
  HeroBanner,
  CategoryGrid,
  ServicesBar,
  ProductSection,
  PromoBanner,
  Newsletter,
} from "@/components/elements/CommonElements";

const HomePage = () => {
  return (
    <div className="font-sans">
      <Header />
      <HeroBanner />
      <CategoryGrid />
      <ServicesBar />

      {/* Các section sản phẩm */}
      <ProductSection title="BÁN CHẠY" type="bestseller" />

      <PromoBanner />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default HomePage;