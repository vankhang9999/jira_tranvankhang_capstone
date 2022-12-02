import { GET_ALL_TASK } from "../types"

const initialState = {
  ArrTask:[]
}

export const TaskTypeReducer=(state = initialState,  action ) => {
  switch (action.type) {

  case GET_ALL_TASK:
    return { ...state, ArrTask:action.Task}

  default:
    return state
  }
}
