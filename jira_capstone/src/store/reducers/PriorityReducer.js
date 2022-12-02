import { GET_ALL_PRIORITY, GET_ALL_TASK } from "../types"

const initialState = {
  ArrPriority:[]
}

export const PriorityReducer=(state = initialState,  action ) => {
  switch (action.type) {

  case GET_ALL_PRIORITY:
    return { ...state, ArrPriority:action.ArrPriority}

  default:
    return state
  }
}
