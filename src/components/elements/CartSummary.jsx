const CartSummary = ({ cartItems, tongTien, handleSubmit }) => {
  return (
    <div className="border p-4 sm:p-6 rounded-lg w-full max-w-md mx-auto bg-white shadow-sm">
      {cartItems.map((item) => (
        <div
          key={item.masanpham}
          className="flex flex-col sm:flex-row sm:justify-between mb-2 text-sm sm:text-base"
        >
          <span className="text-gray-700">
            {item.tensanpham} × {item.soluong}
          </span>
          <span className="text-right text-gray-900">
            {(item.giaban * item.soluong).toLocaleString()} ₫
          </span>
        </div>
      ))}

      <hr className="my-3 border-gray-300" />

      <div className="flex justify-between font-semibold text-base sm:text-lg">
        <span>Tổng</span>
        <span>{tongTien.toLocaleString()} ₫</span>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded mt-4 transition duration-200"
      >
        ĐẶT HÀNG
      </button>
    </div>
  );
};

export default CartSummary;
