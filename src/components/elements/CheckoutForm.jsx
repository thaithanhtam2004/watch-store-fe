const CheckoutForm = ({ form, setForm }) => {
  return (
    <>
      <input
        className="w-full border p-2 mb-3"
        placeholder="Họ tên"
        value={form.hoten}
        onChange={(e) => setForm({ ...form, hoten: e.target.value })}
      />
      <input
        className="w-full border p-2 mb-3"
        placeholder="Địa chỉ"
        value={form.diachi}
        onChange={(e) => setForm({ ...form, diachi: e.target.value })}
      />
      <input
        className="w-full border p-2 mb-3"
        placeholder="Số điện thoại"
        value={form.sodienthoai}
        onChange={(e) => setForm({ ...form, sodienthoai: e.target.value })}
      />
      <input
        className="w-full border p-2 mb-3"
        placeholder="Email (tùy chọn)"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
    </>
  );
};

export default CheckoutForm;
