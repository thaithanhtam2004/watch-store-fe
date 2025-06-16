import React from 'react';
import { mockProductList } from '../../mockData';

const RelatedProducts = () => {
    const products = mockProductList.slice(0, 4); // chỉ lấy 4 sản phẩm đầu

    return (
        <section className="py-8">
            <h3 className="text-xl font-bold mb-4">SẢN PHẨM TƯƠNG TỰ</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                    <li
                        key={product.id}
                        className="border rounded shadow-sm hover:shadow-md transition p-3"
                    >
                        <a href={`/product/${product.id}`} className="block text-center">
                            <img
                                src={product.mainImage}
                                alt={product.name}
                                className="w-full h-52 object-cover mb-2 rounded"
                            />
                            <p className="text-orange-600 font-semibold">{product.price}</p>
                            <h2 className="text-sm font-medium mb-2">{product.name}</h2>
                            <button
                                onClick={() => window.location.href = `/product/${product.id}`}
                                className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
                            >
                                Mua ngay
                            </button>
                        </a>
                    </li>
                ))}
            </ul>
        </section>
    );
};

export default RelatedProducts;
