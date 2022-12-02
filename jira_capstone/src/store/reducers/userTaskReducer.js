import { GET_ALL_SEARCH, GET_ALL_TASK, GET_ALL_USER, GET_USER_BYID } from "../types"

const initialState = {
  ArrUser:[], 
  userSearch:[],
  ArrUserBYId:[]
}

export const userTaskReducer=(state = initialState,  action ) => {
  switch (action.type) {

  case GET_ALL_USER:
    return { ...state, ArrUser:action.ArrUser}
  case GET_ALL_SEARCH:
    return { ...state, userSearch:action.userSearch}
  case GET_USER_BYID:
    return {...state,ArrUserBYId:action.ArrUserBYId}  
  default:
    return state
  }
}
