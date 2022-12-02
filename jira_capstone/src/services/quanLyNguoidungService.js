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
  },
  removeUserFromProject:(user)=>{
    return api.post(`Project/removeUserFromProject`,user)
  },
  getAllUser:()=>{
    return api.get(`Users/getUser`)
  },
   getUserByProjectId: (projectId) => {
    return api.get(`Users/getUserByProjectId?idProject=${projectId}`)
},
  editUser:(data)=>{
    return api.put(`Users/editUser`,data)
},
  DeleteUser:(id)=>{
    return api.delete(`Users/deleteUser?id=${id}`)
}
}