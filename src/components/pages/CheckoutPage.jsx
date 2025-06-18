import React, { useEffect, useState } from "react";
import { Header, Footer } from "../layouts/main.layout";
import { useGioHang } from "../../hooks/useGioHang";
import { getGiaBanSanPham } from "../../services/sanphamService";
import { useAllDiaChiNguoiDung } from "../../hooks/useAllDiaChiNguoiDung";
import { useCreateDiaChiNguoiDung } from "../../hooks/useTaoDiaChi";
import { useAuth } from "../../utils/AuthContext";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import AddressForm from "../../components/elements/AddressForm";
import { usePhuongThucList } from "../../hooks/usePhuongThucList";
import { useTaoDonHang } from "../../hooks/useTaoDonHang";
import { useTaoChiTietDonHang } from "../../hooks/useTaoChiTietDonHang";

const CheckoutPage = () => {
  const { user } = useAuth();
  const CURRENT_USER_ID = user?.id;

  const [donHangLocal, setDonHangLocal] = useState([]);

useEffect(() => {
  const saved = localStorage.getItem("tao_don_hang_data");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      setDonHangLocal(parsed.items || []);
    } catch (e) {
      console.error("Lỗi khi đọc localStorage:", e);
    }
  }
}, []);

const { taoDonHang, loading: loadingTaoDonHang, error: errorTaoDonHang } = useTaoDonHang();
const { taoChiTietDonHangTuLocal, loading: loadingChiTiet, error: errorChiTiet } = useTaoChiTietDonHang();


  const { gioHang, loading, error } = useGioHang(CURRENT_USER_ID);
  const [giaSanPhamMap, setGiaSanPhamMap] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const { data: diaChiList = [], isLoading: loadingDiaChi } = useAllDiaChiNguoiDung(CURRENT_USER_ID);
  const { createNewDiaChi, loading: loadingCreateAddress, error: errorCreateAddress } = useCreateDiaChiNguoiDung();
  const { data: phuongThucList = [], loading: loadingPhuongThuc } = usePhuongThucList();

  const [selectedPhuongThucId, setSelectedPhuongThucId] = useState(null);
  const [showAddresses, setShowAddresses] = useState(false);
  const [addingNewAddress, setAddingNewAddress] = useState(false);
  const [showPhuongThuc, setShowPhuongThuc] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    hoten: "",
    sodienthoai: "",
    diachi: "",
    xa: "",
    quan: "",
    tinh: "",
  });

  const fullAddressString = (addr) => {
    return [addr.diachi, addr.xa, addr.quan, addr.tinh].filter(Boolean).join(", ");
  };

  useEffect(() => {
    if (diaChiList.length > 0 && !selectedAddressId) {
      const dcMacDinh = diaChiList.find((dc) => dc.macdinh);
      if (dcMacDinh) setSelectedAddressId(dcMacDinh.madiachi);
      else setSelectedAddressId(diaChiList[0].madiachi);
    }
  }, [diaChiList, selectedAddressId]);

  useEffect(() => {
    if (phuongThucList.length > 0 && !selectedPhuongThucId) {
      setSelectedPhuongThucId(phuongThucList[0].maphuongthuc);
    }
  }, [phuongThucList, selectedPhuongThucId]);

  useEffect(() => {
    const fetchAllGiaBan = async () => {
      const map = {};
      for (const item of gioHang) {
        try {
          const res = await getGiaBanSanPham(item.masanpham);
          const giaban = parseFloat(res.giaban);
          map[item.masanpham] = {
            giaban: isNaN(giaban) ? 0 : giaban,
            tensanpham: res.tensanpham || "Không rõ tên",
          };
        } catch (e) {
          console.error("Lỗi khi lấy giá:", item.masanpham, e);
          map[item.masanpham] = { giaban: 0, tensanpham: "Lỗi tên" };
        }
      }
      setGiaSanPhamMap(map);
    };

    if (gioHang.length > 0) {
      fetchAllGiaBan();
    }
  }, [gioHang]);

const tongTien = donHangLocal.reduce(
  (sum, item) => sum + item.giaban * item.soluong,
  0
);


  const formatVND = (amount) =>
    amount?.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

const handleDatHang = async () => {
  const diaChi = diaChiList.find((dc) => dc.madiachi === selectedAddressId);
  const phuongThuc = phuongThucList.find(pt => pt.maphuongthuc === selectedPhuongThucId);

  if (!diaChi) return alert("Vui lòng chọn địa chỉ giao hàng!");
  if (!phuongThuc) return alert("Vui lòng chọn phương thức thanh toán!");

  try {
    // Bước 1: Gọi API tạo đơn hàng
    const donHangData = await taoDonHang({
      mataikhoan: CURRENT_USER_ID,
      madiachi: selectedAddressId,
      tongtien: tongTien,
      maphuongthuc: selectedPhuongThucId,
      madonvivanchuyen: "dv001", // hoặc để mặc định
    });

    const madonhang = donHangData.madonhang;
    if (!madonhang) throw new Error("Không nhận được mã đơn hàng từ server.");

    // Bước 2: Gọi API tạo chi tiết đơn hàng
    await taoChiTietDonHangTuLocal(madonhang);

console.log("GỬI DỮ LIỆU ĐẶT HÀNG:", {
  mataikhoan: CURRENT_USER_ID,
  madiachi: selectedAddressId,
  tongtien: tongTien,
  maphuongthuc: selectedPhuongThucId,
  madonvivanchuyen: "dv001"
});

    // ✅ Hiển thị thông báo thành công
    alert(`✅ Đặt hàng thành công!\nMã đơn: ${madonhang}\nTổng tiền: ${formatVND(tongTien)}`);
    localStorage.removeItem("tao_don_hang_data"); // Xóa dữ liệu tạm nếu có
  } catch (err) {
    alert("❌ Lỗi đặt hàng: " + (err?.response?.data?.message || err.message));
  }
};


  const handleSaveNewAddress = async () => {
    if (!newAddressForm.hoten.trim() || !newAddressForm.sodienthoai.trim() || !newAddressForm.diachi.trim() || !newAddressForm.xa.trim() || !newAddressForm.quan.trim() || !newAddressForm.tinh.trim()) {
      return alert("Vui lòng nhập đầy đủ thông tin địa chỉ mới.");
    }

    const diachiFull = fullAddressString(newAddressForm);
    const newAddressPayload = {
      mataikhoan: CURRENT_USER_ID,
      tennguoinhan: newAddressForm.hoten,
      sodienthoai: newAddressForm.sodienthoai,
      diachi: diachiFull,
      xa: newAddressForm.xa,
      quan: newAddressForm.quan,
      tinh: newAddressForm.tinh,
      macdinh: false,
    };

    try {
      const createdAddress = await createNewDiaChi(newAddressPayload);
      diaChiList.push(createdAddress);
      setSelectedAddressId(createdAddress.madiachi);
      setAddingNewAddress(false);
      setNewAddressForm({ hoten: "", sodienthoai: "", diachi: "", xa: "", quan: "", tinh: "" });
    } catch (error) {
      alert("Lỗi khi tạo địa chỉ mới: " + (error.message || ""));
    }
  };

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-6 lg:px-20 py-10">
        <div>
          {/* CHỌN ĐỊA CHỈ */}
          <h3 className="text-xl font-bold mb-2 flex justify-between items-center cursor-pointer" onClick={() => setShowAddresses(!showAddresses)}>
            CHỌN ĐỊA CHỈ GIAO HÀNG
            {showAddresses ? <FaChevronUp /> : <FaChevronDown />}
          </h3>

          {!showAddresses && selectedAddressId && (
            <div className="border p-3 rounded cursor-pointer" onClick={() => setShowAddresses(true)}>
              {(() => {
                const dc = diaChiList.find((dc) => dc.madiachi === selectedAddressId);
                return dc ? (
                  <>
                    <p className={`font-semibold ${dc.macdinh ? "text-orange-600" : ""}`}>{dc.tennguoinhan} - {dc.sodienthoai}</p>
                    <p>{dc.diachi}</p>
                    {dc.macdinh && <span className="text-sm text-orange-600 font-bold">[Mặc định]</span>}
                  </>
                ) : <p>Không có địa chỉ nào được chọn.</p>;
              })()}
            </div>
          )}

          {showAddresses && (
            <>
              <div className="border rounded p-3 max-h-64 overflow-y-auto mb-3">
                {loadingDiaChi ? <p>Đang tải địa chỉ...</p> : diaChiList.length === 0 ? <p>Không có địa chỉ nào.</p> : (
                  <div className="space-y-3">
                    {diaChiList.map((dc) => (
                      <div key={dc.madiachi} onClick={() => { setSelectedAddressId(dc.madiachi); setShowAddresses(false); }} className={`border p-3 rounded cursor-pointer ${selectedAddressId === dc.madiachi ? "border-orange-500 bg-orange-50" : "hover:border-gray-400"}`}>
                        <p className={`font-semibold ${dc.macdinh ? "text-orange-600" : ""}`}>{dc.tennguoinhan} - {dc.sodienthoai}</p>
                        <p>{dc.diachi}</p>
                        {dc.macdinh && <span className="text-sm text-orange-600 font-bold">[Mặc định]</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {!addingNewAddress ? <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => setAddingNewAddress(true)}>+ Thêm địa chỉ mới</button> : (
                <div className="border p-4 rounded mt-3 bg-gray-50">
                  <AddressForm value={newAddressForm} onChange={(form, tinh, quan) => setNewAddressForm({ ...form, tinh: tinh?.name || "", quan: quan?.name || "" })} />
                  <div className="flex justify-end space-x-3 mt-3">
                    <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => { setAddingNewAddress(false); setNewAddressForm({ hoten: "", sodienthoai: "", diachi: "", xa: "", quan: "", tinh: "" }); }}>Hủy</button>
                    <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSaveNewAddress} disabled={loadingCreateAddress}>{loadingCreateAddress ? "Đang lưu..." : "Lưu địa chỉ"}</button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* CHỌN PHƯƠNG THỨC */}
          <div className="mt-8">
            <h3 className="text-xl font-bold mb-2 flex justify-between items-center cursor-pointer" onClick={() => setShowPhuongThuc(!showPhuongThuc)}>
              CHỌN PHƯƠNG THỨC THANH TOÁN
              {showPhuongThuc ? <FaChevronUp /> : <FaChevronDown />}
            </h3>
            {!showPhuongThuc && selectedPhuongThucId && (
              <div className="border p-3 rounded cursor-pointer" onClick={() => setShowPhuongThuc(true)}>
                {(() => {
                  const pt = phuongThucList.find(pt => pt.maphuongthuc === selectedPhuongThucId);
                  return pt ? <p className="font-semibold">{pt.tenphuongthuc}</p> : <p>Không có phương thức.</p>;
                })()}
              </div>
            )}
            {showPhuongThuc && (
              <div className="border p-3 rounded space-y-2">
                {loadingPhuongThuc ? <p>Đang tải phương thức...</p> : phuongThucList.map((pt) => (
                  <div key={pt.maphuongthuc} onClick={() => { setSelectedPhuongThucId(pt.maphuongthuc); setShowPhuongThuc(false); }} className={`p-2 border rounded cursor-pointer ${selectedPhuongThucId === pt.maphuongthuc ? "bg-orange-50 border-orange-500" : "hover:border-gray-400"}`}>{pt.tenphuongthuc}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ĐƠN HÀNG */}
        <div>
          <h3 className="text-xl font-bold mb-4">ĐƠN HÀNG CỦA BẠN</h3>
          <div className="border p-4 rounded-lg">
      {donHangLocal.length === 0 ? (
  <p>Không có sản phẩm nào được chọn.</p>
) : donHangLocal.map((item, index) => {

            const info = giaSanPhamMap[item.masanpham] || { giaban: item.giaban, tensanpham: "..." };

              return (
                <div key={item.magiohang} className="flex justify-between mb-2">
                 <span>{item.tensanpham || "Sản phẩm"} × {item.soluong}</span>
<span>{formatVND(item.giaban * item.soluong)}</span>
                </div>
              );
            })}
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Tổng</span>
              <span>{formatVND(tongTien)}</span>
            </div>
          </div>
          <button onClick={handleDatHang} className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded mt-6">ĐẶT HÀNG</button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
