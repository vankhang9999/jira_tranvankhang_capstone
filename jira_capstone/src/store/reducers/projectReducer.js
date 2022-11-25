import { EIDT_PROJECT, PUT_PROJECT_DETAIL } from "../types"

const initialState = {
  projectEdit:{
    id: 0,
    projectName: "string",
    creator: 0,
    description: "string",
    categoryId: "string"
  },
  projectDetail:{
  
  }
}

export const projectReducer=(state = initialState,action) => {
  switch (action.type) {

  case EIDT_PROJECT:
    return {...state,projectEdit:action.projectEditModel }
  case PUT_PROJECT_DETAIL:
    return {...state,projectDetail:action.user}
  default:
    return state
  }
}
