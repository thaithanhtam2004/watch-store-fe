import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Dùng Link thay cho <a>

const RelatedProducts = ({ currentProductId }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/sanphams")
      .then((res) => {
        if (res.data.success) {
          const filtered = res.data.data
            .filter((p) => p.masanpham !== currentProductId)
            .slice(0, 4);
          setProducts(filtered);
        }
      })
      .catch(console.error);
  }, [currentProductId]);

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h3 className="text-xl sm:text-2xl font-semibold mb-8 text-center text-gray-800 uppercase tracking-wider">
        Sản phẩm tương tự
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.masanpham}
            to={`/product/${product.masanpham}`}
            className="group bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden flex flex-col"
          >
            <img
              src={product.hinhanhchinh || "/fallback.jpg"}
              alt={product.tensanpham}
              className="w-full h-52 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-sm sm:text-base font-medium text-gray-800 truncate mb-1">
                {product.tensanpham}
              </h2>
              <p className="text-red-600 font-bold text-base sm:text-lg">
                {Number(product.giaban).toLocaleString("vi-VN")} ₫
              </p>

              <button
                className="mt-auto w-full bg-gray-900 text-white py-2 rounded-lg hover:bg-gray-700 text-sm"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Thêm vào giỏ
              </button>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
