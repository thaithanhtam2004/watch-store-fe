export const QuantityAndCart = ({ quantity, setQuantity, onAddToCart }) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    –
                </button>
                <input
                    type="number"
                    value={quantity}
                    min="1"
                    onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-12 text-center border rounded"
                />
                <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                >
                    +
                </button>
            </div>
            <button
                onClick={onAddToCart}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded w-full md:w-auto"
            >
                Thêm vào giỏ hàng
            </button>
        </div>
    );
};

// ProductImageSlider.jsx
import React, { useState } from 'react';

export const ProductImageSlider = ({ mainImage, subImages }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
   const allImages = [mainImage, ...(subImages || [])];


    const next = () => setCurrentIndex((currentIndex + 1) % allImages.length);
    const prev = () => setCurrentIndex((currentIndex - 1 + allImages.length) % allImages.length);

    return (
        <div className="w-full max-w-[500px] mx-auto">
            {/* ẢNH CHÍNH */}
            <div className="relative">
                <img
                    src={allImages[currentIndex]}
                    alt="Hình sản phẩm"
                    className="w-full h-[350px] object-contain rounded shadow"
                />
                {/* Nút chuyển ảnh */}
                <button
                    onClick={prev}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                >←</button>
                <button
                    onClick={next}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full"
                >→</button>
            </div>

            {/* ẢNH PHỤ */}
            <div className="flex justify-center gap-2 mt-2">
                {allImages.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt={`thumb-${i}`}
                        onClick={() => setCurrentIndex(i)}
                        className={`w-16 h-16 object-cover border cursor-pointer rounded ${i === currentIndex ? 'border-orange-500' : 'border-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
};

export const ProductDetailsTable = ({ product }) => (
    <table className="w-full border border-gray-300 text-sm">
        <tbody>
            <tr className="border-b">
                <th className="text-left font-medium p-2 w-1/3 bg-gray-50">Chất liệu case</th>
                <td className="p-2 text-gray-700">{product.caseMaterial}</td>
            </tr>
            <tr className="border-b">
                <th className="text-left font-medium p-2 bg-gray-50">Chất liệu dây</th>
                <td className="p-2 text-gray-700">{product.strapMaterial}</td>
            </tr>
            <tr className="border-b">
                <th className="text-left font-medium p-2 bg-gray-50">Màu dây</th>
                <td className="p-2 text-gray-700">{product.strapColor}</td>
            </tr>
            <tr className="border-b">
                <th className="text-left font-medium p-2 bg-gray-50">Đường kính</th>
                <td className="p-2 text-gray-700">{product.diameter}</td>
            </tr>
            <tr className="border-b">
                <th className="text-left font-medium p-2 bg-gray-50">Độ dày mặt</th>
                <td className="p-2 text-gray-700">{product.thickness}</td>
            </tr>
            <tr className="border-b">
                <th className="text-left font-medium p-2 bg-gray-50">Chống nước</th>
                <td className="p-2 text-gray-700">{product.waterResistance}</td>
            </tr>
            <tr className="border-b">
                <th className="text-left font-medium p-2 bg-gray-50">Cấu tạo máy</th>
                <td className="p-2 text-gray-700">{product.movement}</td>
            </tr>
            <tr>
                <th className="text-left font-medium p-2 bg-gray-50">Màu mặt</th>
                <td className="p-2 text-gray-700">{product.dialColor}</td>
            </tr>
        </tbody>
    </table>
);
export const ProductExtraInfo = () => (
    <div className="mt-8 w-full space-y-6 text-sm text-gray-700">

        <div>
            <h2 className="text-xl font-bold mb-2">HƯỚNG DẪN BẢO QUẢN</h2>
            <ul className="list-disc pl-5 space-y-1">
                <li>Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.</li>
                <li>Không để sản phẩm tiếp xúc với nước, xăng, dầu, nhớt.</li>
                <li>Không để các vật nặng đè lên sản phẩm.</li>
                <li>Để sản phẩm tự khô ở nhiệt độ bình thường nếu bị ướt.</li>
                <li>Làm sạch sản phẩm bằng vải mềm hoặc bàn chải mềm.</li>
            </ul>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-2">CAM KẾT TỪ SHOP</h2>
            <ul className="list-disc pl-5 space-y-1">
                <li>Đây là gian hàng xách tay CHÍNH HÃNG, cam kết hàng Authentic 100%.</li>
                <li>Quý khách nhận hàng, kiểm tra rồi mới thanh toán.</li>
                <li>1 ĐỔI 1 trong vòng 24h kể từ khi nhận hàng nếu có lỗi của nhà sản xuất.</li>
                <li>Hỗ trợ phí vận chuyển toàn quốc khi đặt hàng qua Website.</li>
                <li>Liên hệ qua Hotline: <b>038.555.2843</b> để nhận hàng nhanh.</li>
            </ul>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-2">LƯU Ý</h2>
            <ul className="list-disc pl-5 space-y-1">
                <li>Hình ảnh shop tự chụp kèm Nametag Shop Daniel Watch SG.</li>
                <li>Có thể ghé ngay 86/23C Thích Quảng Đức, Phường 5, Phú Nhuận, HCM.</li>
                <li>Hoặc 73 Trần Hữu Tước, Nam Đồng, Đống Đa, Hà Nội để mua hàng trực tiếp.</li>
            </ul>
        </div>

        <div>
            <h2 className="text-xl font-bold mb-2">CHẾ ĐỘ BẢO HÀNH</h2>
            <ul className="list-disc pl-5 space-y-1">
                <li>Bảo hành 02 năm cho máy và 02 năm cho pin.</li>
                <li>Không bảo hành nếu hư hỏng do thiên tai, bất cẩn hoặc sử dụng sai hướng dẫn.</li>
                <li>Không bảo hành nếu sửa chữa tại nơi không phải TTBH Daniel Watch SG.</li>
            </ul>
        </div>

        <p className="font-bold mt-4">Với châm ngôn “UY TÍN TẠO NÊN THƯƠNG HIỆU”, chúng tôi luôn cố gắng mang đến dịch vụ tốt nhất!</p>
        <p className="font-bold">Chúng tôi hân hạnh được phục vụ bạn!</p>

    </div>
);

