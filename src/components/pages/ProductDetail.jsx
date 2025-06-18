import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Header, Footer } from "../layouts/main.layout";
import {
  ProductImageSlider,
  ProductDetailsTable,
  ProductExtraInfo,
  QuantityAndCart,
} from "../elements/ProductElements";
import { useSanPhamDetail } from "@/hooks/useSanPhamDetail";
import RelatedProducts from "../elements/RelatedProducts";
import { useAuth } from "@/utils/AuthContext";
import { themVaoGioHang } from "@/services/giohangService";
const ProductPage = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const { data: product, loading, error } = useSanPhamDetail(id);

  const handleAddToCart = async () => {
    if (!user) {
      alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng.");
      return;
    }

    try {
      await themVaoGioHang({
        mataikhoan: user.id,
        masanpham: product.masanpham,
        soluong: quantity,
      });

      window.dispatchEvent(new Event("cart-updated"));
      alert("Đã thêm vào giỏ hàng!");
    } catch (error) {
      console.error("Lỗi khi thêm vào giỏ:", error);
      alert("Không thể thêm vào giỏ hàng.");
    }
  };

  if (loading)
    return <div className="text-center py-20">Đang tải sản phẩm...</div>;
  if (error)
    return (
      <div className="text-center text-red-500 py-20">
        {error.message || "Đã xảy ra lỗi."}
      </div>
    );
  if (!product) return null;

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-start space-y-6">
          <ProductImageSlider
            mainImage={product.hinhanhchinh}
            subImages={product.hinhanhphu}
          />
          <ProductDetailsTable
            product={{
              caseMaterial: product.chatlieuvo,
              strapMaterial: product.chatlieuday,
              strapColor: product.mauday,
              diameter: product.duongkinh,
              thickness: product.doday,
              waterResistance: product.chongnuoc,
              movement: product.dongco,
              dialColor: product.mausomatso,
            }}
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.tensanpham}</h1>

          {/* Giá đơn giản, chữ đen, không có nền hoặc border */}
          <div className="text-xl font-semibold text-black">
            {product.giaban?.toLocaleString("vi-VN")} đ
          </div>

          <QuantityAndCart
            quantity={quantity}
            setQuantity={setQuantity}
            onAddToCart={handleAddToCart}
          />

          <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
            <li>Kiểm tra sản phẩm ngay khi nhận hàng.</li>
            <li>Không nhận hàng nếu bao bì bị rách hoặc có dấu hiệu mở.</li>
            <li>Có quyền từ chối nhận hàng nếu sản phẩm không đúng mô tả.</li>
          </ul>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <ProductExtraInfo />
      </div>

      <RelatedProducts products={[]} />

      <Footer />
    </>
  );
};

export default ProductPage;
