import { FaEdit, FaTrashAlt } from "react-icons/fa";

export default function QuanlyButton({ onEdit, onDelete }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <button
        onClick={onEdit}
        className="flex items-center gap-2 px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50 text-sm"
      >
        <FaEdit className="text-blue-600" />
        <span>Sửa</span>
      </button>
      <button
        onClick={onDelete}
        className="flex items-center gap-2 px-3 py-1 border border-red-500 text-red-600 rounded hover:bg-red-50 text-sm"
      >
        <FaTrashAlt className="text-red-600" />
        <span>Xóa</span>
      </button>
    </div>
  );
}
