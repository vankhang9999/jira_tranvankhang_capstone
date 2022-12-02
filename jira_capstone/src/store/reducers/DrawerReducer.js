import { CLOSE_DRAWER, OPEN_DRAWER, OPEN_FORM, OPEN_FORM_CREATE_TASK, SET_SUBMIT_CREATE_TASK, SET_SUBMIT_EDIT_PROJECT } from "../types"
import React from "react";
const initialState = {
  open:false,
  title:'',
  ComponentContentDrawer:<p>Default content</p>,
  callBackSubmit:(propsValue)=>{alert("click demo!")}
}

export const DrawerReducer=(state = initialState, action) => {
  switch (action.type) {

  case OPEN_DRAWER:
    return { ...state, open:true }
  case CLOSE_DRAWER:
    return { ...state, open:false }
  case OPEN_FORM:
    return {...state,open:true,title:action.title, ComponentContentDrawer:action.Component}
  case SET_SUBMIT_EDIT_PROJECT:
    return {...state,callBackSubmit:action.submitFunction}
    case SET_SUBMIT_CREATE_TASK:
    return {...state, callBackSubmit:action.submitFunction}
  case OPEN_FORM_CREATE_TASK:
    return{...state,open:true,ComponentContentDrawer:action.Component,title:action.title}
  default:
    return state
  }
}
