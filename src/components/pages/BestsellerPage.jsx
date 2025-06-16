import React, { useEffect, useState } from "react";
import { getBestsellerProducts } from "@/services/sanphamService";
import { Header, Footer } from "../layouts/main.layout";

const PRODUCTS_PER_PAGE = 9;

const BestsellerPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getBestsellerProducts().then(setProducts).catch(console.error);
  }, []);

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);

  const currentProducts = products.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  const changePage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <div className="px-4 md:px-12 lg:px-24 py-8 min-h-screen">
        <h2 className="text-3xl font-bold text-center mb-8 uppercase tracking-wide">
          Best Seller
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(currentProducts) && currentProducts.length > 0 ? (
            currentProducts.map((product) => (
              <div
                key={product.masanpham}
                className="bg-white rounded-xl shadow hover:shadow-xl transition duration-300 group overflow-hidden"
              >
                <img
                  src={product.hinhanhchinh || "/fallback.jpg"}
                  alt={product.tensanpham || "Đồng hồ"}
                  className="w-full h-60 object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 truncate">
                    {product.tensanpham || "Tên sản phẩm"}
                  </h2>
                  <p className="text-red-600 text-xl font-bold mt-1">
                    {product.giaban
                      ? Number(product.giaban).toLocaleString() + " ₫"
                      : "Giá đang cập nhật"}
                  </p>
                  <button className="mt-3 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition">
                    Thêm vào giỏ
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              Không có sản phẩm nào.
            </p>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 space-x-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
            >
              &lt;
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => changePage(i + 1)}
                className={`w-8 h-8 rounded-full border text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-gray-800 text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-gray-200"
            >
              &gt;
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default BestsellerPage;
