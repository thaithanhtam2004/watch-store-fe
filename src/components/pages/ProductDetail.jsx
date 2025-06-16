import React, { useState } from 'react';
import { Header, Footer } from '../layouts/main.layout';
import {
    ProductImageSlider,
    ProductDetailsTable,
    ProductExtraInfo,
    QuantityAndCart
} from '../elements/ProductElements';
import { mockProductList } from '../../mockData'; // Import mockProductList
import RelatedProducts from '../elements/RelatedProducts';

// Giả sử lấy sản phẩm đầu tiên từ mockProductList làm sản phẩm hiện tại
const ProductPage = () => {
    const [quantity, setQuantity] = useState(1);
    const product = mockProductList[0]; // Lấy sản phẩm đầu tiên, bạn có thể thay bằng ID cụ thể

    const handleAddToCart = () => {
        console.log(`Thêm ${quantity} sản phẩm vào giỏ: ${product.name}`);
    };

    return (
        <>
            <Header />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto px-4 py-8">
                {/* Cột trái: Ảnh + bảng */}
                <div className="flex flex-col items-start space-y-6">
                    <ProductImageSlider
                        mainImage={product.mainImage}
                        subImages={product.subImages}
                    />
                    <ProductDetailsTable product={product} />
                </div>

                {/* Cột phải: Thông tin, chọn số lượng, ghi chú */}
                <div className="space-y-4">
                    <h1 className="text-3xl font-bold">{product.name}</h1>
                    <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded text-sm">
                        Size: {product.size}
                    </span>

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
            <RelatedProducts products={mockProductList} /> {/* Truyền mockProductList */}
            <Footer />
        </>
    );
};

export default ProductPage;