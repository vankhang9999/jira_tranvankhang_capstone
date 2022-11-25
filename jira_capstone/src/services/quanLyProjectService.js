import { api } from "../constants/api"

export const quanLyProjectService={
  getProjectAll:()=>{
    return api.get(`ProjectCategory`)
  },
  CreateProjectJira:(projectData)=>{
    return api.post(`Project/createProject`,projectData)
  },
  getAllProject:()=>{
    return api.get(`Project/getAllProject`)
  },
  updateProject:(dataUpdate,dataUpdateId)=>{
    return api.put(`Project/updateProject?projectId=${dataUpdateId}`,dataUpdate)
  },
  deleteProject:(DeleteID)=>{
    return api.delete(`Project/deleteProject?projectId=${DeleteID}`)
  },
  getProjectDetail:(ID)=>{
    return api.get(`Project/getProjectDetail?id=${ID}`)
  }
}