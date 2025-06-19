// components/forms/SelectModel.jsx
import React from "react";
import { useDongHoList } from "@/hooks/useDongHoList";

export default function SelectModel({ value, onChange }) {
  const { data: models, loading, error } = useDongHoList();

  if (loading) return <p>Đang tải model...</p>;
  if (error) return <p className="text-red-500">Lỗi: {error}</p>;

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="p-2 border rounded w-full"
    >
      <option value="">-- Chọn model đồng hồ --</option>
      {models.map((model) => (
        <option key={model.madongho} value={model.madongho}>
          {model.madongho} - {model.tenmodel}
        </option>
      ))}
    </select>
  );
}
