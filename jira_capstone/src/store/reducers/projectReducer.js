import { EIDT_PROJECT } from "../types"

const initialState = {
  projectEdit:{
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "string"
  }
}

export const projectReducer=(state = initialState,action) => {
  switch (action.type) {

  case EIDT_PROJECT:
    return {...state,projectEdit:action.projectEditModel }

  default:
    return state
  }
}
