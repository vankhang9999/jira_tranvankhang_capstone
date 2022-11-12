import { ACCESS_TOKEN, USER_LOGIN } from "../../util/settings/config"
import { DANG_NHAP_ACTION } from "../types"


let khang={}
if(localStorage.getItem(USER_LOGIN)){
  khang=JSON.parse(localStorage.getItem(USER_LOGIN))
}

const stateDefault={
  userLogin:khang,
}

export const userReducer=(state=stateDefault,action)=>{
  switch(action.type){
    case DANG_NHAP_ACTION:{
      const {thongTinDangNhap}=action
      localStorage.setItem(USER_LOGIN,JSON.stringify(thongTinDangNhap));
      localStorage.setItem(ACCESS_TOKEN,thongTinDangNhap.accessToken);
      return {...state,userLogin:thongTinDangNhap}
    }
    default:return{...state}
  }
}