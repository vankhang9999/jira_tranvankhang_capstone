import { GET_ALL_PROJECT, GET_PROJECTCATEGORY_ALL } from "../types"

const stateDefault={
  arrProjectCategory:[],
  projectAll:[]
}

export const ProjectCategoryReducer=(state=stateDefault,action)=>{
  switch(action.type){
    case GET_PROJECTCATEGORY_ALL:{
      const data=action.payload
      return {...state,arrProjectCategory:data}
    }
    case GET_ALL_PROJECT:{
      const data=action.payload
      return {...state,projectAll:data}
    }
    default:return {...state}
  }
}