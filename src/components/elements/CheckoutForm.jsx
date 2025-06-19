const CheckoutForm = ({ form, setForm }) => {
  return (
    <div className="w-full max-w-xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      <h2 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800">
        Thông tin giao hàng
      </h2>

      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Họ tên"
        value={form.hoten}
        onChange={(e) => setForm({ ...form, hoten: e.target.value })}
      />

      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Địa chỉ"
        value={form.diachi}
        onChange={(e) => setForm({ ...form, diachi: e.target.value })}
      />

      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Số điện thoại"
        value={form.sodienthoai}
        onChange={(e) => setForm({ ...form, sodienthoai: e.target.value })}
      />

      <input
        className="w-full border border-gray-300 rounded px-3 py-2 mb-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-500"
        placeholder="Email (tùy chọn)"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
    </div>
  );
};

export default CheckoutForm;
