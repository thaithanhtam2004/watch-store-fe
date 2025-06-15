import { useEffect, useState } from "react"

export default function Products() {
  const [products, setProducts] = useState([])

  // Giả lập dữ liệu
  useEffect(() => {
    const data = [
      {
        masanpham: "SP001",
        tensanpham: "Casio MTP-V002L-1B3UDF",
        mamodel: "M001",
        mota: "Thiết kế cổ điển, dây da cao cấp",
        giaban: 1250000,
        hinhanhchinh: "/images/sp1.jpg",
        ngaytao: "2025-06-01",
        mauudai: "UD01",
        soluong: 15,
        bestseller: true,
      },
      {
        masanpham: "SP002",
        tensanpham: "Citizen BI5000-87L",
        mamodel: "M002",
        mota: "Mặt xanh navy, chống nước tốt",
        giaban: 2450000,
        hinhanhchinh: "/images/sp2.jpg",
        ngaytao: "2025-06-10",
        mauudai: null,
        soluong: 8,
        bestseller: false,
      }
    ]
    setProducts(data)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Quản lý sản phẩm</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border rounded shadow bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">Hình</th>
              <th className="p-3">Mã SP</th>
              <th className="p-3">Tên sản phẩm</th>
              <th className="p-3">Model</th>
              <th className="p-3">Mô tả</th>
              <th className="p-3">Giá bán</th>
              <th className="p-3">Ưu đãi</th>
              <th className="p-3">Số lượng</th>
              <th className="p-3">Bán chạy</th>
              <th className="p-3">Ngày tạo</th>
            </tr>
          </thead>
          <tbody>
            {products.map(sp => (
              <tr key={sp.masanpham} className="border-t hover:bg-gray-50">
                <td className="p-3">
                  <img src={sp.hinhanhchinh} alt={sp.tensanpham} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3">{sp.masanpham}</td>
                <td className="p-3">{sp.tensanpham}</td>
                <td className="p-3">{sp.mamodel}</td>
                <td className="p-3">{sp.mota ?? "—"}</td>
                <td className="p-3">{sp.giaban.toLocaleString()}₫</td>
                <td className="p-3">{sp.mauudai ?? "Không có"}</td>
                <td className="p-3">{sp.soluong}</td>
                <td className="p-3">{sp.bestseller ? "✅" : "❌"}</td>
                <td className="p-3">{new Date(sp.ngaytao).toLocaleDateString("vi-VN")}</td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="10" className="text-center text-gray-500 py-4">Không có sản phẩm</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
