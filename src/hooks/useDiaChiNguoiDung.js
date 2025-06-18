import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  getDiaChiMacDinh,
  createDiaChiMacDinh,
} from "../services/diaChiNguoiDungApi"; // đường dẫn import API tương ứng

// Hook lấy địa chỉ mặc định theo tài khoản
export function useDiaChiMacDinh(mataikhoan) {
  return useQuery(
    ["diaChiMacDinh", mataikhoan],
    () => getDiaChiMacDinh(mataikhoan),
    {
      enabled: !!mataikhoan, // chỉ gọi khi có mã tài khoản
      staleTime: 5 * 60 * 1000, // cache 5 phút
    }
  );
}

// Hook tạo địa chỉ và gán làm mặc định
export function useCreateDiaChiMacDinh() {
  const queryClient = useQueryClient();

  return useMutation(createDiaChiMacDinh, {
    onSuccess: (data, variables) => {
      // Sau khi tạo thành công, invalidate cache để fetch lại địa chỉ mặc định mới
      if (variables.mataikhoan) {
        queryClient.invalidateQueries(["diaChiMacDinh", variables.mataikhoan]);
      }
    },
  });
}