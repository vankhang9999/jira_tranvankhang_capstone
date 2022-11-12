import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/quanLyNguoidungService"
import { DANG_NHAP_ACTION } from "../types"

export const quanLyNguoiDungAction={
    dangNhapAction:(thongTinDangNhap)=>{
      return async(dispatch)=>{
       try{
          const result= await quanLyNguoiDungService.dangNhap(thongTinDangNhap)
          if(result.data.statusCode===200){
            await dispatch({
              type:DANG_NHAP_ACTION,
              thongTinDangNhap:result.data.content
            })
            alert('Đăng Nhập Thành Công :)')
            history.push('/home')
          }
       }catch(error){
        console.log('error:',error.response?.data)
        alert('Đăng nhập thất bại rồi :(')
       }
      }
    },
    dangKyAction:(thongTinNguoiDung)=>{
      return async(dispatch)=>{
        try{
          const result=await quanLyNguoiDungService.dangKy(thongTinNguoiDung)
          if(result.data.statusCode===200){
            alert('Đăng Ký Thành Công :)')
            history.push('/login')
          }
        }catch(error){
          console.log('error:',error.response?.data)
        alert('Đăng ký thất bại rồi :(')
        }
      }
    }
}