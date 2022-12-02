import { api } from "../constants/api"

export const quanLyTaskService={
  getAllTaskType:()=>{
    return api.get(`TaskType/getAll`)
  },
  getPriorityAll:()=>{
    return api.get(`Priority/getAll`)
  },
  getAllUser:(key)=>{
    return api.get(`Users/getUser?keyword=${key}`)
  },
  getAllStatus:()=>{
    return api.get(`Status/getAll`)
  },
  createTask:(DATA)=>{
    return api.post(`Project/createTask`,DATA)
  },
  GetUserByProjectId:(ID)=>{
    return api.get(`Users/getUserByProjectId?idProject=${ID}`)
  },
  gettaskDetail:(ID)=>{
    return api.get(`Project/getTaskDetail?taskId=${ID}`)
  },
  updateStatus:(TaskId)=>{
    return api.put(`Project/updateStatus`,TaskId)
  },
  updateTask:(task)=>{
    return api.post(`Project/updateTask`,task)
  }
}