import { history } from "../../App"
import { quanLyNguoiDungService } from "../../services/quanLyNguoidungService"
import { quanLyProjectService } from "../../services/quanLyProjectService"
import { notifiFunction } from "../../util/settings/Notification/nontificationCyber"
import { DANG_NHAP_ACTION, GET_USER_SEARCH, PUT_PROJECT_DETAIL } from "../types"


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
            notifiFunction('success','Login success!','')
            history.push('/')
          }
       }catch(error){
        notifiFunction('error','Login Not success!','')
       }
      }
    },
    dangKyAction:(thongTinNguoiDung)=>{
      return async(dispatch)=>{
        try{
          const result=await quanLyNguoiDungService.dangKy(thongTinNguoiDung)
          if(result.data.statusCode===200){
            notifiFunction('success','Register success!','')
            history.push('/login')
          }
        }catch(error){
          notifiFunction('success','Register Not success!','')
        }
      }
    },
    getUserAction:(userID)=>{
      return async(dispatch)=>{
        try{
          const result=await quanLyNguoiDungService.getUser(userID)
          if(result.data.statusCode===200){
            notifiFunction('success','Get User success!','')
            dispatch({
              type:GET_USER_SEARCH,
              user:result.data.content
            })
          }
        }catch(error){
          notifiFunction('error','Get User not success!','')
        }
      }
    },
    getProjectDetail:(ID)=>{
      return async(dispatch)=>{
        try{
          const result=await quanLyProjectService.getProjectDetail(ID)
          if(result.data.statusCode===200){
            notifiFunction('success','Get ProjectDetail success!','')
            dispatch({
              type:PUT_PROJECT_DETAIL,
              user:result.data.content
            })
          }
        }catch(error){
          notifiFunction('error','Get projectDetail Not success!','')
          history.push('/projectmanagement');
        }
      }
    }
}