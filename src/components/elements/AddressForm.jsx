import React, { useEffect, useState } from "react";

const AddressForm = ({ onChange, value }) => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [form, setForm] = useState({
    diachi: "",
    xa: "",
    sodienthoai: "",
    hoten: "",
    ...value,
  });

  useEffect(() => {
    fetch("https://provinces.open-api.vn/api/?depth=3")
      .then((res) => res.json())
      .then((data) => setProvinces(data))
      .catch((err) => console.error("Lỗi fetch địa chỉ:", err));
  }, []);

  useEffect(() => {
    onChange && onChange(form, selectedProvince, selectedDistrict);
  }, [form, selectedProvince, selectedDistrict, onChange]);

  return (
    <div>
      <input
        className="w-full border p-2 mb-3"
        placeholder="Họ tên người nhận"
        value={form.hoten}
        onChange={(e) => setForm({ ...form, hoten: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Số điện thoại"
        value={form.sodienthoai}
        onChange={(e) => setForm({ ...form, sodienthoai: e.target.value })}
      />

      <input
        className="w-full border p-2 mb-3"
        placeholder="Địa chỉ (số nhà, tên đường...)"
        value={form.diachi}
        onChange={(e) => setForm({ ...form, diachi: e.target.value })}
      />

      {/* Chọn Tỉnh/Thành phố */}
      <select
        className="w-full border p-2 mb-3"
        value={selectedProvince?.code || ""}
        onChange={(e) => {
          const code = +e.target.value;
          const found = provinces.find((p) => p.code === code);
          setSelectedProvince(found);
          setSelectedDistrict(null);
          setForm({ ...form, xa: "" });
        }}
      >
        <option value="">Chọn Tỉnh/Thành phố</option>
        {provinces.map((p) => (
          <option key={p.code} value={p.code}>
            {p.name}
          </option>
        ))}
      </select>

      {/* Chọn Quận/Huyện */}
      <select
        className="w-full border p-2 mb-3"
        value={selectedDistrict?.code || ""}
        onChange={(e) => {
          const code = +e.target.value;
          const found = selectedProvince?.districts.find((d) => d.code === code);
          setSelectedDistrict(found);
          setForm({ ...form, xa: "" });
        }}
        disabled={!selectedProvince}
      >
        <option value="">Chọn Quận/Huyện</option>
        {selectedProvince?.districts.map((d) => (
          <option key={d.code} value={d.code}>
            {d.name}
          </option>
        ))}
      </select>

      {/* Chọn Xã/Phường */}
      <select
        className="w-full border p-2 mb-3"
        value={form.xa}
        onChange={(e) => setForm({ ...form, xa: e.target.value })}
        disabled={!selectedDistrict}
      >
        <option value="">Chọn Xã/Phường</option>
        {selectedDistrict?.wards.map((w) => (
          <option key={w.code} value={w.name}>
            {w.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AddressForm;
