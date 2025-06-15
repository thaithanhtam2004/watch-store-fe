// components/ActionButtons.jsx

export default function QuanlyButton({ onEdit, onDelete }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onEdit}
        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
      >
        ✏️ Sửa
      </button>
      <button
        onClick={onDelete}
        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm"
      >
        🗑️ Xóa
      </button>
    </div>
  );
}
