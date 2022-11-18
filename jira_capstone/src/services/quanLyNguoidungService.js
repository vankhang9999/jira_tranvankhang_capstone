import { api } from "../constants/api"

export const quanLyNguoiDungService={
  dangNhap:(thongTinDangNhap)=>{
    return api.post(`Users/signin`,thongTinDangNhap)
  },
  dangKy:(thongTinNguoiDung)=>{
    return api.post(`Users/signup`,thongTinNguoiDung)
  },
}