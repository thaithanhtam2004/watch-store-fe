const CartSummary = ({ cartItems, tongTien, handleSubmit }) => {
  return (
    <div className="border p-4 rounded-lg">
      {cartItems.map((item) => (
        <div key={item.masanpham} className="flex justify-between mb-2">
          <span>
            {item.tensanpham} × {item.soluong}
          </span>
          <span>{(item.giaban * item.soluong).toLocaleString()} ₫</span>
        </div>
      ))}
      <hr className="my-2" />
      <div className="flex justify-between font-semibold">
        <span>Tổng</span>
        <span>{tongTien.toLocaleString()} ₫</span>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded mt-4"
      >
        ĐẶT HÀNG
      </button>
    </div>
  );
};

export default CartSummary;
