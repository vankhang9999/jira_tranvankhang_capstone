import { GET_ALL_STATUS } from "../types"

const initialState = {
  ArrStatus:[]
}

export const StatusReducer=(state = initialState, action) => {
  switch (action.type) {

  case GET_ALL_STATUS:
    return { ...state,ArrStatus:action.ArrStatus }

  default:
    return state
  }
}
