import { updateDanhMuc } from "../services/danhmucService";

export function useUpdateDanhMuc() {
  const update = async (madanhmuc, formData) => {
    try {
      const res = await updateDanhMuc(madanhmuc, formData);
      return res;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Lỗi cập nhật danh mục");
    }
  };

  return { update };
}
