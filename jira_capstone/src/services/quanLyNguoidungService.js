import { api } from "../constants/api"

export const quanLyNguoiDungService={
  dangNhap:(thongTinDangNhap)=>{
    return api.post(`Users/signin`,thongTinDangNhap)
  },
  dangKy:(thongTinNguoiDung)=>{
    return api.post(`Users/signup`,thongTinNguoiDung)
  },
  getUser:(userID)=>{
    return api.get(`Users/getUser?keyword=${userID}`)
  },
  assignUserProject:(user)=>{
    return api.post(`Project/assignUserProject`,user)
  }
}